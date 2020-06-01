import {
    CREATE_USER_SUCCESS, GET_USERS, GET_USERS_FAIL, USER_LOADING,
} from '../actions/admin/types'

const initialState = {
    users: {},
    loading: true,
    errors: null
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case USER_LOADING:
            return {
                ...state,
                loading: true,
                errors: null
            }
        case CREATE_USER_SUCCESS:
            return {}
        case GET_USERS:
            return {
                ...state,
                users: payload,
                loading: false
            }
        case GET_USERS_FAIL:
            return {
                ...state,
                loading: false,
                errors: payload
            }
        default:
            return state
    }
}