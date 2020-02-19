import React from 'react'

import GoalForm from '../GoalForm/GoalForm'
import ChallengeForm from '../ChallengeForm/ChallengeForm.js'

import './CategoryForm.css'

const CategoryForm = (props) => {
    return (
        props.categories.map((category, idx) => {
            let catId = `cat-${idx}`, posId = `pos-${idx}`, negId = `neg-${idx}`
            let titleText = props.categories[idx].name ? props.categories[idx].name : `Category ${idx+1}`
            return (
                <div key={catId} className="single-category-form">
                    <div className='category-header-form d-flex justify-content-between' key={`header-${catId}`}>
                        <h3 key={`title-${catId}`}>{titleText}</h3>
                        {idx === 0 ? '' : <button className='btn btn-danger' key={`remove-cat-${catId}`} data-id={idx} onClick={props.removeCategory}>Remove Category</button>}
                    </div>
                    <div className="form-group" key={`cat-name-${catId}`}>
                        <label htmlFor={catId} key={`cat-name-label-${catId}`}>Category Name</label>
                        <input
                            type="text"
                            required
                            className="form-control categoryName"
                            id={catId}
                            data-id={idx}
                            aria-describedby="categoryName"
                            placeholder="Enter Category Name"
                            name={catId}
                            value={props.categories[idx].categoryName}
                            key={`cat-name-input-${catId}`}></input>
                    </div>
                    <div className="form-group" key={`positives-${catId}`}>
                        <label htmlFor={posId} key={`positives-label-${catId}`}>Positives</label>
                        <input
                            type="text"
                            className="form-control positives"
                            id={posId}
                            data-id={idx}
                            aria-describedby="categoryPositives"
                            placeholder="What's working for you in this category?"
                            name={posId}
                            value={props.categories[idx].positives}
                            key={`positives-input-${catId}`}></input>
                    </div>
                    <div className="form-group" key={`negatives-${catId}`}>
                        <label htmlFor={negId} key={`negatives-label-${catId}`}>Areas for Improvement</label>
                        <input
                            type="text"
                            className="form-control negatives"
                            id={negId}
                            data-id={idx}
                            aria-describedby="categoryNegatives"
                            placeholder="What's not working for you in this category?"
                            name={negId}
                            value={props.categories[idx].negatives}
                            key={`negatives-input-${catId}`}></input>
                    </div>
                    <div className="d-flex mt-4" key={`goal-and-challenges-container-${catId}`}>
                        <div className="form-group challenge-and-goals-form" key={`goal-btn-row-${catId}`}>
                            <button className="btn btn-primary" key={`add-goal-btn-${catId}`} onClick={() => props.addGoal(idx)}>Add a Goal</button>
                            <p key={`goal-text-${catId}`}>Think of how you can improve on the positives you identified or change what isn't working for you!</p>
                        </div>
                        <div className="form-group challenge-and-goals-form" key={`challenges-btn-row-${catId}`}>
                            <button className="btn btn-primary" key={`add-challenge-btn-${catId}`} onClick={() => props.addChallenge(idx)}>Add A Challenge</button>
                            <p key={`challenge-text-${catId}`}>Challenge yourself to complete a task a certain number of times during this checkpoint.</p>
                        </div>
                    </div>
                    {category.goals.length > 0 ? <h3 key={`goal-header-${catId}`}>Goals</h3> : ''}
                    {category.goals.map((goal, num) => (
                        <GoalForm 
                            categoryIdx={idx}
                            goalIdx={num}
                            goal={goal}
                            removeGoal={props.removeGoal}
                        />
                    ))}
                    {category.challenges.length > 0 ? <h3 key={`challenge-header-${catId}`}>Challenges</h3> : ''}
                    {category.challenges.map((challenge, num) => (
                        <ChallengeForm 
                            categoryIdx={idx}
                            challengeIdx={num}
                            challenge={challenge}
                            removeChallenge={props.removeChallenge}
                        />
                    ))}

                </div>
            )
        })
    )
}

export default CategoryForm