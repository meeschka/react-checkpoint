import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import checkpoint from '../../services/checkpoint-api'

import Sidepane from '../../components/Sidepane/Sidepane'
import NewCategoryForm from '../../components/Forms/NewCategoryForm/NewCategoryForm'

import './NewCheckpoint.css'

class NewCheckpoint extends Component {
    constructor(props) {
        super(props);
        this.state={
          invalidForm: true,
          isLoading: false,
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
                  negatives: '',
                  challenges: [],
                  goals: []
              }],
              user:[this.props.user._id],
          },
        }
    }
    handleChange = (e) => {
    //   this.props.updateMessage('')
        let formData = JSON.parse(JSON.stringify(this.state.formData))
        console.log(formData)
        if (["form-control categoryName", "form-control positives", "form-control negatives"].includes(e.target.className)) {
            let keyName = e.target.className.slice(13)
            formData.categories[e.target.dataset.id][keyName] = e.target.value
        } else if (["form-control goal", "form-control plan", "form-control motivation"].includes(e.target.className)) {
            let keyName = e.target.className.slice(13)
            let id = e.target.dataset.id.split(',')
            formData.categories[id[0]].goals[id[1]][keyName] = e.target.value
        } else if (["form-control challenge", "form-control num"].includes(e.target.className)) {
            let keyName = e.target.className.slice(13)
            let id = e.target.dataset.id.split(',')
            formData.categories[id[0]].challenges[id[1]][keyName] = e.target.value
        } else {
            formData[e.target.name] = e.target.value
        } 
        this.setState({ formData })
        // console.log(this.state.formData)
    }
    
    handleSubmit = async (e) => {
        e.preventDefault()
        this.setState({isLoading: true})
        await checkpoint.create(this.state.formData)
        this.setState({isLoading: false})
        // if res is okay this.props.history.push('/')
    //post to databse
    }

    addCategory = (e) => {
        let newCategory = {
            categoryName: '',
            positives: '',
            negatives: '',
            challenges: [],
            goals: []
        }
        let formData = JSON.parse(JSON.stringify(this.state.formData))
        formData.categories.push(newCategory)
        this.setState({ formData })
    }

    addGoal = (num) => {
        let formData = JSON.parse(JSON.stringify(this.state.formData))
        formData.categories[num].goals.push({
            goal: '',
            plan: '',
            motivation: ''
        })
        this.setState({ formData })
    }

    addChallenge = (num) => {
        let formData = JSON.parse(JSON.stringify(this.state.formData))
        formData.categories[num].challenges.push({
            challenge: '',
            num: '',
            results: []
        })
        this.setState({ formData })
    }

    isFormInvalid = () => {
        return false;
    }
    //only allow logged in users to access form, submit form, etc.

    render() {
        return (
            <div className="new-checkpoint-page">
                <Sidepane checkpoints={this.props.checkpoints} selectCheckpoint={this.props.selectCheckpoint} />
                <div className="checkpoint-container">
                    <h1>New Checkpoint</h1>
                    <form className="checkpoint-form" onSubmit={this.handleSubmit} onChange={this.handleChange} >
                        <div className = 'checkpoint-main-form'>
                            <div className="form-group">
                                <label htmlFor="name">Checkpoint Name</label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    id="checkpointNameInput"
                                    aria-describedby="checkpointName"
                                    placeholder="Enter Checkpoint Name"
                                    name="name"
                                ></input>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="checkpointStartDate">Start Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="form-control"
                                        id="startDateInput"
                                        aria-describedby="checkpointStartDate"
                                        name="startDate"
                                    ></input>
                                    <small id="dateHelp" className="form-text text-muted">We recommend 2 - 3 months.</small>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="checkpointEndDate">End Date</label>
                                    <input 
                                        type="date"
                                        required
                                        className="form-control"
                                        id="endDateInput"
                                        aria-describedby="checkpointEndDate"
                                        name="endDate"
                                    ></input>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="theme">Checkpoint Theme</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="checkpointThemeInput"
                                    aria-describedby="checkpointTheme"
                                    placeholder="Enter Checkpoint Theme"
                                    name="theme"
                                ></input>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="reminderType">Reminders</label>
                                    <select
                                        className="form-control"
                                        id="reminderTypeInput"
                                        name="reminderType">
                                        <option>None</option>
                                        <option>Email</option>
                                        <option>Text</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="reminderFrequencyInput">Reminder Frequency (days)</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="reminderInput"
                                        aria-describedby="reminderFrequencyInput"
                                        name='reminders'
                                    ></input>
                                </div>
                            </div>
                            <h4>Checkpoint Categories</h4>
                            <p>Try breaking goals up into different sections of your life: social, health, finance, etc.</p>
                        </div>
                       <NewCategoryForm
                            categories={this.state.formData.categories}
                            addChallenge={this.addChallenge}
                            addGoal={this.addGoal}
                        />
                       <div className="form-group">
                            <div className="checkpoint-form-btns">
                                <button className="btn btn-primary" onClick={this.addCategory}>Add a Category</button>
                                <button className="btn btn-success" disabled={this.isFormInvalid()}>Create Checkpoint</button>
                                <Link to='/' className="btn btn-danger">Cancel</Link>
                            </div>
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default NewCheckpoint