import React, { Component } from 'react'
import Sidepane from '../../components/Sidepane/Sidepane'

import './NewCheckpoint.css'

class NewCheckpoint extends Component {
    constructor() {
        super();
        this.state={
          invalidForm: true,
          formData: {
              name: '',
              startDate: '',
              endDate: '',
              reminders: '',
              reminderType: 'None',
              categories: []
          }
        }
    }
    handleChange = (e) => {
    //   this.props.updateMessage('')
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)
    //post to databse
    }

    //only allow logged in users to access form, submit form, etc.

    render() {
        return (
            <div className="new-checkpoint-page">
                <Sidepane />
                <div className="checkpoint-container">
                    <h1>New Checkpoint</h1>
                    <form className="checkpoint-form" onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <label for="checkpointName">Checkpoint Name</label>
                            <input type="text" class="form-control" id="checkpointNameInput" aria-describedby="checkpointName" placeholder="Enter Checkpoint Name" name="name"></input>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="checkpointStartDate">Start Date</label>
                                <input type="date" class="form-control" id="startDateInput" aria-describedby="checkpointStartDate" name="startDate"></input>
                                <small id="dateHelp" class="form-text text-muted">We recommend 2 - 3 months.</small>
                            </div>
                            <div className="form-group col-md-6">
                                <label for="checkpointEndDate">End Date</label>
                                <input type="date" class="form-control" id="endDateInput" aria-describedby="checkpointEndDate" name="endDate"></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="reminderType">Reminders</label>
                                <select class="form-control" id="reminderTypeInput" name="reminderType">
                                    <option>None</option>
                                    <option>Email</option>
                                    <option>Text</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label for="reminderFrequencyInput">Reminder Frequency (days)</label>
                                <input type="text" class="form-control" id="reminderInput" aria-describedby="reminderFrequencyInput" name='reminders'></input>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default NewCheckpoint