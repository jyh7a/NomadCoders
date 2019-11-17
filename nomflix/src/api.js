import axios from "axio";

const api = axios.create({
   baseURL: "https://api.themoviedb.org/3/",
   params: {
      api_key: "39776c4db4f591864b15de5b257e8787",
      language: "en-US"
   }
});



export default api;