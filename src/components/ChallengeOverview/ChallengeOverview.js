import React from 'react'

const ChallengeOverview = (props) => {
    let challenges = props.challenges.map((challenge, challengeIdx) => (
        <div key={props.catId+'-'+challengeIdx} className='challengeOverview'>
            <h5 key={props.catId+'-challenge-'+challengeIdx}>{challenge.challenge+' '+challenge.num+' times.'}</h5>
        </div>
    ))
    challenges.unshift(<h3 key={props.catId+'-challenges'}>Challenges</h3>)
    return challenges
}

export default ChallengeOverview