import axios from 'axios';
import './App.css'
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

   const [city,setCity] = useState("")

   const [data,setData]= useState({
      celcius:305,
      name:'Bobbili',
      humidity:10,
      speed:2,
      icon :'',
      description:'',
      pressure:1000,
      feelslike:32
   })

   useEffect(()=>{
      const URL= `https://api.openweathermap.org/data/2.5/weather?q=bobbili&appid=de9dde24e3f694c895aabfef229fcb11`;
      axios.get(URL)
      .then(res=>{
         setData({...data, celcius:res.data.main.temp,name:res.data.name,humidity:res.data.main.humidity,
             speed:res.data.wind.speed , icon:res.data.weather[0].icon, description:res.data.weather[0].description,
             pressure:res.data.main.pressure, feelslike:res.data.main.feels_like
            })
      })
      .catch(err=>console.log(err))
   },[])

   const handleSubmit = ()=>{
      if(city !== ""){
         const URL= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=de9dde24e3f694c895aabfef229fcb11`;
         axios.get(URL)
         .then(res=>{
            setData({...data, celcius:res.data.main.temp,name:res.data.name,humidity:res.data.main.humidity,
                speed:res.data.wind.speed , icon:res.data.weather[0].icon, description:res.data.weather[0].description
               })
         })
         .catch(err=>console.log(err))
      }
   }


  return (
    <>
     <div className='h-screen w-full bg-[url(https://www.dailyleader.com/wp-content/uploads/sites/18/2021/05/sunny.jpeg?w=1024)] bg-no-repeat bg-cover overflow-hidden ' >
        

             <div className='flex rounded w-3/4 md:w-2/5 mx-auto mt-20  bg-[rgba(0,0,0,0.4)]  justify-evenly'>
                <input className='rounded w-2/4  border border-gray-800 m-4 p-2' type="text" placeholder='Enter City' onChange={(e)=>setCity(e.target.value)} />
                <button className='bg-indigo-500 text-white rounded-lg m-4 p-2 cursor-pointer' onClick={handleSubmit}>Search</button>
            </div>

            <div className='flex rounded w-3/4 md:w-2/5 mx-auto flex-wrap text-white bg-[rgba(0,0,0,0.4)]   justify-center items-center md:justify-between'>
               <div className='mx-5 my-3' >
                  <h2 className='m-2 text-3xl'>{data.name}</h2>
                  <img className='h-10 w-10 m-2' src={"https://api.openweathermap.org/img/w/"+data.icon+".png"} alt="" />
                  <h3 className='m-2 text-2xl'>{data.description}</h3>
               </div>
               <div className='my-auto mx-5'>
                  <h2 className='text-4xl'>{Math.floor(data.celcius-273)}°C</h2>
               </div>
            </div>
            
            <div className='flex rounded w-3/4 md:w-2/5 mx-auto flex-wrap text-center  text-white  bg-[rgba(0,0,0,0.4)]   justify-between'>

               <div className='md:w-44 h-20 mx-6 p-2 my-5'>
                  <h2 className='text-2xl'>Feels Like</h2>
                  <h2 className='text-3xl'>{Math.floor(data.feelslike-273)}°C</h2>
               </div>

               <div className='md:w-44 h-20 mx-4 p-2 my-5'>
                  <h2 className='text-2xl'>Humidity</h2>
                  <h2 className='text-3xl'>{data.humidity}%</h2>
               </div>

            </div>
            <div className='flex rounded w-3/4 md:w-2/5 mx-auto flex-wrap text-center text-white  bg-[rgba(0,0,0,0.4)]  justify-between'>

               <div className='md:w-44 h-20 mx-6 p-2 my-5'>
                  <h2 className='text-2xl'>Speed</h2>
                  <h2 className='text-3xl'>{Math.round(data.speed*3.6)}Km/h</h2>

               </div>

               <div className='md:w-44 h-20 mx-4 p-2 my-5 '>
                  <h2 className='text-2xl'>Pressure</h2>
                  <h2 className='text-3xl'>{data.pressure}hPa</h2>
               </div>
            </div>
             
     </div>
    
    </>
  )
}

export default App
