import './App.css';
import {createBrowserRouter, Route, RouterProvider,  } from 'react-router-dom';
import routes from './routes';
import { CountryContextProvider } from './CountryContext';

function App() {
  return (
    <div className="App">
      <CountryContextProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
      </CountryContextProvider>
    </div>
  );
}

export default App;


