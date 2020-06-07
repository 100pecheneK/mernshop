export const makeConfig = () => ({
    headers: {
        'Content-Type': 'application/json'
    }
})

export const makeBody = body => JSON.stringify(body)