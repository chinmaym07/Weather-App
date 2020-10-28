import axios from 'axios';

const API_KEY="6e86bcf2d7687223dd082439aaba4396";
const URL = "http://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async({city,country}) => {
    const {data} = await axios.get(URL, {
        params : {
            q : `${city},${country}`,
            appid : API_KEY
        } 
    });

    return data;
}

