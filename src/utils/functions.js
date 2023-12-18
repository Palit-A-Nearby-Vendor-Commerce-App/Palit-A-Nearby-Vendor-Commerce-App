import fruits from "../assets/images/apple_.png";
import fish from "../assets/images/fish_.png";
import assorted from "../assets/images/assorted_.png";
import manicure from "../assets/images/manicure_.png";

const deg2rad = (deg) => deg * (Math.PI / 180);

export const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000; // Earth's radius in meters
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};


export const vendorIcons = (category) => {
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

export const convertToTime = (timestamp) => {
  const dateObject = new Date(timestamp);

  const formattedTime = dateObject.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return formattedTime;
};
