import React from 'react'

const GoalForm = (props) => {
    let id = [props.categoryIdx, props.goalIdx]
    let idStr = `${props.categoryIdx}-${props.goalIdx}`
    return (
        <div className="challenge-form" key={`goal-${idStr}}`}>
            <div className='challenge-header d-flex justify-content-between' key={`reader-goal-${idStr}`}>
                <h5 key={`title-goal-${idStr}`}>{`Goal ${props.goalIdx+1}`}</h5>
                <button className='btn btn-danger' key={`remove-goal-${idStr}`} onClick={props.removeGoal(props.categoryIdx, props.goalIdx)}>Remove Goal</button>
            </div>
            <div className="form-group" key={`goal-goal-${idStr}`}>
                <label htmlFor={`goal-${idStr}`} key={`goal-goal-label-${idStr}`}>Goal</label>
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
                    key={`goal-goal-input-${idStr}`}
                />
            </div>
            <div className="form-group" key={`plan-goal-${idStr}`}>
                <label htmlFor={`plan-${idStr}`} key={`plan-goal-label-${idStr}`}>Plan</label>
                <input 
                    type="text"
                    className="form-control plan"
                    id={`plan-${idStr}`}
                    data-id={id}
                    aria-describedby="goalPlan"
                    placeholder="Can you break your goal down into specific steps?"
                    name={`plan-${idStr}`}
                    value={props.goal.plan}
                    key={`plan-goal-input-${idStr}`}
                />
            </div>
            <div className="form-group" key={`motivation-goal-${idStr}`}>
                <label htmlFor={`motivation-${idStr}`} key={`motivation-goal-label-${idStr}`}>Motivation</label>
                <input 
                    type="text"
                    className="form-control motivation"
                    id={`motivation-${idStr}`}
                    data-id={id}
                    aria-describedby="goalMotivation"
                    placeholder="What's keeping you motivated?"
                    name={`motivation-${idStr}`}
                    value={props.goal.motivation}
                    key={`motivation-goal-input-${idStr}`}
                />
            </div>
        </div>
    )
}

export default GoalForm