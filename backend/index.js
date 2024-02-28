import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});

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
