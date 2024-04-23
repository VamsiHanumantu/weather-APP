import React, { useState, useEffect } from 'react'
import Search from './Search'

const Weather = () => {

    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [weatherdata, setWeatherdata] = useState(null)

    const fetchWeatherdata = async (params) => {
        setLoading(true)

        try {

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${params}&appid=de9dde24e3f694c895aabfef229fcb11`)
            const data = await response.json()

            if (data) {
                setWeatherdata(data)
                setLoading(false)
            }
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    


    }

    const handleSearch = async () => {
        fetchWeatherdata(search)
    }

    const getCurrentDate = () => {
        return new Date().toLocaleDateString("en-us",
            {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            }
        )
    }
    useEffect(()=>{
        fetchWeatherdata("bobbili")
    },[])

    return (
        <div className=' w-[60%] bg-green-700 p-10 m-4 rounded-xl'>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            {
                weatherdata?.cod===200 ?(loading? <div className='text-white text-center mt-4 text-4xl duration-3000'>Loading...</div> :
                    (
                        <div>
                            <div>
                                <h2 className=' text-4xl text-center text-white font-bold m-4'>{weatherdata?.name} <span>{weatherdata?.sys?.country}</span></h2>
                            </div>
                            <div>
                                <em><h3 className=' text-3xl text-center text-white m-4'>{getCurrentDate()}</h3></em>
                                
                            </div>
                            <div>
                                <h1 className=' text-5xl text-white font-bold text-center m-4'>
                                    {(weatherdata?.main?.temp - 273).toPrecision(2)} <sup>o</sup>C
                                </h1>
                               <em> <p className=' text-3xl text-white text-center'>
                                    {weatherdata ? weatherdata?.weather[0]?.description : ""}
                                </p></em>
                            </div>
                            {
                                weatherdata ? <div className=' flex justify-evenly items-center flex-wrap mt-6'>
                                    <div>
                                    <h3 className='text-white text-3xl'>Pressure</h3>
                                    <p className=' text-3xl text-white text-center'>{weatherdata?.main?.pressure}</p>
                                    </div>
                                    <div>
                                    <h3 className='text-white text-3xl'>Humidity</h3>
                                    <p className=' text-3xl text-white text-center'>{weatherdata?.main?.humidity}</p>
                                    </div>
                                    <div>
                                    <h3 className='text-white text-3xl'>Wind Speed</h3>
                                    <p className=' text-3xl text-white text-center'>{weatherdata?.wind?.speed}</p>
                                    </div>
                                   
                                </div> : ""
                            }

                        </div>
                    )): <div className='text-white text-center mt-4 text-4xl'>{weatherdata?.message}</div>
            }


        </div>

    )
}

export default Weather