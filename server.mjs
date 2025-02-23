// server.js
// const express = require("express");
// const cors = require("cors");
import express from "express";
import cors from "cors";

// import routes
import transfer from "./api/transfer.mjs";

const app = express();
const port = 5001;

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000",
}));

app.use(express.json());

// Import your API handlers (assuming they export a function)
app.post("/api/transfer", transfer);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});