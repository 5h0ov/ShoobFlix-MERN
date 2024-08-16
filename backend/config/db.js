import mongoose from "mongoose";
import { ENV_VARS } from "./envVar.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGODB_URI);
    console.log("Database connected successfully: ", conn.connection.host);
  } catch (error) {
    console.log("Error connecting to database: ", error.message);
    process.exit(1); // exit with fa    ilure
  }
};
