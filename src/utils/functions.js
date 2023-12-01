import fruits from "../assets/images/fruits_categ.png";
import fish from "../assets/images/fish_categ.png";
import assorted from "../assets/images/assorted_categ.png";
import manicure from "../assets/images/manicure_categ.png";

const R = 6371;
const deg2rad = (deg) => deg * (Math.PI / 180);
export const getDistance = (lat1, lon1, lat2, lon2) => {
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1000;
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

export const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};
