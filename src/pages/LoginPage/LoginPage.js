import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import userService from '../../utils/userService'

class LoginPage extends Component{
    constructor(props) {
        super(props);
        this.state = {message: ''}
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await userService.login(this.state)
            this.props.handleSignupOrLogin()
            this.props.history.push('/')
        } catch (err) {
            this.setState({
                message: 'Invalid credentials'
            })
        }
    }

    render() {
        return (
            <div className="auth-form-container">
             <div className="smaller-auth-form-container">
                <h2>Login</h2>
                <form className="form-horizontal" onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input type="password" className="form-control" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="auth-form-btns">
                            <button className="btn btn-primary">Login</button>
                            <Link to='/' className="btn btn-dark">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
            {this.state.message ? <h5>{this.state.message}</h5> : ''}
            <h5>Don't have an account yet? Sign up <Link to='/signup'>here</Link>.</h5>
          </div>
        )
    }
}

export default LoginPage