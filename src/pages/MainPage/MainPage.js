import React, { Component } from 'react'

import './MainPage.css'

import Sidepane from '../../components/Sidepane/Sidepane'
import CheckpointView from '../../components/CheckpointView/CheckpointView'
import Intropane from '../../components/Intropane/Intropane'

class MainPage extends Component{
    constructor(props) {
        super(props);
        this.state={
        }
    }

    render() {
        const mainView = this.props.checkpoints.length > 0 ?
            <CheckpointView checkpoint={this.props.checkpoints[this.props.currentCheckpoint]} />
            :
            <Intropane />
        return (
            <div className='d-flex mainpage-container'>
                <Sidepane checkpoints={this.props.checkpoints} selectCheckpoint={this.props.selectCheckpoint} />
                {mainView}
            </div>
        )
    }
}

export default MainPage