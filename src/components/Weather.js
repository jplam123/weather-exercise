import axios from 'axios';
import React, {useEffect, useState} from 'react';
import '../styling/weather.scss';

const Weather = () => {
  const [weatherLondon, updateLondon] = useState(null)
  const [weatherBeijing, updateBeijing] = useState(null)
  const [forecastLondon, updateForLondon] = useState([])
  const [term, setTerm] = useState("London")
  const [weatherChosen, updateChosen] = useState(null)


  const SearchBox = (props) => {
    return(
      <input type="search"
      className='search'
      placeholder={props.placeholder}
      onChange={props.handleChange}/>
    )
  }

  useEffect(() => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=London&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`).then(res => {
      updateLondon(res.data.weather[0].description)
    })
    // eslint-disable-next-line no-template-curly-in-string

  }, [])


  useEffect(() => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Beijing&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`).then(res => {
      updateBeijing(res.data.weather[0].description)
    })
  }, [])

  useEffect(() => {
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=London&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`).then(res => {
      for (let i = 0; i <= 5; i++) {
        updateForLondon(prevArray => [...prevArray, (res.data.list[i].weather[0].description)])
      }
    })
  })

  useEffect(() => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${term}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`).then(res => {
      updateChosen(res.data.weather[0].description)
    })
  }, [])


  return (
    <div data-testid="weather" className="weather">
      <SearchBox placeholder="Enter City Name..." handleChange = {(e) => setTerm(e.target.value)}/>
      Weather:
      <br/>
      The current weather in London is: {weatherLondon} <br/>
      The current weather in Beijing is: {weatherBeijing} <br/>
      The 5 day forecast in London
      is: {forecastLondon[0]}, {forecastLondon[1]}, {forecastLondon[3]}, {forecastLondon[4]}, {forecastLondon[5]} <br/>
      The weather in {term} is: {weatherChosen}
    </div>
  );
}

export default Weather;
