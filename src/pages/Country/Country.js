import React from 'react'
import CountriesService from '../../services/CountriesService/CountriesService'

class Country extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      country: {}
    }

    this.countriesService = new CountriesService()
  }

  componentDidMount() {
    console.log('country page')
    const countryId = this.props.match.params.country

    const countryList = JSON.parse(localStorage.getItem('reactCountries'))

    const countryFound = countryList.find(country => country.alpha3Code === countryId);

    this.setState({ country: countryFound })
    
  }

  render() {
    const country = this.state.country
    console.log(country)
    return (
      <div>
        <h2> {country.name} </h2>
        <p> native name: {country.nativeName} </p>
        <p> population: {country.population} </p>
        <p> region: {country.region} </p>
        <p> capital: {country.capital} </p>
      </div>
    )
  }

}

export default Country