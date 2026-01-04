// Environment constants should be coming from server

const SERVER_URL = "http://localhost:3000"; // dev
// const SERVER_URL = 'https://my-staging-server.com'; // staging
// const SERVER URL = 'https://my-prod-server.com'; // production

const GOOGLE_API_KEY = "1234"; // dev
// const GOOGLE_API_KEY = '5678'; // staging
// const GOOGLE_API_KEY = '9101'; // production

const APP_NAME = "Go Green";
const APP_NAME_Slogan = "Save Environment and Money";

const ROUTE_INFO = ["Hatfield to London", "London to Hatfield"];

const VEHICLE_TYPE_FOR_RIDER = ["Car"];
// const VEHICLE_TYPE_FOR_RIDER = ["Car", "Bike", "Any"];

const VEHICLE_TYPE_FOR_VEHICLE_OWNER = ["Car"];
// const VEHICLE_TYPE_FOR_VEHICLE_OWNER = ["Car", "Bike"];

const COMMUNICATION_MODE = ["WhatsApp", "Call", "Any"];

const FUEL_TYPE = ["Petrol", "Diesel", "CNG", "Electric"];

const SHARE_PER_SEAT = [10, 15, 20, 25];

const REFUELING_OPTION_REQUIRED = true;

const CURRENCY_SYMBOL = "£";

export {
  SERVER_URL,
  CURRENCY_SYMBOL,
  SHARE_PER_SEAT,
  GOOGLE_API_KEY,
  APP_NAME,
  APP_NAME_Slogan,
  ROUTE_INFO,
  VEHICLE_TYPE_FOR_RIDER,
  FUEL_TYPE,
  COMMUNICATION_MODE,
  VEHICLE_TYPE_FOR_VEHICLE_OWNER,
  REFUELING_OPTION_REQUIRED,
};
