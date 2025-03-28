import axios from "axios";

const urlOriginal = `${window.location.origin}/api/v1/`;

const request = axios.create({
  //get url current 
  // baseURL: urlOriginal,
  baseURL: "https://demo.vazosales.xyz/api/v1/",
  headers: {
    // Authorization: `Bearer ${accessToken}`,
    // "Refresh-Token": refreshToken
  },

  // withCredentials: true,
  cors: true,
  // XMLHttpRequest: true,
});

export const get = async (path, options = {}) => {
  //auto add apiKey to path// check path has ?
  if (!path.includes("?")) {
    path += "?apiKey=0a9be0972ff5f4a930e25733d0f8d355";
  } else {
    path += "&apiKey=0a9be0972ff5f4a930e25733d0f8d355";
  }
  const response = await request.get(path, options);
  return response.data;
};

export default request;
