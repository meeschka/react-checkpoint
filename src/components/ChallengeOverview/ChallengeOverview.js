import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

import checkpoint from '../../services/checkpoint-api'

class ChallengeOverview extends Component {
    constructor(props){
        super(props)
        this.state = {
            challengeModal: false,
            challengeId: '',
            formData: {
                result: '',
                date: new Date().toISOString().slice(0,10)
            }
        }
    }

    toggleChallengeModal = (challengeIdx) => {
        return () => {
            let current = this.state.challengeModal
            this.setState({ challengeModal: !current, challengeId: challengeIdx })
        }
    }

    handleChange = (e) => {
        let formData = JSON.parse(JSON.stringify(this.state.formData))
        let keyName = e.target.className.slice(13)
        formData[keyName] = e.target.value
        this.setState({ formData })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        let data = {
            challengeId: this.state.challengeId,
            categoryId: this.props.catId,
            checkpointId: this.props.checkpointId,
            formData: this.state.formData
        }
        await checkpoint.addChallengeResult(data)
        this.toggleChallengeModal()()
        this.props.refreshCheckpoints()
    }

    render = () => {
        let challenges = this.props.challenges.map((challenge, challengeIdx) => (
            <div key={this.props.catId+'-'+challengeIdx} className='challengeOverview'>
                <h5 key={this.props.catId+'-challenge-'+challengeIdx}>{challenge.challenge+' '+challenge.num+' times.'}</h5>
                <h4>{`Current progress: ${challenge.results.length} / ${challenge.num}`}</h4>
                {challenge.results.length > 0
                ?
                <ul>
                    {challenge.results.map((result, resultIdx) => (<li>{`${result.date.slice(0,10)}: ${result.result}`}</li>))}
                </ul>
                :
                ''
                }
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-success btn-sm' onClick={this.toggleChallengeModal(challengeIdx)}>Add progress</button>
                </div>
            </div>
        ))
        challenges.unshift(<h3 key={this.props.catId+'-challenges'}>Challenges</h3>)
        return (
            <div className='challenges-div'>
                {challenges}
                <Modal show={this.state.challengeModal} onHide={this.toggleChallengeModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Challenge Progress</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onChange={this.handleChange}>
                        <div className="form-group" key={`challenge-progress`}>
                            <label htmlFor={`result`}>Result for Challenge {this.state.challengeId+1}:</label>
                            <input
                                type='Text'
                                className='form-control result'
                                id={`results`}
                                aria-describedby='result'
                                placeholder="How did you complete a portion of your challenge?"
                                name={`results`}
                                value={this.state.formData.result} />
                        </div>
                        <div className="form-group" key={`challenge-date`}>
                            <label htmlFor={`challenge-date`}>Date: </label>
                            <input
                                type='Date'
                                className='form-control date'
                                id={`challenge-date`}
                                aria-describedby='challengeResultsDate'
                                name={`challenge-date`}
                                value={this.state.formData.date} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-primary' onClick={this.handleSubmit}>Submit</button>
                    <button className='btn btn-danger' onClick={this.toggleChallengeModal()}>Cancel</button>
                </Modal.Footer>
            </Modal>
            </div>
        )
    }
    
}

export default ChallengeOverview