import React, { useState, useEffect, useContext } from "react";
import { Circle, GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import marker from "../assets/images/vendor-self-pin.png";
import axios from "axios"; // import axios library
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

function Home() {
  const { user } = useContext(UserContext);
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [nearbyUsers, setNearbyUsers] = useState([]); // state to store nearby users
  const [showSlider, setShowSlider] = useState(false);
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleSliderToggle = () => {
    setShowSlider(!showSlider);
  };

  // Function to pan and zoom the map
  const panAndZoomMap = () => {
    if (mapRef.current) {
      const newCenter = showSlider
        ? {
            lat: currentPosition.lat,
            lng: currentPosition.lng + 0.0020, // adjust this value as needed
          }
        : {
            lat: currentPosition.lat,
            lng: currentPosition.lng,
          };
      mapRef.current.panTo(newCenter);
      mapRef.current.setZoom(17); // adjust this value as needed
    }
  };

  useEffect(() => {
    console.log("User Data:", user);
  }, [user]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
        if (mapRef.current) {
          mapRef.current.panTo({ lat: latitude, lng: longitude });
        }
        // update the user's location in the database using axios
        // use the updateLocationById API from the LocationService class
        // pass the user's id and the current position as parameters
        axios
          .put(`/api/updateLocationById/${user.id}`, currentPosition)
          .then((response) => {
            console.log("Location updated successfully");
          })
          .catch((error) => {
            console.error("Error updating location: ", error);
          });
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
    // use the getAllUsers API from the UserService class
    axios
      .get("/api/getAllUsers")
      .then((response) => {
        // then filter out the users who are admins or more than 200 meters away
        const users = response.data.filter(
          (user) =>
            user.role !== "ADMIN" &&
            getDistance(
              currentPosition.lat,
              currentPosition.lng,
              user.latitude,
              user.longitude
            ) <= 200
        );
        // set the nearbyUsers state with the filtered users
        setNearbyUsers(users);
      })
      .catch((error) => {
        console.error("Error fetching users: ", error);
      });
  }, [currentPosition]);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d * 1000; // Distance in meters
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

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
                  : {
                      lat: currentPosition.lat,
                      lng: currentPosition.lng,
                    }
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
