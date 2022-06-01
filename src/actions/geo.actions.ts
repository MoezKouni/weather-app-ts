import geoServices from "../services/geo.services";
import { GET_LAT_LON_ERROR, GET_LAT_LON_REQUEST } from "./types";
import { getWeather } from "./weather.actions";

export const getGeoLatLon = (city: string) => async (dispatch: any) => {
  dispatch({
    type: GET_LAT_LON_REQUEST,
  });
  try {
    const response = await geoServices.getGeoLocation(city);

    dispatch(
      getWeather({
        lat: response.data[0].lat || undefined,
        lon: response.data[0].lon || undefined,
      })
    );
  } catch (error: any) {
    dispatch({
      type: GET_LAT_LON_ERROR,
      payload: error,
    });
  }
};
