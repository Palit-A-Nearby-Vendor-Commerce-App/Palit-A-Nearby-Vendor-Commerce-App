import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { Circle, GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import marker from "../assets/images/vendor-self-pin.png";
import customerMarker from "../assets/images/customer-map-icon.png";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import MapSlidingBox from "../components/MapSlidingBox";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { UserContext } from "../UserContext";
import { mapContainerStyle, mapOptions } from "../assets/styles/styles";
import { getDistance } from "../utils/functions";

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [showSlider, setShowSlider] = useState(false);
  const mapRef = useRef();

  const onMapLoad = useCallback(
    (map) => {
      mapRef.current = map;
      if (currentPosition) {
        mapRef.current.setCenter(currentPosition);
      }
    },
    [currentPosition]
  );

  console.log("User in map: ", user.account.location);

  const renderVendorMarkerIcon = () => {
    if (
      typeof window.google === "object" &&
      typeof window.google.maps === "object"
    ) {
      return {
        url: marker,
        scaledSize: new window.google.maps.Size(30, 30),
      };
    }
    return undefined;
  };

  useEffect(() => {
    const updateLocationInContext = (position) => {
      const { latitude, longitude } = position.coords;
      const updatedLocation = { lat: latitude, lng: longitude };

      setCurrentPosition(updatedLocation);

      if (user && user.account.location) {
        axios
          .put(
            `http://localhost:8080/api/updateLocationById/${user.account.location.locationId}`,
            // { latitude, longitude }
            { latitude: latitude, longitude: longitude }
          )
          .then((response) => {
            setCurrentPosition({
              lat: response.data.latitude,
              lng: response.data.longitude,
            });
          })
          .catch((error) => {
            console.error("Error updating location:", error);
          });
      }
    };

    const watchId = navigator.geolocation.watchPosition(
      updateLocationInContext,
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [user, user.account.location.latitude, user.account.location.longitude]);

  const calculateOffset = () => {
    if (mapRef.current) {
      const zoomLevel = mapRef.current.getZoom();
      return 0.02 / Math.pow(2, zoomLevel - 14);
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
        console.log(
          getDistance(
            currentPosition.lat,
            currentPosition.lng,
            10.1381623,
            123.6739757
          ) <= 200
        );

        console.log(data[4].account.location.isActive);

        // Filter out users who are vendors and within 200 meters of the current user
        const usersNearby = data.filter((otherUser) => {
          if (
            user.account.isVendor &&
            !otherUser.account.isVendor &&
            otherUser.account.location.isActive &&
            getDistance(
              currentPosition.lat,
              currentPosition.lng,
              otherUser.account.location.latitude,
              otherUser.account.location.longitude
            ) <= 200
          ) {
            return true;
          }
          return false;
        });

        console.log("Filtered vendors:", usersNearby);
        // Mark the vendors on the map with markers
        usersNearby.forEach((user) => {
          const vendorMarker = new window.google.maps.Marker({
            position: {
              lat: user.account.location.latitude,
              lng: user.account.location.longitude,
            },
            map: mapRef.current, // Assuming you have a map reference
            icon: {
              url: customerMarker,
              scaledSize: new window.google.maps.Size(10, 10),
            },
          });

          // You can add click event handling for the markers if needed
          vendorMarker.addListener("click", () => {
            window.location.href = `/store/${user.accountId}`;
          });
        });
      })
      .catch((error) => console.error("Error fetching users: ", error));
  }, [currentPosition, user.account.isVendor]);

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
                <>
                  <Marker
                    position={currentPosition}
                    icon={renderVendorMarkerIcon()}
                  />
                </>
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
