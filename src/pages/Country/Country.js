import React, {useEffect, useState} from 'react'
import CountryService from '../../services/CountriesService/CountriesService'
import { Link } from 'react-router-dom'
import './Country.scss'

const countryService = new CountryService()

const CountryList = props =>  {
  const [currentCountry, setCurrentCountry] = useState({})

  useEffect(() => {
    const getCountry = () => {
      const currentCountry = countryService.getCountryData(props.match.params.country)
      setCurrentCountry(currentCountry)
    }

    getCountry()

  }, [props])


  const renderBorders = (borders) => {

    if(borders !== undefined ) {

      if (borders.length > 1) {
        return borders.map((country, key) =>
          <Link className="borderList__border" key={key} to={`/country/${country.alpha3Code}`} >
            <div className="mini-flag">
              <img src={country.flag} alt={country.name} />
            </div>
            <span>{country.name}</span>
          </Link>
        )
      } else {
        return <span>No Borders</span>
      }

    }
  }

  const goBack = () => props.history.goBack()

  const renderCurrencies = (currencies) => {
    if (currencies) {
      return currencies.map((currency, key) => <span key={key}>{currency.symbol} {currency.name}</span>)
    }
  }

  const renderLanguages = (languages) => {
    if (languages) {
      return languages.map((lang, key) => <span key={key}>{lang.name}</span>)
    }
  }

  const countryPage = <div>
    <button className="back-button" onClick={goBack}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
        <path fill="rgba(var(--blue), var(--saturated))" d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
      </svg>
      Back
    </button>

    <div className="content">

      <div className="content__top">
        <img src={currentCountry.flag} alt={currentCountry.name} />

        <div className="inner">
          <h2 className="mb-10"> {currentCountry.name} </h2>
          <p> <b>Capital:</b> {currentCountry.capital} </p>
        </div>
      </div>

      <div className="inner">
        <div className="content__bottom">
          <p> <b>Native Name:</b> {currentCountry.nativeName} </p>
          <p> <b>Population:</b> {currentCountry.population ? currentCountry.population.toLocaleString('en') : 0} </p>
          <p> <b>Region:</b> {currentCountry.region} </p>

          <div className="mini-list">
            <p><b>Currencies: </b>{renderCurrencies(currentCountry.currencies)}</p>
          </div>

          <div className="mini-list">
            <p><b>Languages: </b> {renderLanguages(currentCountry.languages)}</p>
          </div>

          <div className="borders">
            <p><b>Bordering Countries:</b></p>
            <div className="borderList"> {renderBorders(currentCountry.borders)} </div>
          </div>

        </div>

      </div>

    </div>


  </div>
  
  return countryPage

}

export default CountryList