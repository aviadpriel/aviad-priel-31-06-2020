import axios from 'axios';
import {confirmAjaxResponse,confirmAjaxError} from "./reactConfirm";

let API_URL = "/api";
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    API_URL = 'http://localhost:5000/api';
}
const Api = axios.create();
Api.defaults.baseURL = API_URL;


Api.interceptors.response.use(
  async response => {
      const url =response.config.url;

      await confirmAjaxResponse(response,url);

      return response
  },
   async (error) => {
    await confirmAjaxError(error);

    return Promise.reject(error);
  });

export default Api
