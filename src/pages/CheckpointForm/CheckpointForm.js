import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import checkpoint from '../../services/checkpoint-api'

import Sidepane from '../../components/Sidepane/Sidepane'
import CategoryForm from '../../components/Forms/CategoryForm/CategoryForm'

import './CheckpointForm.css'

class CheckpointForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            isNew: Math.abs(this.props.match.params.id) < this.props.checkpoints.length ? false : true,
            isLoading: false,
            formData: {
                name: '',
                startDate: '',
                endDate: '',
                theme: '',
                reminderNum: '',
                reminderType: 'None',
                categories: [{
                    categoryName: '',
                    positives: '',
                    negatives: '',
                    challenges: [],
                    goals: []
                }],
                user:[this.props.user._id] || '',
            }
        }
    }
    async componentDidMount(){
        await this.props.refreshCheckpoints()
        if (!this.props.user){
            this.props.history.push('/login')
        }
        let index = Math.abs(this.props.match.params.id)
            if (index < this.props.checkpoints.length){
                //convert dates to be readible by calendar inputs
                const startDate = this.props.checkpoints[index].startDate.slice(0,10)
                const endDate = this.props.checkpoints[index].endDate.slice(0,10)
                this.setState({
                    isNew: false,
                    formData: {
                        name: this.props.checkpoints[index].name || '',
                        startDate: startDate,
                        endDate: endDate,
                        theme: this.props.checkpoints[index].theme,
                        reminderNum: this.props.checkpoints[index].reminderNum,
                        reminderType: this.props.checkpoints[index].reminderType,
                        categories: this.props.checkpoints[index].categories,
                        user:[this.props.user._id],
                    }
                })
            }
            console.log(this.state)
    }

    handleChange = (e) => {
    //   this.props.updateMessage('')
        let formData = JSON.parse(JSON.stringify(this.state.formData))
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
        if (this.isFormInvalid) {
            let formData = this.state.formData
            formData.reminderNum = this.processNumbers()
            this.setState({isLoading: true})
            if (this.state.isNew) { 
                await checkpoint.create(formData)
            } else {
                await checkpoint.update(this.props.checkpoints[Math.abs(this.props.match.params.id)]._id, this.state.formData)
            }
            this.setState({isLoading: false})
            await this.props.refreshCheckpoints()
            this.props.setCheckpoint(0)
            this.props.history.push('/')
        } else {
            alert('Please fill in all required fields')
        }
        
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

    quickStart = () => {
        let today = new Date();
        let threeMonths = new Date(today.getTime()+ 1000*60*60*24*7*12)
        let formattedToday = today.toISOString().slice(0,10)
        let formattedThreeMonths = threeMonths.toISOString().slice(0,10)
        const formData = {
            name: 'Checkpoint',
            startDate: formattedToday,
            endDate: formattedThreeMonths,
            theme: '',
            reminderNum: '',
            reminderType: 'None',
            categories: [{
                categoryName: 'Health',
                positives: '',
                negatives: '',
                challenges: [],
                goals: []
            }, {
            categoryName: 'Finance',
            positives: '',
            negatives: '',
            challenges: [],
            goals: []
            }, {
            categoryName: 'Social',
            positives: '',
            negatives: '',
            challenges: [],
            goals: []
            }, {
            categoryName: 'Relationship',
            positives: '',
            negatives: '',
            challenges: [],
            goals: []
            }, {
            categoryName: 'Career',
                positives: '',
                negatives: '',
                challenges: [],
                goals: []
            }, {
                categoryName: 'Hobby',
                positives: '',
                negatives: '',
                challenges: [],
                goals: []
            }],
            user:[this.props.user._id] || '',
        }
        this.setState({ formData })
    }

    processNumbers = () => {
        let number = this.state.formData.reminderNum || 0
        let newNumber = number.toString().replace(/\D/g,'')
        if (newNumber.length === 11) {
            return newNumber
        } else if (newNumber.length === 10) {
            return ("1".concat(newNumber))
        }
        else return(null)
    }

    removeCategory = (e) => {
        e.preventDefault()
        const idx = e.target.dataset.id
        let formData = JSON.parse(JSON.stringify(this.state.formData))
        formData.categories = formData.categories.splice(idx, 1)
        this.setState({ formData })
    }

    removeChallenge = (categoryIdx, challengeIdx) => {
        return (e) => {
            console.log(e)
            e.preventDefault()
            let formData = JSON.parse(JSON.stringify(this.state.formData))
            formData.categories[categoryIdx].challenges.splice(challengeIdx, 1)
            this.setState({ formData })
        }
    }

    removeGoal = (categoryIdx, goalIdx) => {
        return (e) => {
            e.preventDefault()
            let formData = JSON.parse(JSON.stringify(this.state.formData))
            formData.categories[categoryIdx].goals.splice(goalIdx, 1)
            this.setState({ formData })
        }
    }

    validCategories = () => {
        let valid = true
        this.state.formData.categories.forEach(category => { 
            if (category.categoryName.length <1) {
            valid = false
        } })
        return (valid)
    }
    
    validGoalsAndChallenges = () => {
        let valid = true
        this.state.formData.categories.forEach(category => { 
            //check challenges
            category.challenges.forEach(challenge => {
                if (challenge.challenge.length < 1 || challenge.num.length < 1 ) {
                    valid = false
                }
            })
            //check goals
            category.goals.forEach(goal => {
                if (goal.goal.length < 1) {
                    valid = false
                }
            })
        }) 
        return (valid)
    }

    isFormInvalid = () => {
        let phoneNum = this.state.formData.reminderType === 'Text' ? this.processNumbers() : true
        return !(this.state.formData.name && this.state.formData.startDate && this.state.formData.endDate && this.validCategories() && this.validGoalsAndChallenges() && phoneNum);
    }
    //only allow logged in users to access form, submit form, etc.

    render() {
        return (
            <div className="new-checkpoint-page">
                <Sidepane checkpoints={this.props.checkpoints} selectCheckpoint={this.props.navigateToCheckpoint} user={this.props.user} />
                <div className="checkpoint-container">
                    <h1 className='mb-4'>{this.state.isNew ? 'New Checkpoint' : 'Edit Checkpoint'}</h1>
                    {this.state.isNew ? <button className="btn btn-sm btn-secondary" onClick={this.quickStart}>Quickstart</button> : ''}
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
                                    value={this.state.formData.name}
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
                                        value={this.state.formData.startDate}
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
                                        value={this.state.formData.endDate}
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
                                    value={this.state.formData.theme}
                                ></input>
                            </div>
                            <div className="form-row reminder-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="reminderType">Reminders</label>
                                    <select
                                        className="form-control"
                                        id="reminderTypeInput"
                                        name="reminderType"
                                        value={this.state.formData.reminderType}>
                                        <option value="None">None</option>
                                        <option value="Text">Text</option>
                                    </select>
                                </div>
                                <div className={this.state.formData.reminderType === 'Text' ? "form-group col-md-6" : "form-group col-md-6 hidden"}>
                                    <label htmlFor="reminder-phone-number-label">Phone Number for Text Reminders</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="reminderPhoneInput"
                                        aria-describedby="reminderPhoneInput"
                                        name='reminderNum'
                                        value={this.state.formData.reminderNum}
                                        placeholder='Required for text reminders'
                                    ></input>
                                    <small id="phoneNumberHelp" className="form-text text-muted">Only valid for North American phone numbers.</small>
                                </div>
                            </div>
                            <h4>Checkpoint Categories</h4>
                            <p>Try breaking goals up into different sections of your life: social, health, finance, etc.</p>
                        </div>
                       <CategoryForm
                            categories={this.state.formData.categories}
                            addChallenge={this.addChallenge}
                            addGoal={this.addGoal}
                            removeCategory={this.removeCategory}
                            removeChallenge={this.removeChallenge}
                            removeGoal={this.removeGoal}
                        />
                       <div className="form-group">
                           {this.state.isLoading ? 
                           <div>Is loading...</div>
                            :
                            <div className="checkpoint-form-btns">
                                <button className="btn btn-primary" onClick={this.addCategory}>Add a Category</button>
                                <button className="btn btn-success" disabled={this.isFormInvalid()} onClick={this.handleSubmit}>{this.state.isNew? "Create Checkpoint" : "Edit Checkpoint"}</button>
                                <Link to='/' className="btn btn-danger">Cancel</Link>
                            </div>
                            }
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default CheckpointForm