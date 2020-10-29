import axios from 'axios';
const URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async({city,country}) => {
    const {data} = await axios.get(URL, {
        params : {
            q : `${city},${country}`,
            appid : process.env.REACT_APP_API_KEY
        } 
    });

    return data;
}

