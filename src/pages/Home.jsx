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
import customerMarkerNowServing from "../assets/images/customerMarkerNowServing.png";
import marker from "../assets/images/vendor-self-pin.png";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import axios from "axios";
import MapSlidingBox from "../components/MapSlidingBox";
import NavigationBar from "../components/NavigationBar";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { UserContext } from "../UserContext";
import { mapContainerStyle, mapOptions } from "../assets/styles/styles";
import { getDistance, vendorIcons } from "../utils/functions";
import { useHistory } from "react-router";
import { set } from "date-fns";

let markers = [];

const zoom = 18;

function Home() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [showSlider, setShowSlider] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [activeTransactions, setActiveTransactions] = useState([]);
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

  useEffect(() => {
    if (!user || user.email) {
      setUser(null);
      history.push("/landing");
    }
  }, [user, history]);

  const renderMarkerIcon = () => {
    const isMounted = mapRef.current;
    if (!isMounted) return null;
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

  const clearMarkers = () => {
    markers?.forEach((marker) => marker.setMap(null));
    markers = [];
  };

  const updateLocationInContext = (position) => {
    const isMounted = mapRef.current;
    if (!isMounted) return null;

    const { latitude, longitude } = position.coords;
    const updatedLocation = { lat: latitude, lng: longitude };

    setCurrentPosition(updatedLocation);

    if (user && user.account.location && mapRef.current) {
      axios
        .put(
          `http://localhost:8080/api/updateLocationById/${user.account.location.locationId}`,
          {
            ...user.account.location,
            latitude: latitude,
            longitude: longitude,
          }
        )
        .then((response) => {
          user.account.location = response.data;
          setCurrentPosition({
            lat: response.data.latitude,
            lng: response.data.longitude,
          });
          axios
            .get("http://localhost:8080/api/getAllUsers")
            .then(({ data }) => {
              let nearbyUsers = data.filter((otherUser) => {
                return (
                  (user.account.isVendor !== otherUser.account.isVendor) &&
                  otherUser.account.location.isActive &&
                  getDistance(
                    user.account.location.latitude,
                    user.account.location.longitude,
                    otherUser.account.location.latitude,
                    otherUser.account.location.longitude
                  ) <= 200
                );
              });

              axios
                .get("http://localhost:8080/api/getAllTransactions")
                .then((response) => {
                  setActiveTransactions([]);
                  response.data.filter((transaction) => transaction.status === "Now Serving").forEach(transaction => {
                    setActiveTransactions(prevTransactions => [...prevTransactions, transaction]);
                  });
                })
                .catch((error) =>
                  console.error("Error fetching transactions: ", error)
                );

              clearMarkers();

              nearbyUsers.forEach((user) => {
                activeTransactions.some((transaction) => {
                  return (
                    transaction.customer.accountId === user.account.accountId
                  );
                });

                const userMarker = new window.google.maps.Marker({
                  position: {
                    lat: user.account.location.latitude,
                    lng: user.account.location.longitude,
                  },
                  map: mapRef.current,
                  icon: {
                    url: user.account.isVendor
                      ? vendorIcons(user.account.store.category)
                      : activeTransactions.some(
                          (transaction) =>
                            transaction.customer.accountId ===
                            user.account.accountId
                        )
                      ? customerMarkerNowServing
                      : customerMarker,
                    scaledSize: user.account.isVendor
                      ? new window.google.maps.Size(45, 45)
                      : activeTransactions.some(
                          (transaction) =>
                            transaction.customer.accountId ===
                            user.account.accountId
                        )
                      ? new window.google.maps.Size(30, 45)
                      : new window.google.maps.Size(20, 20),
                  },
                  owner: user,
                });

                markers.push(userMarker);


                if (userMarker.owner.account.isVendor) {
                  userMarker.addListener("click", () => {
                    handleMarkerClick(userMarker.owner);
                  });
                }
              });
            })
            .catch((error) => console.error("Error fetching users: ", error));
        })
        .catch((error) => {
          console.error("Error updating location:", error);
        });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        updateLocationInContext,
        (error) => console.log(error),
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [activeTransactions]);

  const calculateOffset = () => {
    const isMounted = mapRef.current;
    if (!isMounted) {
      return null;
    }
    if (mapRef.current && mapRef.current.getZoom) {
      const zoomLevel = mapRef.current.getZoom();
      return 0.02 / Math.pow(2, zoomLevel - 14);
    }
    return 0;
  };

  const panAndZoomMap = () => {
    const isMounted = mapRef.current;
    if (!isMounted) return null;
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
              zoom={zoom}
              className="flex-1"
              options={mapOptions}
              onLoad={onMapLoad}
            >
              {currentPosition && (
                <Marker position={currentPosition} icon={renderMarkerIcon()} />
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
                borderRadius: "20px",
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
                  style={{ borderRadius: "20px" }}
                  className="animate-bounce absolute bottom-[100px] left-[30px] p-[14px] shadow-md bg-primary "
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
