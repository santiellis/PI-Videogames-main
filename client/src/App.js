import { Switch } from 'react-router-dom';
import './App.css';
import {Route} from "react-router"
import Order from './components/order';
import SearchBar from './components/searchBar';
import Videogames from './components/videogames';
import VideogameDetails from "./components/videogameDetails"
import AddVideogame from './components/addVideogame';
// import Pagination from './components/pagination';
import SearchByGenre from './components/searchByGenre';
import SearchByPlatform from './components/searchByPlatform';
import RedirectToAddVideogame from './components/redirectAddVideogame';
import RedirectHome from './components/redirectHome';
import Clear from './components/clear';
import OrderByRating from './components/orderByRating';



function App() {

let num= 0

  return (
    <div className="App">
      <Switch>
      <Route path="/addVideogame">
      <AddVideogame />
      <RedirectHome/>
      </Route>
      
      <Route path="/:id">
      <VideogameDetails />
      <RedirectHome/>
      </Route>
        <Route path={num ? `/?page=${num}` : "/"}>
      <SearchBar/>
      <SearchByGenre/>
      <SearchByPlatform/>
      <Order/>
      <OrderByRating/>
      <Clear/>
      <RedirectToAddVideogame/>
      <Videogames />
      {/* <Pagination/> */}
      </Route>
      </Switch>

    </div>
  );
}

export default App;
