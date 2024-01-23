
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

const getWorkoutsPage = async (pageNumber=1, options) => {
  if (!options) return
  try {
    const response = await db(`"/workouts/?page=${pageNumber}`, {
      params: options
    })
    const { workouts } = response.data
    return workouts
  } catch (error) {
    throw new Error(error)
  }
}


export { db, getWorkoutsPage }