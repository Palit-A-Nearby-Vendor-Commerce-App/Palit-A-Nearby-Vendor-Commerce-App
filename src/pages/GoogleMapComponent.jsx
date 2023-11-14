import { Circle, GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import marker from "../assets/images/vendor-self-pin.png";
import Header from "../layouts/Header";

const mapContainerStyle = {
  width: "100%",
  height: "calc(100vh - 64px)",
};

const mapOptions = {
  gestureHandling: "none",
  disableDefaultUI: true,
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

function GoogleMapComponent() {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [map, setMap] = useState(null);

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
    <div className="GoogleMapComponent">
      <Header />
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
          </GoogleMap>
        </div>
      </LoadScript>
    </div>
  );
}

export default GoogleMapComponent;
