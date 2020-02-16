import React from 'react'

const NewGoalForm = (props) => {
    let id = [props.categoryIdx, props.goalIdx]
    let idStr = `${props.categoryIdx}-${props.goalIdx}`
    return (
        <div className="challenge-form" key={`goal-${props.categoryIdx}-${props.goalIdx}`}>
            <h5>{`Goal ${props.goalIdx+1}`}</h5>
            <div className="form-group">
                <label htmlFor={`goal-${idStr}`}>Goal</label>
                <input 
                    type="text"
                    required
                    className="form-control goal"
                    id={`goal-${idStr}`}
                    data-id={id}
                    aria-describedby="goal"
                    placeholder="What's your goal?"
                    name={`goal-${idStr}`}
                    value={props.goal.goal}
                />
            </div>
            <div className="form-group">
                <label htmlFor={`plan-${idStr}`}>Plan</label>
                <input 
                    type="text"
                    className="form-control plan"
                    id={`plan-${idStr}`}
                    data-id={id}
                    aria-describedby="goalPlan"
                    placeholder="Can you break your goal down into specific steps?"
                    name={`plan-${idStr}`}
                    value={props.goal.plan}
                />
            </div>
            <div className="form-group">
                <label htmlFor={`motivation-${idStr}`}>Motivation</label>
                <input 
                    type="text"
                    className="form-control motivation"
                    id={`motivation-${idStr}`}
                    data-id={id}
                    aria-describedby="goalMotivation"
                    placeholder="What's keeping you motivated?"
                    name={`motivation-${idStr}`}
                    value={props.goal.motivation}
                />
            </div>
        </div>
    )
}

export default NewGoalForm