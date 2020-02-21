import React from 'react'

const GoalOverview = (props) => {
    let goals = props.goals.map((goal, goalIdx) => (
        <div key={props.catId+'-'+goalIdx} className='goalOverview'>
            <h4 key={props.catId+'-goalText-'+goalIdx}>{goal.goal}</h4>
            {goal.plan ? <h5 key={props.catId+'-goalPlan-'+goalIdx}>It's good to be prepared. Remember your plan: {goal.plan}</h5> : ''}
            {goal.motivation ? <h5 key={props.catId+'-goalMotivation-'+goalIdx}>Remember your motivation! {goal.motivation}</h5> : ''}
        </div>
    ))
    goals.unshift(<h3 key={props.catId+'-goals'}>Goals</h3>)
    return goals
}

export default GoalOverview