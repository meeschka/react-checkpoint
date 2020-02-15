import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Sidepane from '../../components/Sidepane/Sidepane'
import NewCategoryForm from '../../components/NewCategoryForm/NewCategoryForm'

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
              theme: '',
              reminders: '',
              reminderType: 'None',
              categories: [{
                  categoryName: '',
                  positives: '',
                  negatives: ''
              }]
          },
        }
    }
    handleChange = (e) => {
    //   this.props.updateMessage('')
        // let categories = [...this.state.formData.categories]
        let formData = JSON.parse(JSON.stringify(this.state.formData))
        if (["form-control category-name", "form-control positives", "form-control negatives"].includes(e.target.className)) {
            let keyName = e.target.className.slice(13)
            formData.categories[e.target.dataset.id][keyName] = e.target.value
            this.setState({ formData })
        } else {
            formData[e.target.name] = e.target.value
            this.setState({ formData })
        } 
    }
    handleSubmit = async (e) => {
        e.preventDefault()
    //post to databse
    }

    addCategory = (e) => {
        let newCategory = {
            categoryName: '',
            positives: '',
            negatives: ''
        }
        let formData = JSON.parse(JSON.stringify(this.state.formData))
        formData.categories.push(newCategory)
        this.setState({ formData })
    }

    isFormInvalid = () => {
        return false;
    }
    //only allow logged in users to access form, submit form, etc.

    render() {
        return (
            <div className="new-checkpoint-page">
                <Sidepane />
                <div className="checkpoint-container">
                    <h1>New Checkpoint</h1>
                    <form className="checkpoint-form" onSubmit={this.handleSubmit} onChange={this.handleChange} >
                        <div className="form-group">
                            <label htmlFor="name">Checkpoint Name</label>
                            <input type="text" className="form-control" id="checkpointNameInput" aria-describedby="checkpointName" placeholder="Enter Checkpoint Name" name="name"></input>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="checkpointStartDate">Start Date</label>
                                <input type="date" className="form-control" id="startDateInput" aria-describedby="checkpointStartDate" name="startDate"></input>
                                <small id="dateHelp" className="form-text text-muted">We recommend 2 - 3 months.</small>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="checkpointEndDate">End Date</label>
                                <input type="date" className="form-control" id="endDateInput" aria-describedby="checkpointEndDate" name="endDate"></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="theme">Checkpoint Theme</label>
                            <input type="text" className="form-control" id="checkpointThemeInput" aria-describedby="checkpointTheme" placeholder="Enter Checkpoint Theme" name="theme"></input>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="reminderType">Reminders</label>
                                <select className="form-control" id="reminderTypeInput" name="reminderType">
                                    <option>None</option>
                                    <option>Email</option>
                                    <option>Text</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="reminderFrequencyInput">Reminder Frequency (days)</label>
                                <input type="text" className="form-control" id="reminderInput" aria-describedby="reminderFrequencyInput" name='reminders'></input>
                            </div>
                        </div>
                        <h4>Checkpoint Categories</h4>
                        <p>Try breaking goals up into different sections of your life: social, health, finance, etc.</p>
                       <NewCategoryForm categories={this.state.formData.categories}/>
                       <div className="form-group">
                            <button onClick={this.addCategory}>Add a Category</button>
                        </div>
                       <div className="form-group">
                            <div className="checkpoint-form-btns">
                                <button className="btn btn-primary" disabled={this.isFormInvalid()}>Submit</button>
                                <Link to='/' className="btn btn-dark">Cancel</Link>
                            </div>
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default NewCheckpoint