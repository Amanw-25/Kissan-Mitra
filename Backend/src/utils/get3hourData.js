const get3hoursData = (forecastResponse) => {
    const currentTime = new Date();
    const data = forecastResponse.data.list;
    const threeHoursData = [];
  
    for (let i = 0; i < data.length; i++) {
      const forecastTime = new Date(data[i].dt_txt);
      if (forecastTime > currentTime) {
        threeHoursData.push({
          date: data[i].dt_txt,
          temperature: data[i].main.temp,
          weather: data[i].weather[0].description,
          windSpeed: data[i].wind.speed,
        });
        if (threeHoursData.length === 4) {
          break;
        }
      }
    }
  
    return threeHoursData;
  };
  
  export default get3hoursData;
  
