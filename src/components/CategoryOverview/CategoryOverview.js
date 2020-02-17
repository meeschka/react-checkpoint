import React, { Component } from 'react'

import './CategoryOverview.css'
import GoalOverview from '../GoalOverview/GoalOverview'
import ChallengeOverview from '../ChallengeOverview/ChallengeOverview'

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
                    <div key={catId} class='category-overview-el'>
                        <h2>{category.categoryName}</h2>
                        {category.positives ? <h4 key={catId+'-positives'}>Positives: {category.positives}</h4> : <p>No positives listed</p>}
                        {category.negatives ? <h4 key={catId+'-negatives'}>Areas for Improvement: {category.negatives}</h4> : <p>No areas for improvement listed</p>}
                        {category.goals.length > 0 ?
                            <GoalOverview goals={category.goals} catId={catId} key={catId+'-goals'}/>
                            : 
                            <p key={catId+'-goals'}>No goals set for {category.categoryName} for this checkpoint</p>}
                        {category.challenges.length > 0 ?
                            <ChallengeOverview challenges={category.challenges} catId={catId} key={catId+'-challenges'}/>
                            :
                            <p key={catId+'-challenges'}>No challenges set for {category.categoryName} for this checkpoint</p>}
                    </div>
                )

            })
        )
    }
}

export default CategoryOverview