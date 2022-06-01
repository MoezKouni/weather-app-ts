import { Dispatch } from "redux";
import weatherServices from "../services/weather.services";
import {
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_ERROR,
} from "./types";

export const getWeather = ({ lat, lon }: { lat: number; lon: number }) => async (dispatch: Dispatch) => {
    dispatch({
      type: GET_WEATHER_REQUEST,
    });
    try {
      const response = await weatherServices.getWeather({ lat, lon });

      dispatch({
        type: GET_WEATHER_SUCCESS,
        payload: response.data
      });
    } catch (error: any) {
      dispatch({
        type: GET_WEATHER_ERROR,
        payload: error,
      });
    }
  };
