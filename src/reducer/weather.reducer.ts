import { AnyAction } from "redux";
import {
  GET_LAT_LON_ERROR,
  GET_LAT_LON_REQUEST,
  GET_WEATHER_ERROR,
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
} from "../actions/types";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const weatherReducer = (state: any = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_LAT_LON_REQUEST:
    case GET_WEATHER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_WEATHER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case GET_WEATHER_ERROR:
    case GET_LAT_LON_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;
