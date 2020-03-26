import React from 'react'
import './CountryList.scss'
import { Link } from 'react-router-dom'

const CountryList = props =>  {
  const items = props.countryList.map((country, key) =>
    <li className="list__item"  key={key}>
      <Link to={`/country/${country.alpha3Code}`} >
        <div className="flag">
          <img src={country.flag} alt={country.name} />
        </div>
        <div className="country-info">
          <h3>{country.name}</h3>
          <p><b>Population</b>: {country.population.toLocaleString('en')} </p>
          <p><b>Region</b>: {country.region} </p>
        </div>
      </Link>
    </li>
  );

  const notFound = <h1 className="empty">Sorry, Can't find that...</h1>

  const fullList = <ul className="list" >{items}</ul>
  
  return props.countryList.length ? fullList : notFound

}

export default CountryList