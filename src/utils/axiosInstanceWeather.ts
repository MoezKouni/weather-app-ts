import axios from "axios";

const axiosInstanceWeather = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_URL
});

axiosInstanceWeather.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstanceWeather.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstanceWeather;
