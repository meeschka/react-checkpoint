import React, { Component } from 'react'

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
                    <div key={catId}>
                        <h3>{category.categoryName}</h3>
                        {category.positives ? <p key={catId+'-positives'}>Positives: {category.positives}</p> : <p>No positives listed</p>}
                        {category.negatives ? <p key={catId+'-negatives'}>Areas for Improvement: {category.negatives}</p> : <p>No areas for improvement listed</p>}
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