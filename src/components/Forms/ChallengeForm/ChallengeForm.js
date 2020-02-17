import React from 'react'

const ChallengeForm = (props) => {
    let id = [props.categoryIdx, props.challengeIdx]
    let idStr = `${props.categoryIdx}-${props.challengeIdx}`
    return (
        <div className="challenge-form" key={`goal-${props.categoryIdx}-${props.challengeIdx}`}>
            <h5>{`Challenge ${props.challengeIdx+1}`}</h5>
            <div className="form-group">
                <label htmlFor={`challenge-${idStr}`}>Challenge</label>
                <input 
                    type="text"
                    required
                    className="form-control challenge"
                    id={`challenge-${idStr}`}
                    data-id={id}
                    aria-describedby="challenge"
                    placeholder="What are you going to do?"
                    name={`challenge-${idStr}`}
                    value={props.challenge.challenge}
                />
            </div>
            <div className="form-group">
                <label htmlFor={`num-${idStr}`}>Quantity</label>
                <input 
                    type="text"
                    required
                    className="form-control num"
                    id={`num-${idStr}`}
                    data-id={id}
                    aria-describedby="challengeNum"
                    placeholder="How many times are you going to do it?"
                    name={`num-${idStr}`}
                    value={props.challenge.num}
                />
            </div>
        </div>
    )
}

export default ChallengeForm