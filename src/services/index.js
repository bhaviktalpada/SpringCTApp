import axios from "axios";

import { APP } from "../utils/constants";

const API = {
  baseURL: "https://jsonplaceholder.typicode.com/",
};

const TRAIL_URLS = {
  //Auth
  rootPost: "posts",
};

const getRequest = async (trailUrl, params) => {
  const apiUrl = API.baseURL + trailUrl;

  if (APP.SHOW_LOG) {
    console.log("=====API======");
    console.log("URL:", apiUrl);
    console.log("METHOD:", "GET");
    console.log("PARAM:", params ? params : `No Param`);
    // console.log('HEADERS:', headerData);
    console.log("==============");
  }

  return await axios({
    method: "GET",
    data: params,
    url: apiUrl,
    // headers: headerData,
  })
    .then((res) => res.data)
    .catch((e) => e);
  //handleError(e, apiUrl, false)
};

export { API, TRAIL_URLS, getRequest };
