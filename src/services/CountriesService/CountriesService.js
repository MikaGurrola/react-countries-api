import axios from 'axios'
const API_URL = 'https://restcountries.eu/rest/v2'

class CountriesService {

  async getAllCountries() {
    const url = `${API_URL}/all`
    return axios.get(url).then(response => response.data)
  }

}

export default CountriesService