import {
  GET_LAT_LON_ERROR,
  GET_LAT_LON_REQUEST,
  GET_WEATHER_ERROR,
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
} from "../actions/types";
import { formatDate } from "../utils/dateTimeFormater";

type Data = {
  name?: string | undefined;
  code?: string | undefined;
  list: any[];
};

export type State = {
  data: Data | null;
  isLoading: boolean;
  error: null | string;
};

export type Action = {
  type: string;
  payload: any;
};

type Item = { date: string; timestamps: any[] }[] | any[];

const initialState: State = {
  data: null,
  isLoading: false,
  error: null,
};

const weatherReducer = (state: any = initialState, action: Action) => {
  // group the response from the api by day
  const groupListByDay = (data: any) => {
    let groupedByDay: Item = [];

    data.forEach((el: any) => {
      // format date and delete time
      const fullDate = formatDate(new Date(el.dt_txt));
      //   const fullDate = new Date(el.dt_txt).toLocaleDateString();
      const isExist = groupedByDay.find((day: any) => day?.date === fullDate);

      if (isExist) {
        groupedByDay = groupedByDay.map((day: any) =>
          day.date === fullDate
            ? { ...day, timestamps: [...day.timestamps, el] }
            : day
        );
      } else {
        groupedByDay.push({ date: fullDate, timestamps: [el] });
      }
    });

    // re-order days so that today object will be the second
    groupedByDay.unshift(groupedByDay.pop());
    return groupedByDay;
  };

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
        error: null,
        data: {
          list: groupListByDay(action.payload.list),
          name: action.payload.name,
          code: action.payload.code,
        },
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
