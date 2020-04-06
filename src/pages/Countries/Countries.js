import React, {useEffect, useState} from 'react'
import CountryService from '../../services/CountriesService/CountriesService'
import './Countries.scss'
import Search from '../../components/Search/Search'
import Regions from '../../components/Regions/Regions'
import CountryList from '../../components/CountryList/CountryList'

const countryService = new CountryService()

const Countries = () => {

  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [regions, setRegions] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function getData() {
      const allCountries = await countryService.getAllCountries()
      setCountries(allCountries)
      setFilteredCountries(allCountries)
  
      const getRegions = () => {
        const allRegions = allCountries.map(country => country.region).filter(region => region.length)
        allRegions.sort()
        let sortedRegions = [...new Set(allRegions)]
        let regionObjects = sortedRegions.map(region => {
          const regionObject = {
            name: region,
            isChecked: false
          }
          return regionObject
        })
        setRegions(regionObjects)
        
      }
  
      getRegions()

    } 

    getData()

  }, [])

  useEffect(() => {    
    const activeRegions = regions.filter(region => region.isChecked === true)
    const hasSearchQuery = searchQuery.length
    const hasRegionQuery = activeRegions.length

    if (hasSearchQuery && !hasRegionQuery) {
      // SEARCH ONLY
      const filtered = countries.filter(country => country.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)
      setFilteredCountries([...filtered])
    } else if (hasSearchQuery && hasRegionQuery) {
      // SEARCH & FILTER
      const filtered = countries.filter(country => country.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1).filter(country => {
        const found = activeRegions.some(region => region.name === country.region)
        return found ? country : null
      })
      setFilteredCountries([...filtered])
    } else if (!hasSearchQuery && hasRegionQuery) {
      // FILTER ONLY BY REGIONS
      const filtered = countries.filter(country => {
        const found = activeRegions.some(region => region.name === country.region)
        return found ? country : null
      })
      setFilteredCountries([...filtered])
    } else {
      if (countries.length) setFilteredCountries([...countries])
    }
  }, [searchQuery, regions, countries])


	const handleSelectedRegion = (e) => {
		const checkedRegions = [...regions]
		checkedRegions.map(region => {
			if (region.name === e.name) {
				region.isChecked = e.isChecked
			}
			return region
		})

    setRegions(checkedRegions)
	}

  const countriesPage =  (
    <div className="container">
      <div className="header">
        <Search  onChange={ e => setSearchQuery(e) } />
        <Regions regions={regions} onChange={handleSelectedRegion} />
      </div>
      <CountryList countryList={filteredCountries} />
    </div>
  )

  return countriesPage

}

export default Countries