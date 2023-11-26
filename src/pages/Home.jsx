import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import { Circle, GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import marker from "../assets/images/vendor-self-pin.png";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import MapSlidingBox from "./MapSlidingBox";
import { FaLocationArrow } from "react-icons/fa";
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

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

const R = 6371; // Radius of the earth in km
const deg2rad = (deg) => deg * (Math.PI / 180);
const getDistance = (lat1, lon1, lat2, lon2) => {
  // Distance in meters
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1000;
};

function Home() {
  const { user } = useContext(UserContext);
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [showSlider, setShowSlider] = useState(false);
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleSliderToggle = () => {
    setShowSlider(!showSlider);
  };

  const panAndZoomMap = () => {
    if (mapRef.current) {
      const newCenter = showSlider
        ? {
            lat: currentPosition.lat,
            lng: currentPosition.lng + 0.0020,
          }
        : currentPosition;
      mapRef.current.panTo(newCenter);
      mapRef.current.setZoom(17);
    }
  };

  useEffect(() => {
    console.log("User Data:", user);
  }, [user]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      ({ coords: { latitude, longitude } }) => {
        const position = { lat: latitude, lng: longitude };
        setCurrentPosition(position);
        if (mapRef.current) {
          mapRef.current.panTo(position);
        }
        // update the user's location in the database using axios
        axios
          .put(`http://localhost:8080/api/updateLocationById/${user.id}`, position)
          .then(() => console.log("Location updated successfully"))
          .catch((error) => console.error("Error updating location: ", error));
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // fetch nearby users from the database using axios
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getAllUsers")
      .then(({ data }) => {
        // filter out the users who are admins or more than 200 meters away
        setNearbyUsers(
          data.filter(
            (user) =>
              user.role !== "ADMIN" &&
              getDistance(
                currentPosition.lat,
                currentPosition.lng,
                user.latitude,
                user.longitude
              ) <= 200
          )
        );
      })
      .catch((error) => console.error("Error fetching users: ", error));
  }, [currentPosition]);

  return (
    <>
      <div className="w-full font-custom">
        <NavigationBar />
        <LoadScript googleMapsApiKey="AIzaSyBNM-CYx7dA0gckgBmybtovang7Bvp8lK0">
          <div>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={
                showSlider
                  ? {
                      lat: currentPosition.lat,
                      lng: currentPosition.lng + 0.0020,
                    }
                  : currentPosition
              }
              zoom={17}
              className="flex-1"
              options={mapOptions}
              onLoad={onMapLoad}
            >
              {window.google && (
                <Marker
                  position={currentPosition}
                  icon={{
                    url: marker,
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                />
              )}
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
              {nearbyUsers.map((user) => (
                // render markers for nearby users
                <Marker
                  key={user.accountId}
                  position={{ lat: user.latitude, lng: user.longitude }}
                  onClick={() => {
                    // open the store page of the user when clicked
                    window.location.href = `/store/${user.accountId}`;
                  }}
                />
              ))}
              <MapSlidingBox
                showSlider={showSlider}
                handleSliderToggle={handleSliderToggle}
              />
              <MapSlidingBox
                showSlider={showSlider}
                handleSliderToggle={handleSliderToggle}
              />
            </GoogleMap>
            <button
              style={{
                position: "absolute",
                right: "80px",
                bottom: "20px",
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 0 3px rgba(0, 0, 0, 0.3)",
              }}
              onClick={panAndZoomMap}
            >
              <FaLocationArrow size={20} />
            </button>
          </div>
        </LoadScript>
      </div>
    </>
  );
}

export default Home;