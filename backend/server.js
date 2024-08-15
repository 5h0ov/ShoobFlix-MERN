import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import favoriteRoutes from "./routes/favorite.route.js";
import { checkUserAuth } from "./checkUserAuth.js";

import { ENV_VARS } from "./config/envVar.js";
import { connectDB } from "./config/db.js";

const app = express();
// dotenv.config();
const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use(express.json()); // hey express, parse incoming requests with JSON payloads
app.use(cookieParser()); // hey express, parse cookies
app.use(
  cors({
    origin: "http://localhost:5173", // hey express, allow requests from this origin
    credentials: true, // hey express, allow cookies to be sent back and forth
  })
);

app.use("/api/auth", authRoutes); // hey express, use the authRoutes for any requests that start with /api/auth
// this is done to keep the codebase clean and modular
app.use("/api/movie", checkUserAuth, movieRoutes); // hey express, use the movieRoutes for any requests that start with /api/movie
app.use("/api/tv", checkUserAuth, tvRoutes); // hey express, use the tvRoutes for any requests that start with /api/tv
app.use("/api/search", checkUserAuth, searchRoutes);
// middleware(checkUserAuth) is just a function, it runs before the route handler
// it can modify the request and response objects
// the /movies and /tv routes are going to be later used in frontend to fetch their respective content trending data!!!
app.use("/api/favorite", checkUserAuth, favoriteRoutes); // hey express, use the favoriteRoutes for any requests that start with /api/favorite

// console.log(process.env.MONGODB_URI);

// to serve the frontend in production
// so with this we can access the react app using the port of the backend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist"))); // dist is from running build from the package.json in the frontend  and __dirname means under root
  app.get("*", (req, res) => {
    // for any other routes other than the backend api routes
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    path.resolve(__dirname, "frontend", "build", "index.html");
  });
}

app.listen(PORT, () => {
  // console.log('Server is running on http://localhost:' + PORT);
  connectDB();
});

// djXgs3pde9xXAUkp
