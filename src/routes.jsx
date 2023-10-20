import React from 'react';
import Countries from "./Components/Countries"
import Currencies from "./Components/Currencies"
import Airports from "./Components/Airports"


const routes = [
  {path: '/',
   element: <Countries />,
    children: [{
    path: 'currencies/:country',
    element: <Currencies />
    },
    {
    path: 'airports/:country',
    element: <Airports />,
    }
  ]}]

export default routes;