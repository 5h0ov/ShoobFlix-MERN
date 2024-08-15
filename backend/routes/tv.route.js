import express from "express";
import { getTrendingTv, getTvTrailer, getTvInfo, getSimilarTv, getTvByCategory } from "../controls/tv.control.js";

const router = express.Router();

router.get("/trending", getTrendingTv);
router.get("/:id/trailer", getTvTrailer);
router.get("/:id/info", getTvInfo);
router.get("/:id/similar", getSimilarTv);
router.get("/:category", getTvByCategory);


export default router;