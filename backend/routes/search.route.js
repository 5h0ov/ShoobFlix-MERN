import express from 'express';
import { searchMovie, searchTV, searchCombined } from '../controls/search.control.js';

const router = express.Router();

router.get('/movie/:id', searchMovie);
router.get('/tv/:id', searchTV);

router.get('/combined/:id', searchCombined); // to search both movies and tv shows but its not working. more details in server.control.js under searchCombined function

export default router