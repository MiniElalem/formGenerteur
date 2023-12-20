// src/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/formRoutes.js";
import connectDB from "./utils/dbConnection.js";
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

connectDB();
app.use("/api/forms", routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


