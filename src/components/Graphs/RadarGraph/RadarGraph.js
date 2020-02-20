import React, { Component } from 'react'
import { ResponsiveRadar } from '@nivo/radar'
import './RadarGraph.css'

class radarGraph extends Component {
    constructor(props){
        super(props)
        this.state={
            radarOn: true
        }
    }

    toggleRadar = () => {
        let radarStatus = this.state.radarOn
        this.setState({ radarOn: !radarStatus})
    }

    render() {
        return (
            <div className='d-flex flex-column align-items-center'>
                <button className='btn btn-sm btn-primary' onClick={this.toggleRadar}>Toggle Radar Chart</button>
                <div className={this.state.radarOn ? 'radar-container' : 'radar-container hidden'}>
                    <ResponsiveRadar 
                        data={this.props.radarData[0].arr}
                        keys={this.props.radarData[0].keys}
                        indexBy={this.props.radarData[0].indexBy}
                        maxValue={5}
                        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                        curve="linearClosed"
                        borderWidth={2}
                        gridLevels={5}
                        gridShape="circular"
                        gridLabelOffset={36}
                        enableDots={true}
                        dotSize={10}
                        dotColor={{ theme: 'background' }}
                        dotBorderWidth={2}
                        dotBorderColor={{ from: 'color' }}
                        enableDotLabel={true}
                        dotLabel="value"
                        dotLabelYOffset={-12}
                        colors={{ scheme: 'accent' }}
                        fillOpacity={0.25}
                        blendMode="multiply"
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                        isInteractive={true}
                    />
                </div>
            </div>
        )
    }

}

export default radarGraph