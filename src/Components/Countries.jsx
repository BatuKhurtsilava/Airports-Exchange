import React, { useState, useCallback, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { useCountryContext } from '../CountryContext';
import '../styles/StylesCountries.css';


const Countries = () => {
  const apiKey = 'AIzaSyCk3E40wwjExsxtjR0ZEUr7ReVMZ7IiHAQ';
  const exchangeKey = '3b07bf00c433e1f55ab6a536';
  const [loading, setLoading] = useState(false);
  const [locationBasedCountry, setLocationBasedCountry] = useState('');
  const {countriesData, setCountriesData, selectedCountry, setSelectedCountry} = useCountryContext();
  const [selectedCountryObject, setSelectedCountryObject] = useState({});
  
  
  
 
  

  const countries = async() => {
    try {
      const rawData = await fetch('https://restcountries.com/v3.1/all');
      const data =  await rawData.json();
      setCountriesData(data);
    } catch (error) {
      console.log(error)
    }

 }
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };

  const describeCountry = async () => {
    try {
      setLoading(true);
      const location = await getLocation();
   
      if (location) {
        
        const data = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${apiKey}`
        );
        const country = await data.json();
        if(country.status === 'OK') {
        setSelectedCountry(country.plus_code.compound_code.split(' ').slice(-1)[0]);
        
        
        }
      }
      
    } catch (error) {
      console.log(error);
    
    }

    finally {
      setLoading(false);
    }
  };



  useEffect(() => {
   countries();
   describeCountry()
  }, []);

  useEffect(() => {
    setSelectedCountryObject(countriesData.find((cntr)=> cntr.name.common === selectedCountry));
  }, [selectedCountry])


  
   const handleCountryChange =(e) => {
    setSelectedCountry(e.target.value)
    

  }

 
  
  console.log(countriesData)
  console.log(selectedCountryObject)
  

  if(loading) {return(<div>
    <p>loading...</p>
  </div>)};


  if(countriesData.length > 0) {
  return (
    <div className='Container'>
      <select className='Select' defaultValue={selectedCountry ? selectedCountry : countriesData.find((country) => country.name)}  value={selectedCountry} onChange={handleCountryChange}>
      <option value="" disabled selected>
    Select a country
  </option>
     {countriesData.map((country) => 
     <option value={country.name?.common}>{country.name?.common}</option> )} 
    </select>
    <h1 style={{ transform: 'translateX(-34rem)'}}>{selectedCountry}</h1>
  {selectedCountryObject && 
  <div className='InfoContainer'>
    <div className='ParticularInfoContainer'>
   <p><p className='Label'>Capital:</p> {selectedCountryObject.capital[0]}</p>
   <p><p className='Label'>Currency:</p> {selectedCountryObject.currencies[Object.keys(selectedCountryObject.currencies)[0]].name} ({selectedCountryObject.currencies[Object.keys(selectedCountryObject.currencies)[0]].symbol})</p>
   <p><p className='Label'>Region:</p> {selectedCountryObject.region}</p>
    </div>
    <div className='ParticularInfoContainer'>
   <p><p className='Label'>Continent:</p> {selectedCountryObject.continents[0]}</p>
   <p><p className='Label'>Population:</p> {selectedCountryObject.population}</p>
   <p><p className='Label'>Borders:</p> {selectedCountryObject.borders.length > 1 ? selectedCountryObject.borders.join(',') : selectedCountryObject.borders[0]}</p>
    </div>


  </div>}
  <br></br>
    <div>
  <div className='LinkContainer'>
  <Link className='Link' to = {`/currencies/${selectedCountry}`} > CURENCY EXCHANGE</ Link>
  <Link className='Link' to = {`/airports/${selectedCountry}`} > AIRPORTS </ Link>
  </div>
  <Outlet />
  </div>
    </div>
  )
}

return <p>problem with fetching countries</p>
}
export default Countries