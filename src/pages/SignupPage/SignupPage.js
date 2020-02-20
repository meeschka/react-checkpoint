import React, { Component } from 'react'

import SignupForm from '../../components/Auth/SignupForm/SignupForm'

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {message: ''}
    }

    updateMessage = (msg) => {
        this.setState({message: msg})
    }

    render() {
        return (
            <div className='SignupPage d-flex flex-column justify-content-center align-items-center'>
                <SignupForm {...this.props} updateMessage={this.updateMessage} />
                <h5>{this.state.message}</h5>
            </div>
        )
    }
}

export default SignupPage