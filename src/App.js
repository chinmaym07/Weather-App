import React,{ useState } from 'react';
import {fetchWeather} from './fetchWeather';
import './App.css';
import ReactAnimatedWeather from 'react-animated-weather';

function App() {
  const [city,setCity] = useState("");
  const [country,setCountry] = useState("");
  const [data,setData] = useState(null);

  const handleChange = (e) => {
    if(e.target.name === "city") 
      setCity(e.target.value);
    else
      setCountry(e.target.value);
    e.preventDefault();
  } 

  const handleSubmit = (e)=> {
      fetchWeather({city,country})
      .then(response => response !== data ? setData(response):null);
      setCity("");
      setCountry("");
      
    e.preventDefault();
  }
  var defaults={};
  if(data)
  {
    var weekDay=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    var month=["January","February","March","April","May","June","July","August","September","October","November","December"];

    console.log (data);
    let currentTime = new Date().getHours();
    let sunsetTime = new Date(data.sys.sunset*1000).getHours();
    var date = weekDay[new Date().getDay()-1]+ " " + new Date().getDate() + " " + month[new Date().getMonth()] + " , " + new Date().getFullYear();

    var time = new Date().getHours()+ ":" + new Date().getMinutes() + ":" + new Date().getSeconds() ;
    if(new Date().getHours() >= 12)
      time += " PM";
    else
      time += " AM";
    switch(data.weather[0].main)
    {
      case "Clear":
      {
        if (currentTime <= sunsetTime)
          defaults = {icon: 'CLEAR_DAY',color:'goldenrod',size: 80,animate: true};
        else 
          defaults = {icon: 'CLEAR_NIGHT',color:'#000',size: 80,animate: true};
        
        break;
      }
      case "Haze":
      {
        defaults = {icon: 'FOG',color: '#000',size: 80,animate: true};
        break;
      }
      case "Mist" :
      case "Clouds" :
      {
        if(data.weather[0].description === "overcast clouds" )
        {
          if (currentTime <= sunsetTime)
          defaults = {icon: 'PARTLY_CLOUDY_DAY',color: '#000',size: 80,animate: true};
        else 
         defaults = {icon: 'PARTLY_CLOUDY_NIGHT',color: '#000',size: 80,animate: true};
          
        }
        else
          defaults = {icon: 'CLOUDY',color: '#000',size: 80,animate: true};
        break;
      }
      case "Rain":
      {
        if(data.weather[0].description === "light rain")
          defaults = {icon: 'SLEET',color: '#002e42',size: 80,animate: true};
        else
          defaults = {icon: 'RAIN',color: '#002e42',size: 80,animate: true};
        break;
      }
      case "Snow":
      {
        defaults = {icon: 'SNOW',color: 'white',size: 80,animate: true};
        break;
      }  
      default:
        console.log("Hello World");
    } 
  }
  return (
    <div className="App">
      <h1 className="head-1">Weather App</h1>
      <form method="post" className="fetch-form" onSubmit={handleSubmit}>
        <input type="text" name="city" placeholder="City Name" value={city} onChange={(e)=> handleChange(e)} required/>
        <input type="text" name="country" placeholder="Country Name" value={country} onChange={(e)=> setCountry(e.target.value)} required/>
        <input type="submit" value="Fetch" className="submit" />
      </form>
      {
        data ?
        <div className="weather-card card">
          <div className="date">
            <p>{date}</p>
            <p>{time}</p>
          </div>
          <h2>
            <span className="city">{data.name}</span>
            <sup className="country">{data.sys.country}</sup>
          </h2>
          
          <div className="city-temp">
              {Math.round(data.main.temp-273)}
              <sup>&deg;C</sup>
          </div>
          <ReactAnimatedWeather
            icon={defaults.icon}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
          <div className="info">
            <p>{data.weather[0].main}</p>
        </div>
        </div>:<div className="weather-card"></div>
      }
    </div>
  );
}

export default App;
