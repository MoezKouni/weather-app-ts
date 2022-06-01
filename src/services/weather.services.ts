import axiosInstanceWeather from "../utils/axiosInstanceWeather";


const getWeather = async ({lat, lon}: {lat: number, lon: number}) => {
    const response = await axiosInstanceWeather({
        method: "get",
        params:{
            lat,
            lon
        }
    })

    return response
};


export default {
    getWeather
}