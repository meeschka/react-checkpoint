import React from 'react'
import { Link } from 'react-router-dom'
import './Sidepane.css'

const Sidepane = (props) => {
    let options
    if (props.checkpoints.length === 0 ) {
        options = <Link to='/form/100000'><h3>Create a checkpoint</h3></Link>
    } else {
        options = props.checkpoints.map((checkpoint, idx) => (
            <h3
                onClick={props.selectCheckpoint}
                key={`nav-checkpoint-${checkpoint._id}`}
                data-id={idx}
            >{checkpoint.name}</h3>
        ))
    }

    return (
        <div className='sidepane'>
           {options}
        </div>
    )
}
    

export default Sidepane