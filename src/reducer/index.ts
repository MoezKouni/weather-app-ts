import { combineReducers } from "redux"
import store from "../store";
import weatherReducer, { State } from "./weather.reducer";

export type RootState = {
    weather: State
}

export default combineReducers<RootState>({weather: weatherReducer})