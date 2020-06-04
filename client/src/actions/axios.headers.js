import {UPLOADING} from "./admin/types"

export const makeConfig = () => ({
    headers: {
        'Content-Type': 'application/json'
    }
})

export const makeBody = body => JSON.stringify(body)