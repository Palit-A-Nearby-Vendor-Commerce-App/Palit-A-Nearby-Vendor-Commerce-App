// Import React and its hooks
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// Import Google Maps components from react-google-maps library
import { Circle, GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Import custom marker images for vendor and customer
import customerMarker from "../assets/images/customerIcon.png";
import marker from "../assets/images/vendor-self-pin.png";

// Import axios library for making HTTP requests
import axios from "axios";

// Import custom components for navigation bar and map sliding box
import MapSlidingBox from "../components/MapSlidingBox";
import NavigationBar from "../components/NavigationBar";

// Import icon for report button
import { MdOutlineReportGmailerrorred } from "react-icons/md";

// Import user context for accessing user data
import { UserContext } from "../UserContext";

// Import custom styles for map container and options
import { mapContainerStyle, mapOptions } from "../assets/styles/styles";

// Import utility function for calculating distance between two points
import { getDistance, vendorIcons } from "../utils/functions";

let markers = [];

// Define the Home component
function Home() {
  // Get the user and setUser function from the user context
  const { user, setUser } = useContext(UserContext);

  // Define state variables for current position, nearby users, and show slider
  const [currentPosition, setCurrentPosition] = useState(null);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [showSlider, setShowSlider] = useState(false);

  // Define a ref variable for the map object
  const mapRef = useRef();

  // Define a callback function for loading the map
  const onMapLoad = useCallback(
    (map) => {
      // Assign the map object to the map ref
      mapRef.current = map;
      // If the current position is available, set the map center to it
      if (currentPosition) {
        mapRef.current.setCenter(currentPosition);
      }
    },
    [currentPosition]
  );

  // Define a function for rendering the vendor marker icon
  const renderVendorMarkerIcon = () => {
    // Check if the google maps object is available
    if (
      typeof window.google === "object" &&
      typeof window.google.maps === "object"
    ) {
      // Return an object with the marker image url and scaled size
      return {
        url: marker,
        scaledSize: new window.google.maps.Size(40, 40),
      };
    }
    // Otherwise, return undefined
    return undefined;
  };

  // Define an effect hook for updating the location in the context
  useEffect(() => {
    // Define a function for updating the location in the context
    const updateLocationInContext = (position) => {
      // Get the latitude and longitude from the position object
      const { latitude, longitude } = position.coords;
      // Create an updated location object with the latitude and longitude
      const updatedLocation = { lat: latitude, lng: longitude };

      // Set the current position state to the updated location
      setCurrentPosition(updatedLocation);

      // If the user and user location are available, make a PUT request to update the location in the database
      if (user && user.account.location) {
        axios
          .put(
            `http://localhost:8080/api/updateLocationById/${user.account.location.locationId}`,
            // { latitude, longitude }
            { latitude: latitude, longitude: longitude }
          )
          .then((response) => {
            console.log("Location successfully updated: ", response.data);
            // Set the current position state to the response data
            setCurrentPosition({
              lat: response.data.latitude,
              lng: response.data.longitude,
            });
          })
          .catch((error) => {
            // Log the error to the console
            console.error("Error updating location:", error);
          });
      }
    };

    // Use the navigator geolocation API to watch the position changes
    const watchId = navigator.geolocation.watchPosition(
      updateLocationInContext,
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    // Return a cleanup function to clear the watch
    return () => navigator.geolocation.clearWatch(watchId);
  }, [user, user.account.location.latitude, user.account.location.longitude]);

  // Define a function for calculating the offset for the map center
  const calculateOffset = () => {
    // If the map ref is available, get the zoom level of the map
    if (mapRef.current) {
      const zoomLevel = mapRef.current.getZoom();
      // Return the offset value based on the zoom level
      return 0.02 / Math.pow(2, zoomLevel - 14);
    }
    // Otherwise, return 0
    return 0;
  };

  // Define a function for panning and zooming the map
  const panAndZoomMap = () => {
    // If the map ref and current position are available
    if (mapRef.current && currentPosition) {
      // Calculate the offset value
      const offset = calculateOffset();
      // Create a new center object with the current position and the offset
      const newCenter = {
        lat: currentPosition.lat,
        lng: currentPosition.lng + (showSlider ? offset : 0),
      };
      // Pan the map to the new center
      mapRef.current.panTo(newCenter);
    }
  };

  // Define an effect hook for panning and zooming the map
  useEffect(() => {
    panAndZoomMap();
  }, [showSlider, currentPosition]);

  // Define a function for handling the slider toggle
  const handleSliderToggle = () => {
    // Set the show slider state to the opposite of its current value
    setShowSlider(!showSlider);
  };

  // Define a function for handling the report button click
  const handleReport = () => {
    // Redirect the window to the report page
    window.location.href = "/report";
  };

  // Define an effect hook for fetching the nearby users
  useEffect(() => {
    // Make a GET request to get all the users from the database
    axios
      .get("http://localhost:8080/api/getAllUsers")
      .then(({ data }) => {
        // Log the users
        console.log("Users:", data);

        // Filter out users who are vendors and within 200 meters of the current user
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

        // Mark the users on the map with markers
        getNearbyUsers.forEach((user) => {
          console.log("markers: ", markers);

          // If the marker already exists, remove it
          if (markers[user.account.accountId]) {
            markers[user.account.accountId].setMap(null);
          }

          const userMarker = new window.google.maps.Marker({
            position: {
              lat: user.account.location.latitude,
              lng: user.account.location.longitude,
            },
            map: mapRef.current, // Assuming you have a map reference
            icon: {
              url: user.account.isVendor
                ? vendorIcons(user.account.store.category)
                : customerMarker,
              scaledSize: new window.google.maps.Size(30, 30),
            },
          });

          // Add the marker to mapRef.current.markers
          markers[user.account.accountId] = userMarker;

          // You can add click event handling for the markers if needed
          userMarker.addListener("click", () => {
            window.location.href = `/store/${user.accountId}`;
          });
        });
      })
      .catch((error) => console.error("Error fetching users: ", error));
  }, [currentPosition, user.account]);

  // Return the JSX element for rendering the component
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

// Export the Home component
export default Home;
