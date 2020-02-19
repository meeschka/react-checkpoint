import tokenService from '../utils/tokenService';

const BASE_URL = '/api/checkpoints'

//main checkpoint routes

function create(checkpoint) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer '+ tokenService.getToken()
        },
        body: JSON.stringify(checkpoint)
    })
    .then(res => {
        if (res.ok) return res.json()
        throw new Error('New checkpoint could not be added.')
    })
}

function deleteCheckpoint(checkpointId) {
    return fetch(`${BASE_URL}/${checkpointId}`, {
        method: 'DELETE'
    }).then(res => {
        if (res.ok) return res.json()
        throw new Error('Checkpoint could not be deleted')
    })
}

function getAll() {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+ tokenService.getToken()
        }
    })
    .then(res => {
        if (res.ok) return res.json()
        return res.json([])
    })
}

function update(checkpointId, updatedCheckpoint) {
    return fetch(`${BASE_URL}/${checkpointId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer '+ tokenService.getToken()
        },
        body: JSON.stringify(updatedCheckpoint)
    })
    .then(res => {
        if (res.ok) return res.json()
        throw new Error('Checkpoint could not be updated')
    })
}

//routes for daily progress, an embedded model
function addProgress(checkpointId, progressData, progressDate) {
    let formattedData = []
    for (let i = 0; i < progressData.length; i++) {
        formattedData[i] = {...progressData[i], date: progressDate}
    }
    console.log(formattedData)
    console.log('hit the checkpoint api')
    return fetch(`${BASE_URL}/${checkpointId}/addProgress`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer '+ tokenService.getToken()
        },
        body: JSON.stringify(formattedData)
    })
    .then(res => {
        if (res.ok) return res.json()
        throw new Error('Progress could not be added')
    })
}

export default {
    create,
    deleteCheckpoint,
    getAll,
    update,
    addProgress
}