import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import Countries from './Countries';
import { useCountryContext } from '../CountryContext';

const Currencies = () => {
  const {countriesData, setCountriesData, selectedCountry, setSelectedCountry} = useCountryContext();
  console.log(Object.keys(countriesData.find(cntr=> cntr.name.common === selectedCountry).currencies)[0])
  const [selectedCurrency, setSelectedCurrency] = useState({
    first: Object.keys(countriesData.find(cntr=> cntr.name.common === selectedCountry).currencies)[0],
    second: ''
  })
  const [rate, setRate] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0)
  const amountRef = useRef(null);

  
  const getRate = async() => {
    try {
    const rawData = await fetch(`https://v6.exchangerate-api.com/v6/3b07bf00c433e1f55ab6a536/pair/${selectedCurrency.first}/${selectedCurrency.second}`);
    const data = await rawData.json();
    if(data.result === 'success')
    setRate(data.conversion_rate);
    } catch (error) {
      console.log(error)
    }
    
  }


      const handleCurrencyChange = (e) => {
        setSelectedCurrency((prev) => ({
          ...prev,
          second: e.target.value
        }));
        amountRef.current.value = ''
        amountRef.current.focus();

      }
      


  useEffect(() => {
  getRate();
  
  }, [selectedCurrency])

  useEffect(() => {
    setSelectedCurrency((prev) => ({
      ...prev,
      first: Object.keys(countriesData.find(cntr => cntr.name.common === selectedCountry).currencies)[0]
    }));
    amountRef.current.value = ''
    amountRef.current.focus();
  }, [selectedCountry]);


  
  return(

  
    <div>
    <h1>CURRENCY EXCHANGE</h1>
    <input placeholder='amount' ref={amountRef} onChange={() => setConvertedAmount(amountRef.current.value * rate)} />
    
    <select
  defaultValue={selectedCurrency.second}
  value={selectedCurrency.second}
  onChange={handleCurrencyChange}
>
  {countriesData.map((country, index) => {
    const currencyKey = country.currencies ? Object.keys(country.currencies)[0] : [];
    if (currencyKey) {
      return (
        <option key={index} value={currencyKey}>
          {currencyKey}
        </option>
      );
    }
    return null;
  })}
</select>

{selectedCurrency.second ?
<div>
 <p>Rate: {rate.toFixed(2)} </p>
 <p>{selectedCurrency.first} to {selectedCurrency.second} {convertedAmount.toFixed(2)}</p>
 </div> : <p>Select Second Currency</p> }
    </div>
  )
}


export default React.memo(Currencies)
