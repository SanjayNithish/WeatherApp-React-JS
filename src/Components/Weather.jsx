import React, { useEffect, useState } from "react";
import "./Weather.css";
import clear from "../assets/clear.png";
import humidity from "../assets/humidity.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import sunny from "../assets/sunny.png";
import wind from "../assets/wind.png";

const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  log,
  humidityP,
  windS,
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="city">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div className="lat">
          <p>Latitude</p>
          <span>{lat}</span>
        </div>
        <div className="log">
          <p>Longitude</p>
          <span>{log}</span>
        </div>
      </div>
      <div className="data_Container">
        <div className="element">
          <img src={humidity} alt="" />
          <div className="data">
            <div className="percent">{humidityP}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind} alt="" />
          <div className="data">
            <div className="percent">{windS} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

const Weather = () => {
  const [icon, setIcon] = useState(sunny);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("CHENNAI");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidityP, setHumidityP] = useState(0);
  const [windS, setWindS] = useState(0);
  const [input, setInput] = useState("chennai");
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    let api_key = "bd5e378503939ddaee76f12ad7a97608";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${api_key}`;

    try {
      setNotFound(false);
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      if (data.cod === "404") {
        console.log("City not found!!");
        setNotFound(true);
        setLoading(false);
        return;
      }
      setHumidityP(data.main.humidity);
      setWindS(data.wind.speed);
      setTemp(Math.floor(data.main.temp - 273.15));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIcon = data.weather[0].icon;
      setIcon(icons[weatherIcon] || clear);
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const icons = {
    "01d": sunny,
    "01n": sunny,
    "02d": sunny,
    "02n": sunny,
    "03d": clear,
    "03n": clear,
    "04d": clear,
    "04n": clear,
    "09d": rain,
    "09dn": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  useEffect(function () {
    search();
  }, []);

  return (
    <>
      <div className="container">
        <div className="input_container">
          <input
            type="text"
            placeholder="Enter City"
            className="input_field"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={() => search()}>Search</button>
        </div>
        {notFound && <div className="notfound"> City Not Found !!</div>}
        <WeatherDetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          log={log}
          humidityP={humidityP}
          windS={windS}
        />
      </div>
    </>
  );
};

export default Weather;
