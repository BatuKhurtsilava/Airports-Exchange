
import React from 'react'
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { useCountryContext } from '../CountryContext';
import '../styles/StylesAirports.css';


const Airports = () => {
  const {countriesData, selectedCountry} = useCountryContext();
  const API_KEY = 'WaLGm7P2QpUr7tjMjDmwPg==JhCphZ53gVbfZPcH';
  const countryInitial = countriesData.find(cntr => cntr.name.common === selectedCountry).cca2
  const [Airports, setAirports] = useState([]);
  const [searchedAirports, setSearchedAirports] = useState([]);
  const [searchInput, setSearchInput] = useState('');
 

  const getAirports = async (type, variable) => {
    try {
      const rawData = await fetch(`https://api.api-ninjas.com/v1/airports?${type}=${variable}`, {
      method: 'GET',
      headers: { 'X-Api-Key': API_KEY,
      'Content-Type': 'application/json'
    }})
      const data = await rawData.json();
      if(type === 'country') {
        setAirports(data)}
      if(type === 'city') {
        setSearchedAirports(data)
      }
      
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    console.log(selectedCountry);
    getAirports('country', countryInitial);
  }, [selectedCountry])

  


  useEffect(() => {
    if(searchInput !== '')
    {setTimeout(() => getAirports('city', searchInput), 500)}
    console.log(searchedAirports)
  }, [searchInput])

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  }

  return (
    <div>
      <h1>AIRPORTS</h1>
      <input type="text" onChange={handleInputChange}  placeholder='search by city'/>
     {searchedAirports.length > 0 && searchedAirports.map(airport => (
        <div className='Airports' key={airport.cca2}>
        <p>Airport: {airport.name}</p>
        <p>City: {airport.city}</p>
        <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/@${airport.latitude},${airport.longitude},15z?entry=ttu`}>See on google maps</a>
        </div>
      ))} 
        <div className='AirportsContainer'>
     {searchInput === ''  && Airports.map(airport => (

        <div  className='Airports' key={airport.cca2}>
        <p>Airport: {airport.name}</p>
        <p>City: {airport.city}</p>
        <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/@${airport.latitude},${airport.longitude},15z?entry=ttu`}>See on google maps</a>
        </div>
        
      ))}
      </div>
    </div>
  )
}

export default Airports