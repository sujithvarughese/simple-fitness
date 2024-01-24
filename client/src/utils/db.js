
import axios from "axios"
import { config } from "./constants.js";

const db = axios.create({
  baseURL: config.url.API_URL,
  withCredentials: true,
});

db.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(error.response)
    return Promise.reject(error);
  }
);


export default db