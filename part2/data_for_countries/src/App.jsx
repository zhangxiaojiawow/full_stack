import { useState, useEffect } from "react"
import axios from 'axios'

const Country = ({country}) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=096ee639cade6862a27c19f6063e886d`).then(
      response => setWeather({
        temperature: response.data.main.temp,
        windSpeed: response.data.wind.speed,
        icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
        desc: response.data.weather[0].description,
      })
    )
}, [country])

  return (<div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital.join(', ')}</p>
        <p>area {country.area}</p>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.svg} alt={country.flags.alt}></img>
        <h2>Weather in {country.capital[0]}</h2>
        <div>
        {weather && (
          <>
            <p>temperature: {weather.temperature} Celcius</p>
            <p>wind {weather.windSpeed} m/s</p>
          <img src={weather.icon} alt={weather.desc}></img>
          </>
        )}
        </div>
      </div>)
}

const PreviewCountry = ({country, onClick}) => {
  return (<p>{country.name.common} <button onClick={onClick}>show</button></p>)
}

const App = () => {

  const [countries, setCountries] = useState([])
  useEffect(() => {
      axios.get('https://restcountries.com/v3.1/all').then(
        response => setCountries(response.data)
      )
  }, [])

  const [filter, setFitler] = useState('')
  const [filterCountries, setFilterCountries] = useState([])
  const [result, setResult] = useState(<div></div>)
  const [countryDetail, setCountryDetail] = useState(<div></div>)

  const handleFilterChange = (event) => {
    setFitler(event.target.value)
    setCountryDetail(<div></div>)
    const filter_country = event.target.value === '' ? countries : countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    console.log(filter_country)
    if (filter_country.length > 10) {
      setResult(<p>Too many matches, specify another filter</p>)
    } else if(filter_country.length == 1){
      console.log('find first country')
      const country = filter_country[0]
      setResult(<Country country={country}/>)
    } else{
      setResult(<ul>{filter_country.map(country => 
      <li key={country.name.common}><PreviewCountry country={country} onClick={() => setCountryDetail(<Country country={country}></Country>)}/></li>)}</ul>)
    }
  }

  return (<div>
    <p>find countries <input value={filter} onChange={handleFilterChange}/></p>
    <div>
      {result}
      {countryDetail}
    </div>
  </div>
  )
}

export default App