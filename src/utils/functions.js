import fruits from "../assets/images/fruits_categ.png";
import fish from "../assets/images/fish_categ.png";
import assorted from "../assets/images/assorted_categ.png";
import manicure from "../assets/images/manicure_categ.png";
// Import axios library for making HTTP requests
import axios from "axios";


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

const vendorIcons = (category) => {
  switch (category) {
    case "fruits":
      return fruits;
    case "fish":
      return fish;
    case "manicure":
      return manicure;
    case "assorted":
      return assorted;
    default:
      return fruits;
  }
};

// Define a function for rendering the vendor marker icon
const renderVendorMarkerIcon = (marker) => {
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
// Define a function for updating the location in the context
const updateLocationInContext = (
  position,
  currentPosition,
  setCurrentPosition,
  user
) => {
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
// Define a function for calculating the offset for the map center
const calculateOffset = (mapRef) => {
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
const panAndZoomMap = (mapRef, currentPosition, showSlider) => {
  // If the map ref and current position are available
  if (mapRef.current && currentPosition) {
    // Calculate the offset value
    const offset = calculateOffset(mapRef);
    // Create a new center object with the current position and the offset
    const newCenter = {
      lat: currentPosition.lat,
      lng: currentPosition.lng + (showSlider ? offset : 0),
    };
    // Pan the map to the new center
    mapRef.current.panTo(newCenter);
  }
};
// Define a function for handling the slider toggle
const handleSliderToggle = (showSlider, setShowSlider) => {
  // Set the show slider state to the opposite of its current value
  setShowSlider(!showSlider);
};
// Define a function for handling the report button click
const handleReport = () => {
  // Redirect the window to the report page
  window.location.href = "/report";
};
// Define a function for fetching the nearby users
const fetchNearbyUsers = (
  currentPosition,
  user,
  mapRef,
  customerMarker,
  markers
) => {
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
};
// Export the utility functions
export {
  getDistance,
  vendorIcons,
  renderVendorMarkerIcon,
  updateLocationInContext,
  calculateOffset,
  panAndZoomMap,
  handleSliderToggle,
  handleReport,
  fetchNearbyUsers,
};
