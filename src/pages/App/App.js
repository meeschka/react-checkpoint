import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import logo from '../../checkpoint.svg';
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

  //Auth methods
  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser()})
  }

  handleLogout = () => {
    userService.logout()
    this.setState({ user: null })
  }


  render() {
    return (
      <div className='page'>
      <NavBar
        user={this.state.user}
        handleLogout={this.handleLogout}
      />
      <Switch>
        <Route exact path='/signup' render={({history}) => <SignupPage 
          history={history} 
          handleSignupOrLogin={this.handleSignupOrLogin}
        />} />
        <Route exact path='/login' render={({history}) => <LoginPage
          history={history}
          handleSignupOrLogin={this.handleSignupOrLogin}
        />} />
        <Route exact path='/' render={() => (
          <Sidepane />
          )} />
      </Switch>
      </div>
    )
  }
}

export default App;
