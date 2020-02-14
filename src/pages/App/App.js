import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import logo from '../../logo.svg';
import './App.css';

import userService from '../../utils/userService'

import SignupPage from '../SignupPage/SignupPage'
import LoginPage from '../LoginPage/LoginPage'

import NavBar from '../../components/Navbar/Navbar'
import Sidepane from '../../components/Sidepane/Sidepane'


class App extends Component {
  constructor() {
    super();
    this.state={
      user: userService.getUser()
    }
  }

  render() {
    return (
      <div className='page'>
      <NavBar user={this.state.user}/>
      <Switch>
        <Route exact path='/signup' render={({history}) => <SignupPage history={history} />} />
        <Route exact path='/login' render={() => <LoginPage />} />
        <Route exact path='/' render={() => (
          <Sidepane />
          )} />
      </Switch>
      </div>
    )
  }
}

export default App;
