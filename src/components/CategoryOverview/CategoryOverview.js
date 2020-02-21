import React, { Component } from 'react'

import './CategoryOverview.css'
import GoalOverview from '../GoalOverview/GoalOverview'
import ChallengeOverview from '../ChallengeOverview/ChallengeOverview'
import CalendarGraph from '../Graphs/CalendarGraph/CalendarGraph'
import NoScores from '../Graphs/NoScores/NoScores'

class CategoryOverview extends Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }

    render() {
        return (
            this.props.categories.map((category, idx) => {
                let catId = `cat-${idx}`

                return (
                    <div key={catId} className='category-overview-el'>
                        <h2>{category.categoryName}</h2>
                        {category.positives ? <h5 key={catId+'-positives'}><strong>Positives:</strong> {category.positives}</h5> : <p>No positives listed</p>}
                        {category.negatives ? <h5 key={catId+'-negatives'}><strong>Areas for Improvement:</strong> {category.negatives}</h5> : <p>No areas for improvement listed</p>}
                        <hr />
                        <div className='challenges-and-goals-container'>
                            <div className='little-goal-container'>
                                {category.goals.length > 0 ?
                                <GoalOverview goals={category.goals} catId={catId} key={catId+'-goals'}/>
                                : 
                                <h5 key={catId+'-goals'}>No goals set for {category.categoryName} for this checkpoint</h5>}
                            </div>
                            <div className='little-goal-container'>
                            {category.challenges.length > 0 ?
                            <ChallengeOverview challenges={category.challenges} catId={idx} checkpointId={this.props.checkpoint._id} key={'cat-'+idx+'-challenges'} refreshCheckpoints={this.props.refreshCheckpoints}/>
                            :
                            <h5 key={catId+'-challenges'}>No challenges set for {category.categoryName} for this checkpoint</h5>}
                            </div>

                        </div>
                        <hr />
                        {this.props.calendarData.length > 0 && this.props.calendarData[idx] ? 
                            <CalendarGraph checkpoint={this.props.checkpoint} data={this.props.calendarData[idx]} avgScore={this.props.avgScores[idx] || 0} />
                            :
                            <NoScores />
                        }
                    </div>
                )

            })
        )
    }
}

export default CategoryOverview