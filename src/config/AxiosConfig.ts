import axios from "axios";
import AppConfig from "@/config/index";

axios.defaults.baseURL = AppConfig.url.api
axios.defaults.headers['Accept'] = 'application/json'
axios.defaults.headers['lang'] = AppConfig.localization.default
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true