import geoServices from "../services/geo.services";
import { GET_LAT_LON_ERROR, GET_LAT_LON_REQUEST } from "./types";
import { getWeather } from "./weather.actions";

export const getGeoLatLon = (city: string) => async (dispatch: any) => {
  dispatch({
    type: GET_LAT_LON_REQUEST,
  });
  try {
    const response = await geoServices.getGeoLocation(city);

    if(response.data.length > 0){
        dispatch(
          getWeather({
            lat: response.data[0].lat || undefined,
            lon: response.data[0].lon || undefined,
            name: response.data[0].name
          })
        );
    } else {
        dispatch({type: GET_LAT_LON_ERROR, payload: "ERRROOOR"});
        console.log("EROR")
    }
  } catch (error: any) {
    dispatch({
      type: GET_LAT_LON_ERROR,
      payload: error,
    });
  }
};
