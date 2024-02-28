import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const connect = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connection is successful");
  } catch (err) {
    console.log("Error while connecting Mongo DB", err);
  }
};

app.listen(8080, () => {
  connect();
  console.log("Server is live on port 8080");
});
