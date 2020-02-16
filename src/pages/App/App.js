import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import logo from '../../checkpoint.svg';
import './App.css';

import userService from '../../utils/userService'
import checkpointAPI from '../../services/checkpoint-api'

import SignupPage from '../SignupPage/SignupPage'
import LoginPage from '../LoginPage/LoginPage'

import NavBar from '../../components/Navbar/Navbar'
import Sidepane from '../../components/Sidepane/Sidepane'
import NewCheckpoint from '../NewCheckpoint/NewCheckpoint';


class App extends Component {
  constructor() {
    super();
    this.state={
      user: userService.getUser(),
      checkpoints: []
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

  //Lifecycle Methods
  async componentDidMount() {
    const checkpoints = await checkpointAPI.getAll()
    this.setState({checkpoints})
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
        <Route exact path='/new' render={({history}) => <><NewCheckpoint
          history={history} 
          user={this.state.user}
        />
        </>} />
        <Route exact path='/' render={() => (
          <Sidepane />
          )} />
      </Switch>
      </div>
    )
  }
}

export default App;
