import { fetchTMDB } from "../tmdb.api.js";

// all the following function can be normal arrow function as well

export async function getTrendingTv(req, res) {
    try {
        // const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${ENV_VARS.TMDB_API_KEY}`;
        const url = `https://api.themoviedb.org/3/trending/tv/day?langauge=en-US`;
        const data = await fetchTMDB(url);
        const randTV = data.results[Math.floor(Math.random() * data.results?.length)];
        const id = randTV.id;
        const details = await fetchTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);


        res.json({success : true, content: randTV, details: details});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getTvTrailer(req, res) {
    const { id } = req.params;
    
    try {
        const url = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;
        const data = await fetchTMDB(url);
        res.json({success : true, trailer: data.results});
    } catch (error) {
        if(error.message.includes("404")) {
            return res.status(404).send(null);
        }

        res.status(500).json({ message: error.message });
    }
}


export async function getTvInfo(req, res) {
    const { id } = req.params;

    try {
        const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
        const data = await fetchTMDB(url);
        res.status(200).json({success : true, info: data});
    } catch (error) {
        if(error.message.includes("404")) {
            return res.status(404).send(null);
        }

        res.status(500).json({ message: error.message });
    }
}

export async function getSimilarTv(req, res) {
    const { id } = req.params;

    try {
        const url = `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`;
        const data = await fetchTMDB(url);
        res.status(200).json({success : true, similar: data.results});
    } catch (error) {
        // if(error.message.includes("404")) {     // not needed as there will always be a similar movie
        //     return res.status(404).send(null);
        // }

        res.status(500).json({ message: error.message });
    }
}

export async function getTvByCategory(req, res) {
    const { category } = req.params;

    try {
        const url = `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`;
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