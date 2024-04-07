// Environment constants should be coming from server

const SERVER_URL = "http://localhost:3000"; // dev
// const SERVER_URL = 'https://my-staging-server.com'; // staging
// const SERVER URL = 'https://my-prod-server.com'; // production

const GOOGLE_API_KEY = "1234"; // dev
// const GOOGLE_API_KEY = '5678'; // staging
// const GOOGLE_API_KEY = '9101'; // production

const APP_NAME = "Go Green";
const APP_NAME_Slogan = "Save Environment and Money";

const ROUTE_INFO = [
  { value: "Hatfield to London", key: "hatf2lndn" },
  { value: "London to Hatfield", key: "lndn2hatf" },
];

const VEHICLE_TYPE_FOR_RIDER = ["Car"];
// const VEHICLE_TYPE_FOR_RIDER = ["Car", "Bike", "Any"];

const VEHICLE_TYPE_FOR_VEHICLE_OWNER = ["Car"];
// const VEHICLE_TYPE_FOR_VEHICLE_OWNER = ["Car", "Bike"];

const COMMUNICATION_MODE = ["WhatsApp", "Call", "Any"];

const FUEL_TYPE = ["Petrol", "Diesel", "CNG"];

const REFUELING_OPTION_REQUIRED = true;

const TOD_TOM = [
  { value: "Today", key: "today" },
  { value: "Tomorrow", key: "tomorrow" },
];

export {
  SERVER_URL,
  GOOGLE_API_KEY,
  APP_NAME,
  APP_NAME_Slogan,
  ROUTE_INFO,
  VEHICLE_TYPE_FOR_RIDER,
  TOD_TOM,
  FUEL_TYPE,
  COMMUNICATION_MODE,
  VEHICLE_TYPE_FOR_VEHICLE_OWNER,
  REFUELING_OPTION_REQUIRED,
};
