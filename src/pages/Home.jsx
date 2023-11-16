import React, { useState, useEffect } from "react";
import { Circle, GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import marker from "../assets/images/vendor-self-pin.png";
import axios from "axios"; // import axios library

const mapContainerStyle = {
  width: "100%",
  height: "calc(100vh - 64px)",
};

const mapOptions = {
  streetViewControl: false,
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
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [nearbyUsers, setNearbyUsers] = useState([]); // state to store nearby users

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
        // update the user's location in the database using axios
        // try {
        //   axios.put("http://localhost:3004/nearbyUsers", {
        //     id: 2,
        //     latitude: latitude,
        //     longitude: longitude,
        //     isAdmin: false,
        //     isVendor: false,
        //     store: null,
        //   });
        // } catch (error) {
        //   console.error("There was an error!", error);
        // }
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
      .get("http://localhost:3004/nearbyUsers", {
        params: {
          accountId: localStorage.getItem("accountId"),
          isVendor: localStorage.getItem("isVendor"),
        },
      })
      .then((response) => {
        // // filter out the users who are admins or more than 200 meters away
        // const filteredUsers = response.data.filter(
        //   (user) =>
        //     !user.isAdmin &&
        //     getDistance(
        //       currentPosition.lat,
        //       currentPosition.lng,
        //       user.latitude,
        //       user.longitude
        //     ) <= 200
        // );
        // setNearbyUsers(filteredUsers);
        setNearbyUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
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
        <LoadScript googleMapsApiKey="AIzaSyBNM-CYx7dA0gckgBmybtovang7Bvp8lK0">
          <div>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={{
                lat: currentPosition.lat,
                lng: currentPosition.lng + 0.0006,
              }}
              zoom={19}
              className="flex-1"
              options={mapOptions}
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
                radius={100}
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
                  // icon={{
                  //   url: user.store.category, // use the store category as the icon
                  //   scaledSize: new window.google.maps.Size(30, 30),
                  // }}
                  onClick={() => {
                    // open the store page of the user when clicked
                    window.location.href = `/store/${user.accountId}`;
                  }}
                />
              ))}
            </GoogleMap>
          </div>
        </LoadScript>
      </div>
    </>
  );
}

export default Home;
