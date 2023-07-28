import hotbg from './assets/hot.jpg'
import coldbg from './assets/cold.jpg'
import Description from './components/Description';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './weatherService';

function App() {

  const [city,setCity]= useState('paris')

  const [weather, setWeather] = useState(null)

  const [units,setUnits]= useState('imperial')
  
  const [bg,setBg] = useState(hotbg)

  useEffect(()=>{
    const fetchWeatherData= async () =>{
      const data = await getFormattedWeatherData(city,units);
      setWeather(data)
      //dynamic bg
      const threshold = units === 'metric' ?20 :60;
      if(data.temp<=threshold) setBg(coldbg)
    }
    fetchWeatherData();
  },[units,city]);

 const handleUnitsClick = (e)=>{
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelcius= currentUnit === 'C';
    button.innerText = isCelcius?"°F":"°C"
    setUnits(isCelcius?'metric':'imperial');
 }

 const enterKeyPressed =(e)=>{
  if(e.keyCode===13){
    setCity(e.currentTarget.value)
    e.currentTarget.blur();
  }
 }
 //${bg}

  return (
      <>
      <div className="app" style={{backgroundImage:`url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWUhb4SBeEBV6XSBGDATjtDkfARWg6B0BlZA&usqp=CAU)`}}>
        <div className="overlay">
          {
            weather && ( <div className="container">
            <div className="section section_inputs">
              <input type="text" name='city' placeholder='enter city' onKeyDown={enterKeyPressed} />
              <button onClick={(e)=>handleUnitsClick(e)}>°F</button>
            </div>
            <div className="section section_temperature">
              <div className="icon">
                <h3>{`${weather.name},${weather.country}`}</h3>
                <img src= {weather.iconURL} alt="" />
                <h3>Cloudy</h3>
              </div>
              <div className="temperature">
                  <h1>{`${weather.temp.toFixed()} ${units=== 'metric' ? '°C' : '°F'}`} </h1>
               </div>
            </div>
            {/* bottom description */}
            <Description weather={weather} units={units} />
          </div>)
          }

         
        </div>
      </div>
      </>
  );
}

export default App;
