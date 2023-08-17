import axios from "axios";

export const api = axios.create({
  baseURL: 'https://deadbydaylight-api.onrender.com/',
  timeout: 20000
})