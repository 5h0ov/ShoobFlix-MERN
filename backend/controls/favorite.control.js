import { parse } from "dotenv";
import { User } from "../models/modelUser.js";
import express from "express";

// Get user's favorites
export async function getUserFavorites(req, res) {
  try {
    const userId = req.user.id;
    // // console.log("HEHEHHE",userId);
    const user = await User.findById(userId).populate("favorites");
    res.status(200).json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Add a movie/TV show to user's favorites`
export async function addFavorite(req, res) {
  try {
    const userId = req.user.id;
    const { contentId, contentType } = req.body;

    const user = await User.findById(userId);
    user.favorites.push({ contentId, contentType });
    await user.save();

    res.status(200).json({ success: true, message: "Added to favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete a favourite
export async function deleteFavorite(req, res) {
  try {
    const userId = req.user.id;
    const contentId = req.params.id;

    // console.log("contentId: ", contentId);

    const user = await User.findById(userId);
    user.favorites = user.favorites.filter(
      (fav) => fav.contentId !== contentId
    ); // Remove the favorite from the array with the given contentId and contentType

    await user.save();
    // console.log("user.favorites: ", user.favorites);

    res.status(200).json({ success: true, message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
