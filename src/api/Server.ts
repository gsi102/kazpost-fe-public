import axios from "axios";

export const Server = axios.create({
  baseURL: process.env.SERVER_URI,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
