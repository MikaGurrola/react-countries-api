import React from 'react'
import { Link } from 'react-router-dom'
import UserService from '../../services/CountriesService/CountriesService'

class Countries extends React.Component {
  constructor() {
    super()
    this.state = {
      countries: []
    }

    this.userService = new UserService()
  }

  componentDidMount() {
    if (localStorage.getItem('reactCountries')) {
      this.setState({ countries: JSON.parse(localStorage.getItem('reactCountries')) })

      console.log(JSON.parse(localStorage.getItem('reactCountries')))
      
    } else {
      this.userService.getAllCountries().then( response => {
        this.setState({ countries: response })
        localStorage.setItem('reactCountries', JSON.stringify(response))
      })
    }


  }

  renderCountries = () => {
    return this.state.countries.map( (country, key) => {
      return (
        <li key={key} > 
          <Link to={`/country/${country.alpha3Code}`} >{country.name}</Link>
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <ul>{this.renderCountries()}</ul>
      </div>
    )
  }

}

export default Countries;