import { useEffect, useRef, useState } from "react";
import Lottie from 'react-lottie';
import SunAnimation from '../Lotties/Sun_Animation.json';
import { FaMagnifyingGlass } from "react-icons/fa6";
import humidity from '../Assets/humidity.png';
import wind from '../Assets/wind.png';
import clearIcon from "../Assets/clear.png";
import cloudIcon from "../Assets/cloud.png";
import drizzleIcon from "../Assets/drizzle.png";
import rainIcon from "../Assets/rain.png";
import snowIcon from "../Assets/snow.png";

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
      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok){
        alert(data.message)
      }
      console.log(data);

      const iconCode = data.weather && data.weather[0] && data.weather[0].icon;
      const icon = allIcons[iconCode] || clearIcon;

      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
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
          <FaMagnifyingGlass onClick={()=>search(inputRef.current.value)} className="cursor-pointer bg-transparent border fill-white items-center w-[38px] h-[38px] p-2 px-0 shadow-lg bg-secondary rounded-full" />
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
