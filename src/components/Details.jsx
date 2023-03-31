import React from 'react'

const Details = ({item,units}) => {
  return (
            <div className="grid grid-cols-2 gap-6 mt-28 text-center items-center justify-center">
               <div className="wrapper">
                 <small className="text-lg">Humidity</small>
                 <h2 className="text-3xl sm:text-5xl">{item.main.humidity.toFixed()}
                    <span className="text-lg">%</span>
                 </h2>
                </div>
               <div className="wrapper">
                 <small className="text-lg">Pressure</small>
                 <h2 className="text-3xl sm:text-5xl">{item.main.pressure.toFixed()}
                     <span className="text-lg">hPa</span>
                 </h2>
              </div>
               <div className="wrapper">
                <small className="text-lg">feels_like</small>
                 <h2 className="text-3xl sm:text-5xl" >{item.main.feels_like.toFixed()}
                  <span className="text-lg">{units==="metric" ?'°c':'°F'}</span>
                 </h2>
              </div>
              <div className="wrapper">
                <small className="text-lg">Speed</small>
                  <h2 className="text-3xl sm:text-5xl">{item.wind.speed.toFixed()}
                 <span className="text-lg">{units==="metric" ?'meter/sec':'miles/hour'}</span>
                </h2>
              </div>
            </div>
  )
}

export default Details
