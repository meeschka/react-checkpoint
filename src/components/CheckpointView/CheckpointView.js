import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import dataService from '../../utils/dataService'

import CategoryOverview from '../CategoryOverview/CategoryOverview'
import './CheckpointView.css'

import DailyProgressForm from '../Forms/DailyProgressForm/DailyProgressForm'

class CheckpointView extends Component{
    constructor(props) {
        super(props)
        this.state={
            deleteModal: false,
            updateModal: false,
            avgScore: '',
            avgScores: [],
            calendarData: []
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
    getScores = () => {
        let results = dataService.getAverages(this.props.checkpoint)
        let calendarData = dataService.processDataForCalendars(this.props.checkpoint)
        this.setState({
            avgScore: results.totalAvg,
            avgScores: results.categoryAvg,
            calendarData: calendarData
        })
        console.log(this.state)
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

    closeModalAndUpdate = () => {
        //update daily progress
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
                <h3>{this.state.avgScore ? `Average score is ${this.state.avgScore} / 5` : `No daily progress entered so far`}</h3>
                <div className='d-flex justify-content-between w-75 mb-3'>
                    <div>
                        {`From ${this.props.checkpoint.startDate.slice(0, 10)} to ${this.props.checkpoint.endDate.slice(0, 10)}`}
                    </div>
                    <div>
                        {`Reminders: ${reminderStr}`}
                    </div>
                </div>
                <CategoryOverview categories={this.props.checkpoint.categories} checkpoint={this.props.checkpoint} calendarData={this.state.calendarData} avgScores={this.state.avgScores} />
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
            <Modal show={this.state.updateModal} onHide={this.toggleUpdateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Daily Progress</Modal.Title>
                </Modal.Header>
                <Modal.Body><DailyProgressForm checkpoint={this.props.checkpoint} toggleUpdateModal={this.toggleUpdateModal} /></Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-primary' onClick={this.toggleUpdateModal}>Submit</button>
                    <button className='btn btn-danger' onClick={this.toggleUpdateModal}>Cancel</button>
                </Modal.Footer>
            </Modal>
            </div>
        )
    }
}

export default CheckpointView