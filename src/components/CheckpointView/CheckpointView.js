import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

import CategoryOverview from '../CategoryOverview/CategoryOverview'
import './CheckpointView.css'

class CheckpointView extends Component{
    constructor(props) {
        super(props);
        this.state={
            modalOn: false
        }
    }

    toggleModal = () => {
        let current = this.state.modalOn
        this.setState({ modalOn: !current})
    }

    closeModalAndDelete = () => {
        this.toggleModal()
        this.props.handleDeleteCheckpoint()
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
                <div className='d-flex justify-content-between w-75 mb-3'>
                    <div>
                        {`From ${this.props.checkpoint.startDate.slice(0, 10)} to ${this.props.checkpoint.endDate.slice(0, 10)}`}
                    </div>
                    <div>
                        {`Reminders: ${reminderStr}`}
                    </div>
                </div>
                <CategoryOverview categories={this.props.checkpoint.categories} />
                <div className='checkpoint-view-btns'>
                    <button className='btn btn-success'>Add Daily Progress</button>
                    <button className='btn btn-primary'>Edit Checkpoint</button>
                    <button className='btn btn-danger' onClick={this.toggleModal}>Delete Checkpoint</button>
                </div>
            <Modal show={this.state.modalOn} onHide={this.toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to permenantly delete this checkpoint, and all your progress on it?</Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-primary' onClick={this.toggleModal}>Cancel</button>
                    <button className='btn btn-danger' onClick={this.closeModalAndDelete}>Delete Checkpoint</button>
                </Modal.Footer>
            </Modal>
            </div>
        )
    }
}

export default CheckpointView