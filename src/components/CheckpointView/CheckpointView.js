import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import dataService from '../../utils/dataService'
import CategoryOverview from '../CategoryOverview/CategoryOverview'
import './CheckpointView.css'
import RadarGraph from '../Graphs/RadarGraph/RadarGraph'

import DailyProgressForm from '../Forms/DailyProgressForm/DailyProgressForm'

class CheckpointView extends Component{
    constructor(props) {
        super(props)
        this.state={
            deleteModal: false,
            updateModal: false,
            avgScore: '',
            avgScores: [],
            calendarData: [],
            radarData: []
        }
    }

    componentDidMount = () => {
        this.getScores()
    }
    componentDidUpdate = (prevProps) => {
        if (this.props.checkpoint !== prevProps.checkpoint) {
            this.getScores()
        }
    }
    getScores = async () => {
        let results = await dataService.getAverages(this.props.checkpoint)
        let calendarData = await dataService.processDataForCalendars(this.props.checkpoint)
        let radarData = await dataService.processDataForRadar(this.props.checkpoint)
        this.setState({
            avgScore: results.totalAvg,
            avgScores: results.categoryAvg,
            calendarData: calendarData,
            radarData: [radarData]
        })
    }

    toggleDeleteModal = () => {
        let current = this.state.deleteModal
        this.setState({ deleteModal: !current })
    }

    toggleUpdateModal = () => {
        let current = this.state.updateModal
        this.setState({ updateModal: !current })
    }

    closeModalAndDelete = () => {
        this.toggleDeleteModal()
        this.props.handleDeleteCheckpoint()
    }

    formatDates = (date) => {
        return (new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
    }
    formatPhoneNum = (num) => {
        let numStr = num.toString()
        return (`+1 (${numStr.slice(1,4)}) ${numStr.slice(4,7)}-${numStr.slice(7,11)}`)
    }

    render() {
        let reminderStr = 'None'
        if (this.props.checkpoint.reminderType === 'Text'){
            reminderStr = `Send text reminders to ${this.formatPhoneNum(this.props.checkpoint.reminderNum)}`
        }
        return (
            <div className='checkpoint-view-container'>
                <h1>{this.props.checkpoint.name}</h1>
                <h3>{this.props.checkpoint.theme}</h3>
                <h3>{this.state.avgScore ? `Average score is ${this.state.avgScore} / 5` : `No daily progress entered so far`}</h3>
                <div className='d-flex justify-content-between w-75 mb-3'>
                    <div>
                        {`From ${this.formatDates(this.props.checkpoint.startDate)} to ${this.formatDates(this.props.checkpoint.endDate)}`}
                    </div>
                    <div>
                        {`Reminders: ${reminderStr}`}
                    </div>
                </div>
                {this.state.radarData.length > 0 ? <RadarGraph radarData={this.state.radarData} /> : ''}
                <div className='category-view-container' >
                    <CategoryOverview categories={this.props.checkpoint.categories} checkpoint={this.props.checkpoint} calendarData={this.state.calendarData} avgScores={this.state.avgScores} />
                </div>
                <div className='checkpoint-view-btns'>
                    <button className='btn btn-success' onClick={this.toggleUpdateModal}>Add Daily Progress</button>
                    <Link to={`/form/${this.props.checkpointIdx}`} className='btn btn-primary'>Edit Checkpoint</Link>
                    <button className='btn btn-danger' onClick={this.toggleDeleteModal}>Delete Checkpoint</button>
                </div>
            <Modal show={this.state.deleteModal} onHide={this.toggleDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to permenantly delete this checkpoint, and all your progress on it?</Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-primary' onClick={this.toggleDeleteModal}>Cancel</button>
                    <button className='btn btn-danger' onClick={this.closeModalAndDelete}>Delete Checkpoint</button>
                </Modal.Footer>
            </Modal>
            <DailyProgressForm refreshCheckpoints={this.props.refreshCheckpoints} updateModal={this.state.updateModal} toggleUpdateModal={this.toggleUpdateModal} checkpoint={this.props.checkpoint} getScores={this.getScores} />
            </div>
        )
    }
}

export default CheckpointView