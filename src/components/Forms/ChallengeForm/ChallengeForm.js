import React from 'react'

const ChallengeForm = (props) => {
    let id = [props.categoryIdx, props.challengeIdx]
    let idStr = `${props.categoryIdx}-${props.challengeIdx}`
    return (
        <div className="challenge-form" key={`challenge-${idStr}`}>
            <div className='challenge-header d-flex justify-content-between' key={`header-challenge-${idStr}`}>
                <h5 key={`title-challenge-${idStr}`}>{`Challenge ${props.challengeIdx+1}`}</h5>
                <button className='btn btn-danger' key={`remove-challenge-${idStr}`} onClick={props.removeChallenge(props.categoryIdx, props.challengeIdx)}>Remove Challenge</button>
            </div>
            <div className="form-group" key={`challenge-challenge-${idStr}`}>
                <label htmlFor={`challenge-${idStr}`} key={`challenge-challenge-label-${idStr}`}>Challenge</label>
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
                    key={`challenge-challenge-input-${idStr}`}
                />
            </div>
            <div className="form-group" key={`quantity-challenge-${idStr}`}>
                <label htmlFor={`num-${idStr}`} key={`quantity-challenge-label-${idStr}`}>Quantity</label>
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
                    key={`quantity-challenge-input-${idStr}`}
                />
            </div>
        </div>
    )
}

export default ChallengeForm