const API_KEY='dfb7377eaa0531383d6c4ccd5e810b5f'
import axios from "axios"
const getLatLon = async(city)=>{
    const URL=`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    const res = await axios.get(URL);
    console.log(res?.data)
         return res?.data

}

const getFormattedWeatherData =async(lat,lon,units)=>{
    const URL=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
    const res = await axios.get(URL);
    console.log(res?.data)
         return res?.data
}
export {getLatLon,getFormattedWeatherData}  

// About units 
// Temperature is available in Fahrenheit, Celsius and Kelvin units.

// For temperature in Fahrenheit use units=imperial
// For temperature in Celsius use units=metric