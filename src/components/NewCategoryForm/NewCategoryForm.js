import React from 'react'

import NewGoalForm from '../NewGoalForm/NewGoalForm'
import NewChallengeForm from '../NewChallengeForm/NewChallengeForm'

const NewCategoryForm = (props) => {
    return (
        props.categories.map((category, idx) => {
            let catId = `cat-${idx}`, posId = `pos-${idx}`, negId = `neg-${idx}`
            return (
                <div key={catId} className="single-cateogry">
                    <div className="form-group">
                        <label htmlFor={catId}>Category Name</label>
                        <input
                            type="text"
                            className="form-control categoryName"
                            id={catId}
                            data-id={idx}
                            aria-describedby="categoryName"
                            placeholder="Enter Category Name"
                            name={catId}
                            value={props.categories[idx].name}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor={posId}>Positives</label>
                        <input
                            type="text"
                            className="form-control positives"
                            id={posId}
                            data-id={idx}
                            aria-describedby="categoryPositives"
                            placeholder="What's working for you in this category?"
                            name={posId}
                            value={props.categories[idx].positives}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor={negId}>Areas for Improvement</label>
                        <input
                            type="text"
                            className="form-control negatives"
                            id={negId}
                            data-id={idx}
                            aria-describedby="categoryNegatives"
                            placeholder="What's not working for you in this category?"
                            name={negId}
                            value={props.categories[idx].negatives}></input>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <button onClick={() => props.addGoal(idx)}>Add a Goal</button>
                            <p>Think of how you can improve on the positives you identified or change what isn't working for you!</p>
                        </div>
                        <div className="form-group col-md-6">
                            <button onClick={() => props.addChallenge(idx)}>Add A Challenge</button>
                            <p>Challenge yourself to complete a task a certain number of times during this checkpoint.</p>
                        </div>
                    </div>
                    {category.goals.map((goal, num) => (
                        <NewGoalForm 
                            categoryIdx={idx}
                            goalIdx={num}
                            goal={props.categories[idx].goals[num]}
                        />
                    ))}

                </div>
            )
        })
    )
}

export default NewCategoryForm