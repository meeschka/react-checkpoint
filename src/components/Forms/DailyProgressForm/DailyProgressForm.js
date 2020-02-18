import React, { Component } from 'react'

import { Form } from 'react-bootstrap'

class DailyProgressForm extends Component {
    constructor(props) {
        super(props)
        this.state={
            dailyProgress: []
        }
    }
    componentDidMount() {
        let progress = []
        for(let i=0; i<this.props.checkpoint.categories.length; i++){
            progress.push({
                score: '0',
                notes: '',
                date: ''
            })  
        }
        this.setState({ dailyProgress: progress })
    }

    handleChange = (e) => {
        let dailyProgress = JSON.parse(JSON.stringify(this.state.dailyProgress))
        let keyName = e.target.className.slice(13)
        dailyProgress[e.target.dataset.id][keyName] = e.target.value
        this.setState({ dailyProgress })
    }

    handleSubmit = (e) => {
        e.preventDefault()

    }

    render() {
        const content = this.state.dailyProgress.map((progress, idx) => (
            <div key={`progress-${idx}`}>
                <div className="form-group" key={`progress-score-${idx}`}>
                    <label htmlFor={`score-${idx}`}>Score for {this.props.checkpoint.categories[idx].categoryName}</label>
                    <input
                        type='Text'
                        required
                        className='form-control score'
                        id={`score-${idx}`}
                        data-id={idx}
                        aria-describedby='categoryScore'
                        placeholder='Score from 1-5'
                        name={`score-${idx}`}
                        value={this.state.dailyProgress[idx].score} />
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
                    {content}
                </div>
            </Form>
        )
    }
}

export default DailyProgressForm