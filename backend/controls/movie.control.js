import { fetchTMDB } from "../tmdb.api.js";

// all the following function can be normal arrow function as well

export async function getTrendingMovie(req, res) {
    try {
        // const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${ENV_VARS.TMDB_API_KEY}`;
        const url = `https://api.themoviedb.org/3/trending/movie/day?langauge=en-US`;
        const data = await fetchTMDB(url);
        const randMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        const id = randMovie.id;
        const detailsTrending = await fetchTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);

        res.json({success : true, content: randMovie, details: detailsTrending});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getMovieTrailer(req, res) {
    const { id } = req.params;
    
    try {
        const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
        const data = await fetchTMDB(url);
        res.json({success : true, trailer: data.results});
    } catch (error) {
        if(error.message.includes("404")) {
            return res.status(404).send(null);
        }

        res.status(500).json({ message: error.message });
    }
}


export async function getMovieInfo(req, res) {
    const { id } = req.params;

    try {
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
        const data = await fetchTMDB(url);
        res.status(200).json({success : true, info: data});
    } catch (error) {
        if(error.message.includes("404")) {
            return res.status(404).send(null);
        }

        res.status(500).json({ message: error.message });
    }
}

export async function getSimilarMovies(req, res) {
    const { id } = req.params;

    try {
        const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
        const data = await fetchTMDB(url);
        res.status(200).json({success : true, similar: data.results});
    } catch (error) {
        // if(error.message.includes("404")) {     // not needed as there will always be a similar movie
        //     return res.status(404).send(null);
        // }

        res.status(500).json({ message: error.message });
    }
}

export async function getMoviesByCategory(req, res) {
    const { category } = req.params;

    try {
        const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`;
        const data = await fetchTMDB(url);
        res.status(200).json({success : true, category: data.results});
    } catch (error) {
        // if(error.message.includes("404")) {     // not needed as there will always be a similar movie
        //     return res.status(404).send(null);
        // }

        res.status(500).json({ message: error.message });
    }
}


// const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&language=en-US&page=1`;