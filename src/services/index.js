import axios from "axios";

import { APP } from "../utils/constants";
import { API_REQUEST_METHOD, toastTypes } from "../utils/app-enum";
import ShowToast from "../components/custom-toast";

const API = {
  baseURL: "https://reqres.in/api/",
};

const TRAIL_URLS = {
  //Auth
  login: "login",
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


const postRequestWithHeader = async (
  trailUrl,
  data,
  avoidNavigation = false,
  isUpdate = false
) => {
  
  
  const headerData = {}

  const apiUrl = API.baseURL + trailUrl;
  if (APP.SHOW_LOG) {
    console.log("=====API======");
    console.log("URL:", apiUrl);
    console.log("PARAM", JSON.stringify(data));
    console.log("HEADERS", JSON.stringify(headerData));
    console.log(
      "METHOD:",
      isUpdate == true ? API_REQUEST_METHOD.PUT : API_REQUEST_METHOD.POST
    );
    console.log("==============");
  }

  return await axios({
    method: isUpdate == true ? API_REQUEST_METHOD.PUT : API_REQUEST_METHOD.POST,
    data: data,
    url: apiUrl,
    headers: headerData,
  })
    .then((res) => res.data)
    .catch((error) => handleError(error, apiUrl, avoidNavigation));
};


const handleError = (e, error, avoidNavigation, avoidErrorMessage = false) => {
  if (APP.SHOW_LOG) {
    console.log("Error handler:*****", JSON.stringify(e));
  }

  if (e.message) {
    ShowToast(toastTypes.error, e.message);
  }
  return e; //console.log(finalMessage, e);

}

export { API, TRAIL_URLS, getRequest, postRequestWithHeader };
