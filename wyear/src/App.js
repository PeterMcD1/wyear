import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  const FREE_WEATHER_API_KEY = process.env.REACT_APP_FREE_WEATHER_API_KEY
  const [data, setData] = useState(null)

  // Check if the Geolocation API is available
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Extract the city from the position.address object
        const city = position.address.city;
        // Send the city information to the server
        fetch('/get-location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ city }),
        });
      },
      (error) => {
        // Geolocation API failed, use IP-based geolocation
        fetch('/get-location')
          .then((response) => response.json())
          .then((data) => {
            // Use the city information from the server
            // console.log('City:', data.city);
          });
      }
    );
  }
  // } else {
    // Geolocation API not available, use IP-based geolocation
  //   fetch('/get-location')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Use the city information from the server
  //       console.log('City:', data.city);
  //     });
  // // }

  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${FREE_WEATHER_API_KEY}&q=Omaha`)
      .then(response => response.json())
      .then(data => {
        setData(data)
      }
    )
  }, [])

  if (!data) {
    return <div>Loading...</div>;
  }


  const dayData = data ? data['forecast']['forecastday'][0]['day'] : null
  delete dayData['condition']
  delete dayData['avgtemp_c']
  delete dayData['maxtemp_c']
  delete dayData['mintemp_c']
  delete dayData['maxwind_kph']
  delete dayData['avgvis_km']
  delete dayData['avgvis_miles']
  delete dayData['totalprecip_mm']
  delete dayData['daily_chance_of_rain']
  delete dayData['daily_chance_of_snow']
  delete dayData['totalsnow_cm']
  delete dayData['totalprecip_in']
  delete dayData['maxwind_mph']
  delete dayData['avghumidity']


  const keys = Object.keys(dayData)
  let keyString = ''
  keys.forEach(key => {
    const value = dayData[key]
    keyString += key + ': ' + value + ', '
  })

  const displayClothingChoice = () => {

    const highTemp = dayData['maxtemp_f']
    const lowTemp = dayData['mintemp_f']
    if (highTemp >= 80) {
      return 'Wear shorts and a t-shirt'
    } else if (highTemp >= 70) {
      return 'Wear jeans and a t-shirt'
    } else if (highTemp >= 60) {
      return 'Wear jeans and a long sleeve shirt'
    } else if (highTemp >= 50) {
      return 'Wear jeans and a jacket'
    } else if (highTemp >= 40) {
      return 'Wear jeans, a jacket, and a hat'
    }  else {
      return 'Wear jeans, a parka, a hat, and gloves'
    }
    
  }


  // remove the last comma
  keyString = keyString.slice(0, -2)
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {/* the current forecast data is {keyString} */}
          {displayClothingChoice()}
        </p>
      </header>
    </div>
  );
}

export default App;
