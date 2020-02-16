import tokenService from '../utils/tokenService';

const BASE_URL = '/api/checkpoints'

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
        if (res.ok) return res.json();
        throw new Error('New checkpoint could not be added.')
    })
}

function getAll(userId) {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+ tokenService.getToken()
        }
    })
    .then(res => {
        if (res.ok) return res.json()
        throw new Error('Database Error')
    })
}

export default {
    create,
    getAll
}