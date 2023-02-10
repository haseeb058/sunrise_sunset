import axios from "axios";
import React, { useState, useEffect } from "react";

const App = () => {
  const [location, setLocation] = useState({});
  const [sunData, setSunData] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://api.ipbase.com/v2/info?apikey=zDDsQgZGUHsFywanM9pqnQ10XlibR538NHt16YCe"
      )
      .then((res) => {
        setLocation(res?.data?.data?.location);
        getSunRiseSunSet(res);
      })
      .catch((e) => console.log(e));
  }, []);

  const getSunRiseSunSet = (res) => {
    axios
      .get(
        `https://api.sunrise-sunset.org/json?lat=${res?.data?.data?.location?.latitude}&lng=${res?.data?.data?.location?.longitude}`
      )
      .then((res) => {
        setSunData(res?.data?.results);
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h1>Sunrise and Sunset in Your Area</h1>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      <p>Sunrise: {sunData?.sunrise}</p>
      <p>Sunset: {sunData?.sunset}</p>
    </div>
  );
};

export default App;
