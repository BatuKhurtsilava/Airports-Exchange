import React, { createContext, useContext, useState, useMemo } from "react";



const CountryContext = createContext(null);
export const CountryContextProvider = ({children}) => {

 const [countriesData, setCountriesData] = useState([]);
 const [selectedCountry, setSelectedCountry] = useState([]);

const contextValue = useMemo(() => ({
  countriesData: countriesData,
  setCountriesData: setCountriesData,
  selectedCountry: selectedCountry,
  setSelectedCountry: setSelectedCountry
 

}), [countriesData, setCountriesData, selectedCountry, setSelectedCountry]);

return(
<CountryContext.Provider value={contextValue}> 
{children}
  </CountryContext.Provider> )
}

export const useCountryContext = () => {
  const contextValue = useContext(CountryContext);
  if(!contextValue) throw new Error('Component is outside context')
  return contextValue
}


