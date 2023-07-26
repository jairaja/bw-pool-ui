// import { COL_TYPES } from "react-native-datatable-component";

const rows = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const data = [
  { name: "Muhammad Rafeh", age: 21, gender: "male" },
  { name: "Muhammad Akif", age: 22, gender: "male" },
  { name: "Muhammad Umar", age: 21, gender: "male" },
  { name: "Amna Shakeel", age: 22, gender: "female" },
  { name: "Muhammad Ammar", age: 20, gender: "male" },
  { name: "Muhammad Moiz", age: 13, gender: "male" },
];

const columns = [
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150 },
];

const colNames = ["name", "age", "gender"]; //List of Strings

// const colSettings = [
//   { name: "name", type: COL_TYPES.STRING, width: "60%" },
//   { name: "age", type: COL_TYPES.INT, width: "30%" },
//   { name: "gender", type: COL_TYPES.STRING, width: "30%" },
// ];

const items = [
  {
    desc: "GGN to RTK, today, starting from Hanuman Chowk till DBP",
    sharePp: 150,
    startTime: 1600,
    startDate: "todTom",
    details: "",
    fromTo: "G2R",
  },
  {
    desc: "RTK to GGN, today, starting from DBP till Hanuman CHowk",
    sharePp: 160,
    startTime: 1400,
    startDate: "todTom",
    details: "",
    fromTo: "R2G",
  },
  {
    desc: "GGN to RTK, today, starting from Hanuman Chowk till DBP",
    sharePp: 150,
    startTime: 16,
    startDate: "todTom",
    details: "",
    fromTo: "G2R",
  },
  {
    desc: "GGN to RTK, today, starting from Hanuman Chowk till DBP",
    sharePp: 150,
    startTime: 16,
    startDate: "todTom",
    details: "",
    fromTo: "G2R",
  },
  {
    desc: "GGN to RTK, today, starting from Hanuman Chowk till DBP",
    sharePp: 150,
    startTime: 1600,
    startDate: "todTom",
    details: "",
    fromTo: "G2R",
  },
  {
    desc: "RTK to GGN, today, starting from DBP till Hanuman CHowk",
    sharePp: 160,
    startTime: 1400,
    startDate: "todTom",
    details: "",
    fromTo: "R2G",
  },
  {
    desc: "GGN to RTK, today, starting from Hanuman Chowk till DBP",
    sharePp: 150,
    startTime: 16,
    startDate: "todTom",
    details: "",
    fromTo: "G2R",
  },
  {
    desc: "GGN to RTK, today, starting from Hanuman Chowk till DBP",
    sharePp: 150,
    startTime: 16,
    startDate: "todTom",
    details: "",
    fromTo: "G2R",
  },
];

export default {
  rows,
  columns,
  data,
  colNames,
  items,
  // colSettings,
};
