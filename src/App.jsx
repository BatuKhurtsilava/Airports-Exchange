import './App.css';
import {createBrowserRouter, Route, RouterProvider,  } from 'react-router-dom';
import routes from './routes';
import { CountryContextProvider } from './CountryContext';

function App() {
  const basename = process.env.PUBLIC_URL
  return (
    <div className="App">
      <CountryContextProvider>
      <RouterProvider router={createBrowserRouter(routes, {basename})} />
      </CountryContextProvider>
    </div>
  );
}

export default App;


