import {
    CREATE_USER_FAIL,
    CREATE_USER_SUCCESS, DELETE_USER, DELETE_USER_FAIL, GET_USERS, GET_USERS_FAIL, USER_LOADING,
} from '../actions/admin/types'

const initialState = {
    users: {},
    loading: true,
    errors: null,
    createLoading: false
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case USER_LOADING:
            return {
                ...state,
                createLoading: true,
                loading: true,
                errors: null
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                createLoading: false,
                errors: false
            }
        case GET_USERS:
            return {
                ...state,
                users: payload,
                loading: false,
                createLoading: false,
                errors: false
            }
        case DELETE_USER:
            const {docs, totalDocs, limit} = state.users
            return {
                ...state,
                users: {
                    ...state.users,
                    docs: docs.filter(user => user._id !== payload),
                    totalDocs: totalDocs - 1,
                    totalPages: Math.ceil((totalDocs - 1) / limit)
                },
                loading: false,
                createLoading: false,
                errors: false
            }
        case GET_USERS_FAIL:
        case CREATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                createLoading: false,
                errors: payload
            }
        default:
            return state
    }
}