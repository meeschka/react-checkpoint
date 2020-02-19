import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import userService from '../../../utils/userService'
import './SignupForm.css'

class SignupForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        passwordConf: ''
    }

    handleChange = (e) => {
        this.props.updateMessage('');
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await userService.signup(this.state)
            this.props.handleSignupOrLogin()
            this.props.history.push('/')
        } catch (err) {
            this.props.updateMessage(err.message)
        }
    }

    isFormInvalid() {
        return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
    }

    render() {
        return (
            <div className="auth-form-container">
              <div className="smaller-auth-form-container">
                <h2>Sign Up</h2>
                <form className="form-horizontal" onSubmit={this.handleSubmit} >
                  <div className="form-group">
                    <div className="col-sm-12">
                      <input type="text" className="form-control" placeholder="Name" value={this.state.name} name="name" onChange={this.handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-12">
                      <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-12">
                      <input type="password" className="form-control" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-12">
                      <input type="password" className="form-control" placeholder="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="auth-form-btns">
                      <button className="btn btn-primary" disabled={this.isFormInvalid()}>Sign Up</button>
                      <Link to='/' className="btn btn-dark">Cancel</Link>
                    </div>
                  </div>
                </form>
              </div>
              <h5>Already have an account? Login <Link to='/login'>here</Link>.</h5>
            </div>
          );
    }
}

export default SignupForm