import React from 'react'

const GoalOverview = (props) => {
    let goals = props.goals.map((goal, goalIdx) => (
        <div key={props.catId+'-'+goalIdx} className='goalOverview'>
            <h3 key={props.catId+'-goalText-'+goalIdx}>{goal.goal}</h3>
            {goal.plan ? <p key={props.catId+'-goalPlan-'+goalIdx}>It's good to be prepared. Remember your plan: {goal.motivation}</p> : ''}
            {goal.motivation ? <p key={props.catId+'-goalMotivation-'+goalIdx}>Remember your motivation! {goal.motivation}</p> : ''}
        </div>
    ))
    goals.unshift(<h1 key={props.catId+'-goals'}>Goals</h1>)
    return goals
}

export default GoalOverview