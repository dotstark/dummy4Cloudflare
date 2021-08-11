import Movies from './components/movies'
import { Route,Redirect,Switch } from 'react-router-dom';

import './App.css';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import React from 'react';
import MovieForm from './components/movieForm';
import LoginForm from './components/login';
import RegisterForm from './components/registerForm';

function App() {
  return (
    <React.Fragment>
    <NavBar></NavBar>
    <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/register" component={ RegisterForm}></Route>
          <Route path ="/movie/:id" component={MovieForm}></Route>
      <Route path="/movies" component={ Movies}></Route>
      <Route path="/customers" component={ Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          
      <Route path="/not-found" component={NotFound}></Route>
        <Redirect from="/" exact to="/movies" />
        <Redirect to="/not-found"/>
      </Switch>
      </main>
      </React.Fragment>
  );
}

export default App;
