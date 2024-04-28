import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tooltip as ReactTooltip } from "react-tooltip";

import clearIcon from "../../WeatherImages/clear.png";
import rainIcon from "../../WeatherImages/rain.png";
import snowIcon from "../../WeatherImages/snow.png";
import cloudIcon from "../../WeatherImages/cloud.png";
import mistIcon from "../../WeatherImages/mist.png";
import infoIcon from "../../WeatherImages/info.png";

import "./Weather.css";

const Weather = ({ eventData }) => {
  const [dailyWeatherData, setDailyWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!eventData) {
      setIsLoading(false);
      return;
    }

    const eventDate = eventData.event_date;
    const today = new Date().toISOString().split("T")[0];
    const weatherTimeValueForToday = 0;
    const weatherTimeValueForForecast = 4;
    let activeWeatherTimeValue;

    if (eventDate === today) {
      activeWeatherTimeValue = weatherTimeValueForToday;
    } else {
      activeWeatherTimeValue = weatherTimeValueForForecast;
    }

    const lat = 41.693;
    const lon = 44.801;
    const apiKey = "5d8ced9d469c1253b347277f10994ee0";

    const fetchData = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&date=${eventDate}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);

        if (response.status === 200) {
          const forecastData = response.data.list;
          const filteredData = forecastData.filter(
            (forecast) => forecast.dt_txt.split(" ")[0] === eventDate
          );
          const selectedWeather =
            filteredData.length > 0
              ? filteredData[activeWeatherTimeValue]
              : null;
          setDailyWeatherData(selectedWeather);
          setIsLoading(false);
        } else {
          throw new Error("Failed to fetch weather data");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setErrorMessage(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [eventData]);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Rain":
        return rainIcon;
      case "Snow":
        return snowIcon;
      case "Clouds":
        return cloudIcon;
      case "Mist":
        return mistIcon;
      default:
        return clearIcon;
    }
  };

  return (
    <div className="weather-container container">
      <h2 className="weather-heading">Weather Forecast for this event</h2>
      {!eventData ? (
        <div>No event data available</div>
      ) : (
        <>
          {isLoading ? (
            <p className="description">Loading...</p>
          ) : errorMessage ? (
            <p className="description">Error: {errorMessage}</p>
          ) : dailyWeatherData && dailyWeatherData.weather ? (
            <div className="weather-box">
              <img
                src={getWeatherIcon(dailyWeatherData.weather[0].main)}
                alt="weather condition icon"
                className="weather-icon"
              />

              <div>
                <p className="main">{dailyWeatherData.weather[0].main}</p>
                <p className="date">
                  <span>Date/Time:</span> {dailyWeatherData.dt_txt}
                </p>
                <p className="temperature">{dailyWeatherData.main.temp}°C</p>
                <div className="wind-container">
                  <img src={mistIcon} alt="wind icon" className="wind-icon" />
                  <p className="wind-description">
                    <span>Wind Speed:</span> {dailyWeatherData.wind.speed} m/s
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="description">
                No weather data available for {eventData.event_date}
                <button
                  data-tip
                  data-for="overridePosition"
                  data-tooltip-id="overridePosition"
                >
                  <img src={infoIcon} alt="info icon" className="info-Icon" />
                </button>
                <ReactTooltip
                  id="overridePosition"
                  className="extraClass"
                  place="bottom"
                  effect="float"
                  delayHide={1000}
                  overridePosition={(
                    { left, top },
                    currentEvent,
                    currentTarget,
                    node
                  ) => {
                    const d = document.documentElement;
                    left = Math.min(d.clientWidth - node.clientWidth, left);
                    top = Math.min(d.clientHeight - node.clientHeight, top);
                    left = Math.max(0, left);
                    top = Math.max(0, top);
                    return { top, left };
                  }}
                >
                  <p>
                    The forecast is available only 5 days before the event. 📅
                  </p>
                  <p>
                    Please check back 5 days before the event to see the weather
                    forecast. ⛅
                  </p>
                </ReactTooltip>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Weather;
