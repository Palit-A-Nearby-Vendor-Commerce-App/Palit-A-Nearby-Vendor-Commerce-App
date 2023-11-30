import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
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

// Define a function to update the location of a given locationId
const updateLocation = (locationId, location) => {
  axios
      .put(`/api/updateLocationById/${locationId}`, location)
      .then((response) => {
        console.log("Location updated successfully");
      })
      .catch((error) => {
        console.error(error);
      });
};



function Home() {
  const { user, updateLocation } = useContext(UserContext);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [showSlider, setShowSlider] = useState(false);
  const mapRef = useRef();

  // Get the user location from the user context
  const userLocation = user.location;

    ///////////////////////////////////////////////////////


// Define a state variable to store the locations
  const [locations, setLocations] = useState([]);

// Define a state variable to store the error
  const [error, setError] = useState(null);

// Fetch all locations from the API when the component mounts
  useEffect(() => {
    axios
        .get("/api/getAllLocations")
        .then((response) => {
          setLocations(response.data);
        })
        .catch((error) => {
          setError(error);
        });
  }, []);

// Loop through the locations and update each one if it is not within 200m of the user location
  useEffect(() => {
    locations.forEach((location) => {
      const distance = getDistance(
          userLocation.latitude,
          userLocation.longitude,
          location.latitude,
          location.longitude
      );
      if (distance > 200) {
        // Calculate the new coordinates that are 200m away from the user location
        // Use a simple formula that assumes the Earth is a sphere
        // This is not very accurate but good enough for demonstration purposes
        const bearing = Math.atan2(
            location.longitude - userLocation.longitude,
            location.latitude - userLocation.latitude
        ); // Angle between the user location and the location in radians
        const newLatitude =
            userLocation.latitude +
            (200 / 6371e3) * Math.cos(bearing) * (180 / Math.PI); // Convert radians to degrees
        const newLongitude =
            userLocation.longitude +
            (200 / 6371e3) * Math.sin(bearing) * (180 / Math.PI);
        // Create a new location object with the updated coordinates
        const newLocation = {
          ...location,
          latitude: newLatitude,
          longitude: newLongitude,
        };
        // Update the location using the API
        updateLocation(location.locationId, newLocation);
      }
    });
  }, [locations, userLocation]);


  ///////////////////////////////////////////////////////

  console.log("/map, user: ", user);

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
          // Filter out users who are vendors and within 200 meters of the current user
          const vendorsNearby = data.filter((otherUser) => {
            console.log("otherUser: ", otherUser);
            if (
                !user.account.isVendor &&
                otherUser.account.isVendor &&
                getDistance(
                    currentPosition.lat,
                    currentPosition.lng,
                    otherUser.location.latitude,
                    otherUser.location.longitude
                ) <= 200
            ) {
              return true;
            }
            return false;
          });

          // Mark the vendors on the map with markers
          vendorsNearby.forEach((vendor) => {
            const vendorMarker = new window.google.maps.Marker({
              position: {
                lat: vendor.location.latitude,
                lng: vendor.location.longitude,
              },
              map: mapRef.current, // Assuming you have a map reference
              icon: renderVendorMarkerIcon(), // Define the icon for vendors
            });

            // You can add click event handling for the markers if needed
            vendorMarker.addListener("click", () => {
              window.location.href = `/store/${vendor.accountId}`;
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
                    <Marker
                        position={currentPosition}
                        icon={renderVendorMarkerIcon()}
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
