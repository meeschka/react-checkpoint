import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import './Intropane.css'

class Intropane extends Component {
    render() {
        return (
            <div className="d-flex flex-column align-items-center w-100 mt-5">
                <h1 className='text-center'>Hello and welcome to checkpoint</h1>
                <div className='d-flex flex-row justify-content-around flex-wrap'>
                    <div className="intro-card">
                        <i className="fas fa-seedling fa-8x"></i>
                        <h3>Use checkpoint to make meaningful goals over realistic timelines</h3>
                    </div>
                    <div className="intro-card">
                        <i className="far fa-star fa-8x"></i>
                        <h3>Set specific challenges to push yourself further</h3>
                    </div>
                    <div className="intro-card">
                        <i className="fas fa-tasks fa-8x"></i>
                        <h3>Enter daily progress and get reminders to remain focused on your goals</h3>
                    </div>
                    <div className="intro-card">
                        <i className="fas fa-rocket fa-8x"></i>
                        <h3>Watch your success grow as you take control of your life</h3>
                    </div>
                </div>
                <Link to='/form/1000000 ' className='btn btn-primary btn-lg intro-btn'>Get started now!</Link>
            </div>
        )
    }
}

export default Intropane