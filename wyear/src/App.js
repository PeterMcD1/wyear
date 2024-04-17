import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';


function App() {
  const [data, setData] = useState(null)
  useEffect(() => {
      .then(response => response.json())
      .then(data => {
        setData(data)
      }
    )
  }, [])
  console.log(data)
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
  // remove the last comma
  keyString = keyString.slice(0, -2)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          the current forecast data is {keyString}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
