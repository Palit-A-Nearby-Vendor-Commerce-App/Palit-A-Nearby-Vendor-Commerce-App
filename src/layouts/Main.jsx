import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Circle } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "calc(100vh - 64px)",
};

const mapOptions = {
  gestureHandling: "none",
  disableDefaultUI: true,
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

function Main() {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className="Main">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Sample React Website</Typography>
        </Toolbar>
      </AppBar>
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
            <Marker position={currentPosition} />
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
          </GoogleMap>
        </div>
      </LoadScript>
    </div>
  );
}
export default Main;
