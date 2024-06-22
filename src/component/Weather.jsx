import { useEffect, useRef, useState } from "react";
import Lottie from 'react-lottie';
import SunAnimation from '../Lotties/Sun_Animation.json';
import humidity from '../Assets/humidity.png';
import wind from '../Assets/wind.png';
import clearIcon from "../Assets/clear.png";
import cloudIcon from "../Assets/cloud.png";
import drizzleIcon from "../Assets/drizzle.png";
import rainIcon from "../Assets/rain.png";
import snowIcon from "../Assets/snow.png";
import axios from 'axios'


function SunA() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    onload: true,
    animationData: SunAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div>
      <Lottie 
        options={defaultOptions}
        height={150}
        width={150}
      />
    </div>
  );
}

const Weather = () => {
  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(null);
  const allIcons = {
    "01d": SunAnimation,
    "01n": SunAnimation,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const search = async (city) => {
    if(city === ""){
      alert("Enter city name")
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
      const response = await axios.get(url)

      // if(!response.ok){
      //   alert(response.message)
      // }
      // console.log(response);

      const iconCode = response.data.weather && response.data.weather[0] && response.data.weather[0].icon;
      const icon = allIcons[iconCode] || clearIcon;

      setWeatherData({
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed,
        temperature: Math.floor(response.data.main.temp),
        location: response.data.name,
        icon: icon
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    search('New York')
  },[])

  return (
    <div className="flex items-center justify-center ">
      <div className="p-[40px] flex flex-col items-center bg-gradient-45deg rounded-lg">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            className="cursor-pointer  shadow-lg border rounded-3xl bg-transparent focus:outline-none px-3 py-1.5 bg-secondary text-white text-lg"
            type="text"
            placeholder="Search"
          />
          <svg
          onClick={()=>search(inputRef.current.value)} className="cursor-pointer bg-transparent border items-center shadow-lg rounded-full fill-white p-2 px-0"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 512 512"
        > <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        </div>
        <div className="mt-6">
          {weatherData && (weatherData.icon === SunAnimation ? (
            <SunA />
          ) : (
            <img src={weatherData.icon} alt="Weather Icon" className="w-[150px] h-[150px]" />
          ))}
        </div>
        {weatherData && (
          <div className="text-white flex flex-col text-center">
            <p className="text-[80px]">{weatherData.temperature}°</p>
            <span className="text-[40px]">{weatherData.location}</span>
          </div>
        )}
        {weatherData && (
          <div className="text-white items-center text-left flex gap-16 mt-[40px]">
            <div className="flex gap-2">
              <div className="mt-[4px]">
                <img src={humidity} alt="" className="w-[26px]" />
              </div>
              <div>
                <p className="text-lg">{weatherData.humidity} %</p>
                <span className="block">Humidity</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="mt-[4px]">
                <img src={wind} alt="" className="w-[26px]" />
              </div>
              <div>
                <p className="text-lg">{weatherData.wind} km/h</p>
                <span className="block">Wind Speed</span>
              </div>
            </div>
          </div>
        )}
         <hr className="border min-w-[100%] mt-3  border-blue-200/5 " />
      <footer className="text-xs mt-5 text-white/10 self-center">
        <h2>@Kartik Malviya 2024</h2>
      </footer>
      </div>
    </div>
  );
}

export default Weather;
