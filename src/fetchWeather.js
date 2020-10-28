import axios from 'axios';

import {API_KEY} from './key';
const URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async({city,country}) => {
    const {data} = await axios.get(URL, {
        params : {
            q : `${city},${country}`,
            appid : API_KEY
        } 
    });

    return data;
}

