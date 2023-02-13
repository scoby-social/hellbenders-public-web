import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 100000,
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default client;
