import React, { Component } from 'react'

import Sidepane from '../../components/Sidepane/Sidepane'
import Mainpane from '../../components/Mainpane/Mainpane'
import Intropane from '../../components/Intropane/Intropane'

class MainPage extends Component{
    constructor(props) {
        super(props);
        this.state={
        }
    }

    render() {
        const mainView = this.props.checkpoints.length > 0 ?
            <Mainpane checkpoints={this.props.checkpoints} currentCheckpoint={this.props.currentCheckpoint} />
            :
            <Intropane />
        return (
            <div class='d-flex'>
                <Sidepane checkpoints={this.props.checkpoints} selectCheckpoint={this.props.selectCheckpoint} />
                {mainView}
            </div>
        )
    }
}

export default MainPage