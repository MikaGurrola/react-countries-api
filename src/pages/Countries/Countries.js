import React from 'react'
import CountryService from '../../services/CountriesService/CountriesService'
import './Countries.scss'
import Search from '../../components/Search/Search'
import Regions from '../../components/Regions/Regions'
import CountryList from '../../components/CountryList/CountryList'

class Countries extends React.Component {

	constructor() {
		super()
		this.state = {
			countries: [],
			filteredCountries: [],
			regions: [],
			searchQuery: ''
		}

		this.countryService = new CountryService()
		this.handleSelectedRegion = this.handleSelectedRegion.bind(this)
		this.handleSearchQuery = this.handleSearchQuery.bind(this)
		this.doFilter = this.doFilter.bind(this)
	}

	componentDidMount() {
		this.countryService.getAllCountries().then( response => {
			this.setState({ countries: response, filteredCountries: response })
			this.getRegions()
		})
	}


	getRegions() {
		const allRegions = this.state.countries.map(country => country.region).filter(region => region.length)
		allRegions.sort()
		let sortedRegions = [...new Set(allRegions)]
		let objects = sortedRegions.map(region => {
			const regionObject = { name: region, isChecked: false }
			return regionObject
		})
		this.setState({ regions: objects })
	}

	handleSelectedRegion(e) {
		const checkedRegions = [...this.state.regions]
		checkedRegions.map(region => {
			if (region.name === e.name) {
				region.isChecked = e.isChecked
			}
			return region
		})

		this.setState({regions: checkedRegions}, this.doFilter)
	}

	handleSearchQuery(e) {
		this.setState({searchQuery: e}, this.doFilter ) 
	}

	doFilter() {
    const searchQuery = this.state.searchQuery
    const activeRegions = this.state.regions.filter( region => region.isChecked === true )

    if (searchQuery && !activeRegions.length) {
      // SEARCH ONLY
			const filtered = this.state.countries.filter(country => country.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)
			this.setState({ filteredCountries: [...filtered] })
    } else if (searchQuery && activeRegions.length) {
      // SEARCH & FILTER
      const filtered = this.state.countries.filter(country => country.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1).filter(country => {
        const found = activeRegions.some(region => region.name === country.region)
        return found ? country : null
      })
      this.setState({ filteredCountries: [...filtered] })
    } else if (!searchQuery && activeRegions.length) {
      // FILTER ONLY BY REGIONS
      const filtered = this.state.countries.filter( country => {
        const found = activeRegions.some(region => region.name === country.region)
        return found ? country : null
      })
      this.setState({ filteredCountries: [...filtered] })
    } else {
      this.setState({ filteredCountries: [...this.state.countries] })
    }
	}

	render() {
    console.log(typeof(this.state.filteredCountries))
		return (
			<div>
        <div className="header">
          <Search  onChange={this.handleSearchQuery} />
          <Regions regions={this.state.regions} onChange={this.handleSelectedRegion} />
        </div>
				<CountryList countryList={this.state.filteredCountries} />
			</div>
		)
	}

}

export default Countries;