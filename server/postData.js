const express = require("express");
const app = express();

app.get("/api/posts", (req, res) => {
  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");
  res.send([
    {
      desc: "GGN to RTK, today, starting from Hanuman Chowk till DBP",
      sharePp: 150,
      startTime: 1600,
      startDate: "todTom",
      fromTo: "G2R",
    },
    {
      desc: "GGN to RTK, today, starting from Hanuman Chowk till DBP",
      sharePp: 150,
      startTime: 1600,
      startDate: "todTom",
      fromTo: "G2R",
    },
    {
      desc: "GGN to RTK, today, starting from Hanuman Chowk till DBP",
      sharePp: 150,
      startTime: 1600,
      startDate: "todTom",
      fromTo: "G2R",
    },
    {
      desc: "GGN to RTK, today, starting from Hanuman Chowk till DBP",
      sharePp: 150,
      startTime: 1600,
      startDate: "todTom",
      fromTo: "G2R",
    },
    {
      desc: "GGN to RTK, today, starting from Hanuman Chowk till DBP",
      sharePp: 150,
      startTime: 1600,
      startDate: "todTom",
      fromTo: "G2R",
    },
    {
      desc: "GGN to RTK, today, starting from Hanuman Chowk till DBP",
      sharePp: 150,
      startTime: 1600,
      startDate: "todTom",
      fromTo: "G2R",
    },
    {
      desc: "GGN to RTK, today, starting from Hanuman Chowk till DBP",
      sharePp: 150,
      startTime: 1600,
      startDate: "todTom",
      fromTo: "G2R",
    },
    {
      desc: "GGN to RTK, today, starting from Hanuman Chowk till DBP",
      sharePp: 150,
      startTime: 1600,
      startDate: "todTom",
      fromTo: "G2R",
    },
    {
      desc: "GGN to RTK, today, starting from Hanuman Chowk till DBP",
      sharePp: 150,
      startTime: 1600,
      startDate: "todTom",
      fromTo: "G2R",
    },
    {
      desc: "GGN to RTK, today, starting from Hanuman Chowk till DBP",
      sharePp: 150,
      startTime: 1600,
      startDate: "todTom",
      fromTo: "G2R",
    },
  ]);
});

app.listen(3002);
