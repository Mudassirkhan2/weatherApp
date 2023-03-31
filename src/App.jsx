import { getLatLon, getFormattedWeatherData } from "./weatherservice";
import { useEffect, useState } from "react";
import{BiSearchAlt} from "react-icons/bi"
import {HiLocationMarker} from "react-icons/hi"
import IconsAnimation from "./components/IconsAnimations";
import Details from "./components/Details";
import sunImage from './assets/Sun.jpg';


function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("London")
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState("metric")
  const [toggle, setToggle] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [weatherImg, setWeatherImg] = useState(sunImage)
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [isUserAllowed, setisUserAllowed] = useState(false)

  
useEffect(() => {
    const fetchData = async () => {
      setWeatherData([])
      setIsLoading(true);
      const latLonData = await getLatLon(city);
      console.log(latLonData)
      setLat(latLonData[0].lat)
      setLng(latLonData[0].lon)
    };
    fetchData();
  },[units,city]);

  useEffect(()=>{
    const fetchWeatherData = async () => {
      try {
        const formattedWeatherData = await getFormattedWeatherData(lat,lng,units);
        setWeatherData([formattedWeatherData]);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching weather data: ', error);
      }
    };
    fetchWeatherData();
  }, [lat, lng, units,city]);

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setStatus('Geolocation is not supported by your browser');
      } else {
        setStatus('Locating...');
        navigator.geolocation.getCurrentPosition((position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setisUserAllowed(true)
        }, () => {
          setStatus('Unable to retrieve your location');
        });
      }
    }
    if(isUserAllowed){
      getLocation();
    }
    getLocation();
  }, [city]); 

 

  const handleClickUnits=(e)=>{
    e.preventDefault()
    console.log(toggle)
    setToggle(!toggle)
    if(!toggle){
      setUnits("imperial")
    }
    else{
      setUnits("metric")
    }
  }

  const handleSearch=(e)=>{
    e.preventDefault()
    if(inputValue){
      setCity(inputValue)
    }
    console.log(city)
  }
  

  return (
    <div className="bg-gradeint bg-cover bg-no-repeat bg-center text-white relative">
      <div className="App flexbox">
        <div className="h-5/6 w-[95%] md:w-[70%] p-4  bg-cover bg-no-repeat bg-center rounded-lg " style={{ backgroundImage: `url(${weatherImg})` }}>
        <p className="text-black text-center font-bold absolute bottom-0 right-0 ">Allow us to locate you and show the weather in your area.</p>
          <div className="flexbox justify-between bg-overlay py-3 px-2 rounded-lg">
            <div className="flexbox relative ">
              <input type="text" placeholder="Search by City name"  onChange={(e) => setInputValue(e.target.value)} className="rounded-lg sm:px-3 py-1 bg-transparent border-2 border-white outline-none"/>
              <BiSearchAlt onClick={(e)=>handleSearch(e)}  className="absolute right-1 text-white w-5 h-5 cursor-pointer  "/>
            </div>
            <div className="px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-bold text-xl bg-white text-black cursor-pointer">
                <button onClick={(e)=>handleClickUnits(e)}>{toggle ?'°C':'°F'}</button>
            </div>
          </div>

     
      {isLoading && <div className="text-2xl text-red-400 font-semibold">Loading...</div>}
      {error && <div>Error fetching data. {status}</div>}

      {weatherData && weatherData.map(
        (item) => (
           <div key={item.id} >
              <div className="flexbox justify-between my-6 bg-overlay rounded-lg p-4">
                 <div>
                   <h2 className="sm:text-2xl"><span><HiLocationMarker/></span>{item.name},{item.sys.country}</h2> 
                    <h2 className="text-6xl">{item.main.temp.toFixed()}
                    <span className="text-xl">
                    {units==="metric" ?'°c':'°F'}
                    </span>
                    </h2>
                 </div>
                 <div className="text-center ">
                    <IconsAnimation className="w-8 h-8" icon={item.weather[0].main} setWeatherImg={setWeatherImg}/>
                    <h3>{item.weather[0].main}</h3>
                 </div>
              </div>
             <Details item={item} units={units}/>
           </div>))}
        </div>

      </div>
    </div>

  );
}
export default App;

