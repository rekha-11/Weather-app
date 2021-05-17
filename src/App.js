import React, {useState} from 'react'
import './index.css';
const api = {
  key: 'aa2a8cc8ad7946408167dd046a186355',
  url: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const search = e =>{
    if(e.key === "Enter"){
      fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result =>{
        setWeather(result)
        setQuery('')
        console.log(result)
      });
    }
  }

  const dateBuilder =(d)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

 

  return (
    <div className="App">
      <main>
        <div className='search-div'>
          <input 
          type= 'text' 
          onChange = {e => setQuery(e.target.value)}
          className='search-bar' 
          placeholder='Search...'
          value = {query}
          onKeyPress={search}/>
        </div>
        {(Object.keys(weather).length) === 0 ? (
          <div>Search the name of the city</div>
        )
         : (
          <div>
          <div className='location-box'>
            <div className='location'>{weather.name},{weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>{Math.round(weather.main.temp)}°c</div>
            <div className='weather'>Sunny</div>
          </div>
        </div>
         )
         }
      </main>
    </div>
  );
}

export default App;
