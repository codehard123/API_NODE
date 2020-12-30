const express = require("express");
const app = express();
const productRoutes = require("./products");
const meetingRoutes = require("./meeting");
const participantRoutes = require("./participants");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/products", productRoutes);
app.use("/meetings", meetingRoutes);
app.use("/participants", participantRoutes);
mongoose.connect(
  "mongodb+srv://node-shop:nodeishowicode@cluster0.wf4jx.mongodb.net/node-shop?retryWrites=true&w=majority"
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization"
  );
  if (req.method === "OPTIONS") {
    // List of methods allowed for CORS
    res.header(
      "Access-Control-Allow-Methods",
      "PUT",
      "POST",
      "PATCH",
      "DELETE",
      "GET"
    );
  }
  next(); //the filtrate
});
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
