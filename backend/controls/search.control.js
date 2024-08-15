// Initialize express router

import { fetchTMDB } from "../tmdb.api.js";
import { User } from "../models/modelUser.js";



export async function searchMovie(req, res) {
    const { id } = req.params; // reminder this is not a number its a search query(string)

    try {
        const url = `https://api.themoviedb.org/3/search/movie?query=${id}&include_adult=false&language=en-US&page=1`;
        const data = await fetchTMDB(url);

        if(data.results.length === 0) {
            return res.status(404).send(null);
        }

        res.status(200).json({success : true, info: data});

    } catch (error) {
        if(error.message.includes("404")) {
            return res.status(404).send(null);
        }

        res.status(500).json({ message: error.message });
        
    }
}


export async function searchTV(req, res) {
    const { id } = req.params;

    try {
        const url = `https://api.themoviedb.org/3/search/tv?query=${id}&include_adult=false&language=en-US&page=1`;
        const data = await fetchTMDB(url);

        if(data.results.length === 0) {
            return res.status(404).send(null);
        }

        res.status(200).json({success : true, info: data});
    } catch (error) {
        if(error.message.includes("404")) {
            return res.status(404).send(null);
        }

        res.status(500).json({ message: error.message });
    }
}





// THE FUNCTION BELOW IS NOT FUNCTIONAL BECAUSE THE API DOESNT RETURN THE RESULTS WITH WHICH CONTENT TYPE IT IS SO ITS NOT REDIRECTING TO THE CORRECT WATCH PAGE IF ALL THE RESULTS ARE SHOWN TOGETHER. THE RESULTS ARE SHOWING BUT WATCHPAGE IS NOT REDIRECTING TO THE CORRECT PAGE
export async function searchCombined(req, res) {
    const { id } = req.params;
   // its not working because the api doesnt return the results with which content type it is so its not redirecting to the correct watch page if all the results are shown together. the results are showing but watchpage is not redirecting to the correct page
    try {
        const movieUrl = `https://api.themoviedb.org/3/search/movie?query=${id}&include_adult=false&language=en-US&page=1`;
        const tvUrl = `https://api.themoviedb.org/3/search/tv?query=${id}&include_adult=false&language=en-US&page=1`;

        const [movieData, tvData] = await Promise.all([fetchTMDB(movieUrl), fetchTMDB(tvUrl)]);

        const combinedResults = [...movieData.results, ...tvData.results];

        if (combinedResults.length === 0) {
            return res.status(404).send(null);
        }

        res.status(200).json({ success: true, info: { results: combinedResults } });

    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }

        res.status(500).json({ message: error.message });
    }
}
