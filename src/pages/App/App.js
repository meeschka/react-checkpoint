import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import logo from '../../checkpoint.svg';
import './App.css';

import userService from '../../utils/userService'
import checkpointAPI from '../../services/checkpoint-api'

import SignupPage from '../SignupPage/SignupPage'
import LoginPage from '../LoginPage/LoginPage'
import MainPage from '../MainPage/MainPage'

import NavBar from '../../components/Navbar/Navbar'
import NewCheckpoint from '../NewCheckpoint/NewCheckpoint';

class App extends Component {
  constructor() {
    super();
    this.state={
      user: userService.getUser(),
      checkpoints: [],
      currentCheckpoint: ''
    }
  }

  //checkpoint methods
  selectCheckpoint = (e) => {
    this.setState({currentCheckpoint: e.target.dataset.id})
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
    if (this.state.user) {
      const checkpoints = await checkpointAPI.getAll()
      this.setState({checkpoints})
      if (checkpoints.length > 0 && !this.state.currentCheckpoint) {this.setState({currentCheckpoint: 0})}
    }
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
          checkpoints={this.state.checkpoints}
          selectCheckpoint={this.selectCheckpoint}
        />
        </>} />
        <Route exact path='/' render={() => (<MainPage 
          checkpoints={this.state.checkpoints}
          selectCheckpoint={this.selectCheckpoint}
          currentCheckpoint={this.state.currentCheckpoint}
          />
          )} />
      </Switch>
      </div>
    )
  }
}

export default App;
