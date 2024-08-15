import express from 'express';
import { getUserFavorites, addFavorite, deleteFavorite } from '../controls/favorite.control.js';

const router = express.Router();

router.get('/getFav', getUserFavorites);
router.post('/addFav', addFavorite);
router.delete("/delFav/:id", deleteFavorite);

export default router;