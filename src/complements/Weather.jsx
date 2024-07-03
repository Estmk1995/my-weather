import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import axios from 'axios'

const Weather = () =>  {

  const [data,setData] = useState({

    celcius:10,
    name:'London',
    humidity:10,
    speed:2,
    image: '/Images/summersun.png'

  })

  const [name,setName] = useState('');
  const [error,setError] = useState('');

  const handleClick =()=>{
    if(name !==""){

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=a0dd3f19f5bd9e287cb0fe3da18ac9c1&units=metric`;
      axios.get(url)
      .then(res => {
        let imagePath = '';

        if (res.data.weather[0].main == "Clouds") {
          imagePath = "/Images/cloudy.png"
        }else if (res.data.weather[0].main == "Clear"){
          imagePath = "/Images/summersun.png"

        }else if (res.data.weather[0].main == "Rain"){
          imagePath = "/Images/forecastrain.png"
        }else if (res.data.weather[0].main == "Drizzle"){
          imagePath = "/Images/moonnightraining.png"
        }else if (res.data.weather[0].main == "Mist"){
          imagePath = "/Images/cloudyweather.png"
        }else{
          imagePath = "/Images/cloudysunny.png"
        }
        console.log(res.data);
        setData({...data,celcius:res.data.main.temp,name:res.data.name,
          humidity:res.data.main.humidity,speed:res.data.wind.speed,
          image:imagePath})
          setError('');
      })
      .catch(err => {

        if (err.response.status == 404) {
          setError("No existe la ciudad")
        }else{
          setError('');
        }
        
        console.log(err)

      })
    }
  }

  return (
    <div className='weather'>
      <div className="search-bar">
        <input type="text" placeholder='Seacrh' onChange={e => setName(e.target.value)}/>
        <img src="/Images/search.png" alt="" onClick={handleClick}/>
      </div>
      <div className="error">
        <p>{error}</p>
      </div>
        <img src={data.image} alt="" className='weather-icon'/>
        <p className='temperature'>{Math.round(data.celcius)}°C</p>
        <p className='location'>{data.name}</p>
        <div className="weather-data">
          <div className="col">
            <img src="/Images/humidity.png" alt="" />
            <div>
              <p>{Math.round(data.humidity)}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src="Images/windystorm.png" alt="" />
            <div>
              <p>{data.speed} km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Weather
