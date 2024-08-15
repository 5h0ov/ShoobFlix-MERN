import axios from "axios";
import { ENV_VARS } from "./config/envVar.js";

//   fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
//     .then(response => response.json())
//     .then(response => // console.log(response))
//     .catch(err => // console.error(err));

export const fetchTMDB = async (url) => {
  const options = {
    // as we have to use these options everytime we make a request to the TMDB API, we can create a function that returns these options
    // method: 'GET',
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
    },
  };

  const res = await axios.get(url, options);

  //   const res = await fetch("")
  //   const data = await res.json
  //   return data
  if (res.status !== 200) {
    throw new Error("Failed to fetch data" + res.statusText);
  }

  return res.data;
};
