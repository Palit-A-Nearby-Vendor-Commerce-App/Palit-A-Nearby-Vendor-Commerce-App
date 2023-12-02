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
// Import custom components for navigation bar and map sliding box
import MapSlidingBox from "../components/MapSlidingBox";
import NavigationBar from "../components/NavigationBar";
// Import custom marker images for vendor and customer
import customerMarker from "../assets/images/customer-map-icon.png";
import marker from "../assets/images/vendor-self-pin.png";
// Import icon for report button
import { MdOutlineReportGmailerrorred } from "react-icons/md";
// Import user context for accessing user data
import { UserContext } from "../UserContext";
// Import utility functions from "../utils/functions"
// Import custom styles for map container and options
import { mapContainerStyle, mapOptions } from "../assets/styles/styles";

import {
  getDistance,
  vendorIcons,
  renderVendorMarkerIcon,
  updateLocationInContext,
  calculateOffset,
  panAndZoomMap,
  handleSliderToggle,
  handleReport,
  fetchNearbyUsers,
} from "../utils/functions";
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
  // Define an effect hook for updating the location in the context
  useEffect(() => {
    // Use the navigator geolocation API to watch the position changes
    const watchId = navigator.geolocation.watchPosition(
      (position) =>
        updateLocationInContext(
          position,
          currentPosition,
          setCurrentPosition,
          user
        ),
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
    // Return a cleanup function to clear the watch
    return () => navigator.geolocation.clearWatch(watchId);
  }, [user, user.account.location.latitude, user.account.location.longitude]);
  // Define an effect hook for panning and zooming the map
  useEffect(() => {
    panAndZoomMap(mapRef, currentPosition, showSlider);
  }, [showSlider, currentPosition]);
  // Define an effect hook for fetching the nearby users
  useEffect(() => {
    fetchNearbyUsers(
      currentPosition,
      user,
      mapRef,
      customerMarker,
      markers
    );
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
                    icon={renderVendorMarkerIcon(marker)}
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
                handleSliderToggle={() =>
                  handleSliderToggle(showSlider, setShowSlider)
                }
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
