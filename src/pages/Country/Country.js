import React from 'react'
import CountryService from '../../services/CountriesService/CountriesService'
import { Link } from 'react-router-dom'
import './Country.scss'

class Country extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      country: {},
      borders: [],
      countries: [],
      currencies: [],
      languages: []
    }

    this.goBack = this.goBack.bind(this)
    this.getBorders = this.getBorders.bind(this)
    this.getCountryData = this.getCountryData.bind(this)
    this.renderCurrencies = this.renderCurrencies.bind(this)
    this.renderLanguages = this.renderLanguages.bind(this)
    this.renderBorders = this.renderBorders.bind(this)

    this.countryService = new CountryService()
  }

  goBack() {
    this.props.history.goBack()
  }

  componentDidMount() {
		this.countryService.getAllCountries().then(response => {
      this.setState({ countries: response }, this.getCountryData)
    })
  }

  componentDidUpdate(prevProps) {
    const oldProp = prevProps.match.params.country;
    const currentProp = this.props.match.params.country;
    if ( oldProp !== currentProp) {
      this.getCountryData()
    }
  }

  getCountryData() {
    const countryId = this.props.match.params.country
    const countryFound = this.state.countries.find(country => countryId === country.alpha3Code)
    this.setState({
      country: countryFound,
      currencies: countryFound.currencies,
      languages: countryFound.languages
    }, this.getBorders)
  }

  getBorders() {
    const borders = this.state.country.borders

    const borderingCountries = borders.map(borderCountry => {
      return this.state.countries.find(country => {
        return country.alpha3Code === borderCountry
      });
    });

    this.setState({borders: borderingCountries})
  }

  renderCurrencies() {
    const currencies = this.state.currencies
    if(currencies) {
      return currencies.map((currency, key) =>  <span key={key}>{currency.symbol} {currency.name}</span> )
    }
  }

  renderLanguages() {
    const languages = this.state.languages
    if(languages) {
      return languages.map((lang, key) =>  <span key={key}>{lang.name}</span> )
    }
  }

  renderBorders() {
    const borders = this.state.borders
    if(borders.length > 1) {
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


  render() {
    const country = this.state.country
    return (
      <div className="country">
        <button className="back-button" onClick={this.goBack}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/>
            <path fill="rgba(var(--blue), var(--saturated))" d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"/>
          </svg>
          Back
        </button>

        <div className="content">

          <div className="content__top">
            <img src={country.flag} alt={country.name} />

            <div className="inner">
              <h2 className="mb-10"> {country.name} </h2>
              <p> <b>Capital:</b> {country.capital} </p>
            </div>
          </div>

          <div className="inner">
            <div className="content__bottom">
              <p> <b>Native Name:</b> {country.nativeName} </p>
              <p> <b>Population:</b> { country.population? country.population.toLocaleString('en') : 0 } </p>
              <p> <b>Region:</b> {country.region} </p>

              <div className="mini-list">
                <p><b>Currencies: </b>{this.renderCurrencies()}</p>
              </div>

              <div className="mini-list">
                <p><b>Languages: </b> {this.renderLanguages()}</p>
              </div>

              <div className="borders">
                <p><b>Bordering Countries:</b></p>
                <div className="borderList"> { this.renderBorders() } </div>
              </div>
            </div>
            
          </div>
          
        </div>


        
      </div>
    )
  }

}

export default Country