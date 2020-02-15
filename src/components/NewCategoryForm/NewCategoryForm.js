import React from 'react'

const NewCategoryForm = (props) => {
    return (
        props.categories.map((val, idx) => {
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
                            aria-describedby="categoryNegatives"
                            placeholder="What's not working for you in this category?"
                            name={negId}
                            value={props.categories[idx].negatives}></input>
                    </div>
                </div>
            )
        })
    )
}

export default NewCategoryForm