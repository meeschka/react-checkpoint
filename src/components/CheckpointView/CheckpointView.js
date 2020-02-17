import React, {Component} from 'react'

import CategoryOverview from '../CategoryOverview/CategoryOverview'
import './CheckpointView.css'

class CheckpointView extends Component{
    constructor(props) {
        super(props);
        this.state={
        }
    }

    render() {
        const reminderStr = this.props.checkpoint.reminderType === "None" ?
            'None'
            :
            `Every ${this.props.checkpoint.reminders} days by ${this.props.checkpoint.reminderType}`
        return (
            <div className='checkpoint-view-container'>
                <h1>{this.props.checkpoint.name}</h1>
                <h3>{this.props.checkpoint.theme}</h3>
                <div className='d-flex justify-content-between w-75'>
                    <div>
                        {`From ${this.props.checkpoint.startDate.slice(0, 10)} to ${this.props.checkpoint.endDate.slice(0, 10)}`}
                    </div>
                    <div>
                        {`Reminders: ${reminderStr}`}
                    </div>
                </div>
                <CategoryOverview categories={this.props.checkpoint.categories} />

            </div>
        )
    }
}

export default CheckpointView