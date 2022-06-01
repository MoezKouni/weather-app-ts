import axiosInstanceGeo from "../utils/axiosInstanceGeo";


const getGeoLocation = async (city: string | undefined) => {
    const response = await axiosInstanceGeo({
        method: "get",
        params:{
            q: city
        }
    })

    return response
};


export default {
    getGeoLocation
}