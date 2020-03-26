import React, { useState, createContext, useEffect } from 'react'
import CountriesService from '../services/CountriesService/CountriesService'

export const CountriesContext = createContext()

export const CountryProvider = props => {
  const [countries, setCountries] = useState([])
  const countriesService = new CountriesService()

  useEffect(() => {

	  if (localStorage.getItem('reactCountries')) {
      setCountries(JSON.parse(localStorage.getItem('reactCountries')))
	    console.log(JSON.parse(localStorage.getItem('reactCountries')))

	  } else {
	    countriesService.getAllCountries().then(response => {
        setCountries(response)
	      localStorage.setItem('reactCountries', JSON.stringify(response))
	    })
    }
    
  }, [])


  return (
    <CountriesContext.Provider value={[countries]} >
      {props.children}
    </CountriesContext.Provider>
  )
}