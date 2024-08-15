import express from 'express';
import { getTrendingMovie, getMovieTrailer, getMovieInfo, getSimilarMovies, getMoviesByCategory } from '../controls/movie.control.js';

const router = express.Router();

router.get('/trending', getTrendingMovie);
router.get('/:id/trailer', getMovieTrailer);
router.get('/:id/info', getMovieInfo);
router.get('/:id/similar', getSimilarMovies);
router.get('/:category', getMoviesByCategory);


export default router;