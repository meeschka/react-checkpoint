import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
// import logo from '../../checkpoint.svg';
import './App.css';
import { withRouter } from "react-router";
import userService from '../../utils/userService'
import checkpointAPI from '../../services/checkpoint-api'

import SignupPage from '../SignupPage/SignupPage'
import LoginPage from '../LoginPage/LoginPage'
import MainPage from '../MainPage/MainPage'
import GuidePage from '../GuidePage/GuidePage'
import CheckpointForm from '../CheckpointForm/CheckpointForm'
import NavBar from '../../components/Navbar/Navbar'


class App extends Component {
  constructor() {
    super();
    this.state={
      user: userService.getUser(),
      checkpoints: [],
      currentCheckpoint: '',
    }
  }

  //checkpoint methods
  selectCheckpoint = (e) => {
    this.setState({currentCheckpoint: e.target.dataset.id})
  }

  setCheckpoint = (num) => {
    this.setState({currentCheckpoint: num})
  }

  refreshCheckpoints = async () => {
    let currentCheckpoint = this.state.currentCheckpoint
    console.log(`current checkpoint before refresh: ${currentCheckpoint}`)
    const checkpoints = await checkpointAPI.getAll()
    if (checkpoints.length >= currentCheckpoint) currentCheckpoint = 0
    if (checkpoints.length > 0) {
      this.setState({ checkpoints: checkpoints, currentCheckpoint: currentCheckpoint || 0})
    } else (this.setState({checkpoints: checkpoints, currentCheckpoint: ''}))
    console.log(`current checkpoint before refresh: ${this.state.currentCheckpoint}`)
  }

  navigateToCheckpoint = async (e) => {
    await this.selectCheckpoint(e)
    await this.refreshCheckpoints()
    const { history } = this.props;
    history.push('/')
  }

  handleDeleteCheckpoint = async () => {
    await checkpointAPI.deleteCheckpoint(this.state.checkpoints[this.state.currentCheckpoint]._id)
    this.refreshCheckpoints()
  }

  //Auth methods
  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser()})
    this.refreshCheckpoints()
  }

  handleLogout = () => {
    userService.logout()
    this.setState({ checkpoints: [], currentCheckpoint: '' })
    this.setState({ user: null })
  }

  //Lifecycle Methods
  async componentDidMount() {
    if (this.state.user) {
      await this.refreshCheckpoints()
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
        <Route exact path='/form/:id' render={(props) => <CheckpointForm
          {...props}
          user={this.state.user}
          checkpoints={this.state.checkpoints}
          refreshCheckpoints={this.refreshCheckpoints}
          navigateToCheckpoint={this.navigateToCheckpoint}
          setCheckpoint={this.setCheckpoint}
          user={this.state.user}
        />
        } />
        <Route exact path='/' render={() => (<MainPage 
          checkpoints={this.state.checkpoints}
          selectCheckpoint={this.selectCheckpoint}
          currentCheckpoint={this.state.currentCheckpoint}
          handleDeleteCheckpoint={this.handleDeleteCheckpoint}
          refreshCheckpoints={this.refreshCheckpoints}
          setCheckpoint={this.setCheckpoint}
          user={this.state.user}
          />
        )} />
        <Route exact path='/guide' render={() => (<GuidePage 
          checkpoints={this.state.checkpoints}
          navigateToCheckpoint={this.navigateToCheckpoint}
          user={this.state.user}
          />
        )} />
      </Switch>
      </div>
    )
  }
}

export default App;
