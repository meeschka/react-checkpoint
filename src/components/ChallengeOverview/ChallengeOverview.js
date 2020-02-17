import React from 'react'

const ChallengeOverview = (props) => {
    let challenges = props.challenges.map((challenge, challengeIdx) => (
        <div key={props.catId+'-'+challengeIdx} className='challengeOverview'>
            <h3 key={props.catId+'-challenge-'+challengeIdx}>{challenge.challenge+' '+challenge.quantity+' times.'}</h3>
        </div>
    ))
    challenges.unshift(<h1> key={props.catId+'-challenges'}Challenges</h1>)
    return challenges
}

export default ChallengeOverview