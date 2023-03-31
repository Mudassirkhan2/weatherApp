import ReactAnimatedWeather from "react-animated-weather"
import React from 'react'
import { useState ,useEffect} from 'react';
import clouds from '../assets/cloudy.jpg';
import drizzle from '../assets/Drizzle.jpg';
import fog from '../assets/Fog.jpg';
import haze from '../assets/haze.jpg';
import rainy from '../assets/Rainy.jpg';
import snow from '../assets/snow.jpg';
import sun from '../assets/Sun.jpg';
import tornado from '../assets/Tornado.jpg';
import wind from '../assets/wind.jpg';


const IconsAnimations = ({icon ,setWeatherImg}) => {
    const defaults = {
        color: 'goldenrod',
        size: 100,
        animate: true
      };
      
    const [iconFetched, setIconFetched] = useState()

    useEffect(() => {
      switch (icon) {
        case "Haze":
          setIconFetched("CLEAR_DAY");
          setWeatherImg(haze)
          break;
        case "Clouds":
          setIconFetched("CLOUDY");
          setWeatherImg(clouds)
          break;
        case "Rain":
          setIconFetched("RAIN");
          setWeatherImg(rainy)
          break;
        case "Snow":
          setWeatherImg(snow)
          setIconFetched("SNOW");
          break;
        case "Dust":
          setIconFetched("WIND");
          setWeatherImg(wind)
          break;
        case "Drizzle":
          setIconFetched("SLEET");
          setWeatherImg(drizzle)
          break;
        case "Fog":
          setIconFetched("FOG");
          setWeatherImg(fog)
          break;
        case "Smoke":
          setIconFetched("FOG");
          setWeatherImg(fog)
          break;
        case "Tornado":
          setIconFetched("WIND");
          setWeatherImg(tornado)
          break;
        default:
          setIconFetched("CLEAR_DAY");
          setWeatherImg(sun)
          break;
      }
    }, [icon]);
  return (
    <ReactAnimatedWeather
     icon={iconFetched}
     color={defaults.color}
    size={defaults.size}
    animate={defaults.animate}
    
  />
  )
}

export default IconsAnimations
