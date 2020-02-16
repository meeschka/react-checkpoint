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
        console.log(res)
        console.log(res.err)
        throw new Error('New checkpoint could not be added.')
    })
}

export default {
    create
}