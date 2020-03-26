import axios from 'axios'
const API_URL = 'https://restcountries.eu/rest/v2'

class CountriesService {

  async getAllCountries() {
    const url = `${API_URL}/all`

	  if (localStorage.getItem('reactCountries')) {
      const list = JSON.parse(localStorage.getItem('reactCountries'))
	    return list

	  } else {
      return axios.get(url).then(response => {
        const list = response.data
        localStorage.setItem('reactCountries', JSON.stringify(list))
        return list
      })
    }

  }

}

export default CountriesService