import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'


function Main() {
    const[weatherData,setWeatherData]=useState(null)
    const[location,setLocation]=useState('')


    useEffect(()=>{
        const fetchData = async ()=>
        {
            try {
                const response= await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=7361f643c86e46e786e223422232409&q=${location}&days=4&aqi=yes&alerts=yes
                `)
                setWeatherData(response.data)
            } catch (error) {
                console.log("error")
                
            }
            
        };
        if(location)
        {
            fetchData();
        }

    },[location])
    const handeLocationChange= (event)=>
    {
        setLocation(event.target.value)
    }
  return (
    <div>
        <div className='app-container'>
            <h1 className='app-title'>Hava Durumu Uygulaması</h1>
            <div className='input-container'>
                <input
                className='location-input'
                type='text'
                placeholder='Şehir Giriniz'
                value={location}
                onChange={handeLocationChange}
                />
            </div>
        </div>
        <div className='weathers' >
            {weatherData && (
                
                <div className='weather-container'>
                    {weatherData.forecast.forecastday.map((day)=>(
                        <div className='day-container' key={day.date}>
                            <h2 className='date'>{day.date}</h2>
                            <img className='weather-icon' src={day.day.condition.icon} alt={day.day.condition.text}/>
                            <p className='temperature'>{day.day.avgtemp_c}°C</p>
                            <p className='temperature'>{day.day.condition.text}</p>
                        </div>
                    ))}

                </div>
            )}
        </div>
    </div>
  )
}

export default Main 