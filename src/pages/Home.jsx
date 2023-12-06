import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Circle, GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import customerMarker from "../assets/images/customerIcon.png";
import marker from "../assets/images/vendor-self-pin.png";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import axios from "axios";
import MapSlidingBox from "../components/MapSlidingBox";
import NavigationBar from "../components/NavigationBar";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { UserContext } from "../UserContext";
import { mapContainerStyle, mapOptions } from "../assets/styles/styles";
import { getDistance, vendorIcons } from "../utils/functions";
import { ownerWindow } from "@mui/material";

let markers = [];

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [showSlider, setShowSlider] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
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

  const renderVendorMarkerIcon = () => {
    if (
      typeof window.google === "object" &&
      typeof window.google.maps === "object"
    ) {
      return {
        url: marker,
        scaledSize: new window.google.maps.Size(40, 40),
      };
    }
    return undefined;
  };

  const updateLocationInContext = (position) => {
    const { latitude, longitude } = position.coords;
    const updatedLocation = { lat: latitude, lng: longitude };

    setCurrentPosition(updatedLocation);

    if (user && user.account.location) {
      axios
        .put(
          `http://localhost:8080/api/updateLocationById/${user.account.location.locationId}`,
          { ...user.account.location, latitude: latitude, longitude: longitude }
        )
        .then((response) => {
          console.log("Location successfully updated: ", response.data);
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

  useEffect(() => {
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
    setShowSlider((prevShowSlider) => !prevShowSlider);
  };

  const handleReport = () => {
    window.location.href = "/report";
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getAllUsers")
      .then(({ data }) => {
        console.log("Users:", data);

        const getNearbyUsers = data.filter((otherUser) => {
          console.log(
            getDistance(
              currentPosition.lat,
              currentPosition.lng,
              otherUser.account.location.latitude,
              otherUser.account.location.longitude
            )
          );
          if (
            user.account.isVendor == !otherUser.account.isVendor &&
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

        console.log("Filtered users:", getNearbyUsers);

        getNearbyUsers.forEach((user) => {
          console.log("markers: ", markers);

          if (markers[user.userId]) {
            markers[user.userId].setMap(null);
          }

          const userMarker = new window.google.maps.Marker({
            position: {
              lat: user.account.location.latitude,
              lng: user.account.location.longitude,
            },
            map: mapRef.current,
            icon: {
              url: user.account.isVendor
                ? vendorIcons(user.account.store.category)
                : customerMarker,
              scaledSize: new window.google.maps.Size(30, 30),
            },
            owner: user,
          });

          console.log("OWNERRR: ", markers[ownerWindow.userId]);
          markers[ownerWindow.userId] = userMarker;

          userMarker.addListener("click", () => {
            handleMarkerClick(userMarker.owner);
          });
        });
      })
      .catch((error) => console.error("Error fetching users: ", error));
  }, [currentPosition, user.account]);

  const handleMarkerClick = (owner) => {
    if (owner && owner.account.isVendor) {
      setSelectedVendor(owner);
    }

    setShowSlider(true);
  };

  return (
    <>
      <div className="w-full h-70vh font-custom">
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
                selectedVendor={selectedVendor}
                handleSliderToggle={handleSliderToggle}
                user={user}
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
              title="Report"
              onClick={handleReport}
            >
              <MdOutlineReportGmailerrorred size={30} />
            </button>
            {selectedVendor && (
              <Link to={{ pathname: "/chat", state: { selectedVendor } }}>
                <button
                  className="animate-bounce absolute bottom-[100px] left-[30px] p-[14px] shadow-md rounded-md bg-primary"
                  title="Chat"
                >
                  <QuestionAnswerIcon sx={{ color: "white" }} />
                </button>
              </Link>
            )}
          </div>
        </LoadScript>
      </div>
    </>
  );
}

export default Home;
