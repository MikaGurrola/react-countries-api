import axios from 'axios'
const API_URL = 'https://restcountries.eu/rest/v2'

class CountriesService {

  getAllCountries() {
    return localStorage.getItem('reactCountries') ? this.getLocalStorage() : this.fetchCountries()
  }

  getBorders(borders, allCountries) {
    return borders.map(borderCountry => {
      return allCountries.find(country => country.alpha3Code === borderCountry)
    })
  }

  getCountryData(countryCode) {
    const allCountries = this.getAllCountries()
    const currentCountry = allCountries.find(country => countryCode === country.alpha3Code)
    currentCountry.borders = this.getBorders(currentCountry.borders, allCountries)
    return currentCountry
  }

  async fetchCountries() {
    const url = `${API_URL}/all`
    console.log('fetching countries')
    return axios.get(url).then(response => {
      const countryList = response.data
      localStorage.setItem('reactCountries', JSON.stringify(countryList))
      return countryList
    })
  }

  getLocalStorage() {
    console.log('getting local storage')
    return JSON.parse(localStorage.getItem('reactCountries'))
  }

}

export default CountriesService