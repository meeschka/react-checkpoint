import React, { Component } from 'react'
import StarRatings from 'react-star-ratings'

import { Form } from 'react-bootstrap'
import checkpoint from '../../../services/checkpoint-api'

class DailyProgressForm extends Component {
    constructor(props) {
        super(props)
        this.state={
            dailyProgress: [],
            date: ''
        }
    }
    componentDidMount() {
        let progress = []
        let today = new Date()
        let currentMonth = ((today.getMonth()).toString()).padStart(2, '0')
        let date = `${today.getFullYear()}-${currentMonth}-${today.getDate()}`
        for(let i=0; i<this.props.checkpoint.categories.length; i++){
            progress.push({
                score: '0',
                notes: '',
                date: date
            })  
        }
        this.setState({ dailyProgress: progress, date: `${today.getFullYear()}-${currentMonth}-${today.getDate()}` })
    }

    changeStars = (newRating, name) => {
        let dailyProgress = JSON.parse(JSON.stringify(this.state.dailyProgress))
        let index = parseInt(name)
        dailyProgress[index].score = newRating
        this.setState({ dailyProgress })
    }

    handleChange = (e) => {
        let dailyProgress = JSON.parse(JSON.stringify(this.state.dailyProgress))
        let keyName = e.target.className.slice(13)
        if (keyName === 'date'){
            this.setState({ date: e.target.value})
        } else {
            dailyProgress[e.target.dataset.id][keyName] = e.target.value
            this.setState({ dailyProgress })
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        await checkpoint.addProgress(this.props.checkpoint._id, this.state.dailyProgress, this.state.date)
        this.props.toggleUpdateModal()
    }

    render() {
        const content = this.state.dailyProgress.map((progress, idx) => (
            <div key={`progress-${idx}`}>
                <div className="form-group d-flex justify-content-between" key={`progress-score-${idx}`}>
                    <label htmlFor={`score-${idx}`}>Score for {this.props.checkpoint.categories[idx].categoryName}</label>
                    <StarRatings
                        rating={parseInt(this.state.dailyProgress[idx].score)}
                        starRatedColor="#005731"
                        starHoverColor='#005731'
                        changeRating={this.changeStars}
                        numberOfStars={5}
                        name={`${idx}`}
                        className='form-control score'
                    />
                </div>
                <div className="form-group" key={`progress-notes-${idx}`}>
                    <label htmlFor={`notes-${idx}`}>Notes for {this.props.checkpoint.categories[idx].categoryName}</label>
                    <input
                        type='Text'
                        className='form-control notes'
                        id={`notes-${idx}`}
                        data-id={idx}
                        aria-describedby='cateogryNotes'
                        placeholder="Anything notable about today's progress?"
                        name={`notes-${idx}`}
                        value={this.state.dailyProgress[idx].notes} />
                </div>
            </div>
            
        ))
        return (
            <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <div className="daily-progress">
                    <div className="form-group progress-date">
                    <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            required
                            className="form-control date"
                            id="date"
                            aria-describedby="progressDate"
                            name="date"
                            value={this.state.date}
                        ></input>
                    </div>
                    {content}
                    <input type="submit" />
                </div>
            </Form>
        )
    }
}

export default DailyProgressForm