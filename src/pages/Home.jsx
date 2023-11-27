import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import { Circle, GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import marker from "../assets/images/vendor-self-pin.png";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import MapSlidingBox from "../components/MapSlidingBox";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { UserContext } from "../UserContext";

const mapContainerStyle = {
  width: "100%",
  height: "calc(100vh - 90px)",
};

const mapOptions = {
  streetViewControl: false,
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  rotateControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
  ],
};

const R = 6371;
const deg2rad = (deg) => deg * (Math.PI / 180);
const getDistance = (lat1, lon1, lat2, lon2) => {
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1000;
};

function Home() {
  const { user, updateLocation } = useContext(UserContext);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [showSlider, setShowSlider] = useState(false);
  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    if (currentPosition) {
      mapRef.current.setCenter(currentPosition);
    }
  }, [currentPosition]);

  useEffect(() => {
    const updateLocationInContext = (position) => {
      const { latitude, longitude } = position.coords;
      const updatedLocation = { lat: latitude, lng: longitude };
      setCurrentPosition(updatedLocation);
      if (user && user.location) {
        updateLocation(user.location.id, updatedLocation);
      }
    };

    const watchId = navigator.geolocation.watchPosition(
      updateLocationInContext,
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [updateLocation, user]);

  const calculateOffset = () => {
    if (mapRef.current) {
      const zoomLevel = mapRef.current.getZoom();
      // Offset decreases with increasing zoom level
      return 0.020 / Math.pow(2, zoomLevel - 14);
    }
    return 0;
  };

  const panAndZoomMap = () => {
    if (mapRef.current && currentPosition) {
      const offset = calculateOffset();
      const newCenter = {
        lat: currentPosition.lat,
        lng: currentPosition.lng + (showSlider ? offset : 0),
      };
      mapRef.current.panTo(newCenter);
    }
  };

  useEffect(() => {
    panAndZoomMap();
  }, [showSlider, currentPosition]);

  const handleSliderToggle = () => {
    setShowSlider(!showSlider);
  };

  const handleReport = () => {
    window.location.href = "/report";
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getAllUsers")
      .then(({ data }) => {
        setNearbyUsers(
          data.filter(
            (otherUser) =>
              otherUser.account.isVendor &&
              getDistance(
                currentPosition.lat,
                currentPosition.lng,
                otherUser.location.latitude,
                otherUser.location.longitude
              ) <= 200
          )
        );
      })
      .catch((error) => console.error("Error fetching users: ", error));
  }, [currentPosition]);

  const renderMarkerIcon = () => {
    if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
      return {
        url: marker,
        scaledSize: new window.google.maps.Size(30, 30),
      };
    }
    return undefined;
  };

  return (
    <>
      <div className="w-full font-custom">
        <NavigationBar />
        <LoadScript googleMapsApiKey="AIzaSyBNM-CYx7dA0gckgBmybtovang7Bvp8lK0">
          <div>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={17}
              className="flex-1"
              options={mapOptions}
              onLoad={onMapLoad}
            >
              {currentPosition && (
                <Marker
                  position={currentPosition}
                  icon={renderMarkerIcon()}
                />
              )}
              {currentPosition && (
                <Circle
                  center={currentPosition}
                  radius={200}
                  options={{
                    strokeColor: "#0071B3",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#0071B3",
                    fillOpacity: 0.05,
                  }}
                />
              )}
              {nearbyUsers.map((user) => (
                <Marker
                  key={user.accountId}
                  position={{ lat: user.location.latitude, lng: user.location.longitude }}
                  onClick={() => {
                    window.location.href = `/store/${user.accountId}`;
                  }}
                />
              ))}
              <MapSlidingBox
                showSlider={showSlider}
                handleSliderToggle={handleSliderToggle}
              />
            </GoogleMap>
            <button
              style={{
                backgroundColor: "white",
                position: "absolute",
                left: "30px", 
                bottom: "30px", 
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                transition: "left 0.3s ease, bottom 0.3s ease",
              }}
              onClick={handleReport}
            >
              <MdOutlineReportGmailerrorred size={30} />
            </button>
          </div>
        </LoadScript>
      </div>
    </>
  );
}

export default Home;
