import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {FetchCityes , FetchWeather} from "../fetures/Wether"
import Loading from "./Loading";

const Weather = ()=>{
    const {cityes,
        todayweather,
        // forecast,
        loading,
        error,} = useSelector ((state)=>state.weather);
    const dispatch = useDispatch();
    const [city, setCity] = useState('');

    useEffect(()=>{
        dispatch(FetchCityes());
    },[dispatch]);

    const weatherFetch = () => {
        if(city){
            dispatch(FetchWeather(city));
        }else{
            alert('Please enter city name')
        }
    };

    return(
        <div className="container d-flex flex-column align-items-center mt-5">
      <h1 className="text-primary">WEATHER APP</h1>

      {/* Search Input */}
      <div className="input-group mb-3 w-50">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      {/* City Suggestions */}
      <div className="w-50">
        {Array.isArray(cityes) &&
          cityes.map((city) => (
            <div key={city.name} className="alert alert-secondary p-2">
              {city.name}, {city.country}
            </div>
          ))}
      </div>

      Fetch Weather Button
      <button className="btn btn-primary mt-2" onClick={weatherFetch} disabled={loading}>
        {loading ? <Loading/> : "Get Weather"}
      </button>

      {/* Error Message */}
      {error && <div className="text-danger mt-2">{error}</div>}

      {/* Weather Result */}
      {todayweather && (
        <div className="card mt-4 p-3 text-center" style={{ width: "18rem" }}>
          <h2 className="card-title">{todayweather.name}</h2>
          <h3 className="text-success">{todayweather.main.temp}°C</h3>
        </div>
      )}
    </div>
    )
}

export default Weather;