import { getLatLon, getFormattedWeatherData } from "./weatherservice";
import { useEffect, useState } from "react";
import{BiSearchAlt} from "react-icons/bi"
import {HiLocationMarker} from "react-icons/hi"
import IconsAnimation from "./components/IconsAnimations";
import Details from "./components/Details";
import sunImage from './assets/Sun.jpg';


function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("Hyderabad")
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState("metric")
  const [toggle, setToggle] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [weatherImg, setWeatherImg] = useState(sunImage)

useEffect(() => {
    const fetchData = async () => {
      setWeatherData([])
      setIsLoading(true);
      try {
        const latLonData = await getLatLon(city);
        const formattedWeatherData = await getFormattedWeatherData(latLonData[0].lat, latLonData[0].lon,units);
        setWeatherData([formattedWeatherData])
        setIsLoading(false);
        console.log(weatherData)
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }

    };
    fetchData();

  },[units,city]);
 

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
    <div className="bg-gradeint bg-cover bg-no-repeat bg-center text-white">
      <div className="App flexbox">
        <div className="h-5/6 w-[95%] md:w-[70%] p-4  bg-cover bg-no-repeat bg-center rounded-lg " style={{ backgroundImage: `url(${weatherImg})` }}>
        
          <div className="flexbox justify-between bg-overlay py-3 px-2 rounded-lg">
            <div className="flexbox relative ">
              <input type="text" placeholder="Search by City name"  onChange={(e) => setInputValue(e.target.value)} className="rounded-lg sm:px-3 py-1 bg-transparent border-2 border-white outline-none"/>
              <BiSearchAlt onClick={(e)=>handleSearch(e)}  className="absolute right-1 text-white w-5 h-5 cursor-pointer  "/>
            </div>
            <div className="px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-bold text-xl bg-white text-black cursor-pointer">
                <button onClick={(e)=>handleClickUnits(e)}>{toggle ?'°C':'°F'}</button>
            </div>
          </div>

     
      {isLoading && <div className="loader">Loading...</div>}
      {error && <div>Error fetching data.</div>}

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

