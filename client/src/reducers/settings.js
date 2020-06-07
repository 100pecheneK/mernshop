import {
    UPLOADING_SETTINGS,
    CREATE_SETTINGS,
    CREATE_SETTINGS_FAIL,
    RESET_UPLOAD_SETTINGS,
    GET_SETTINGS, GET_SETTINGS_FAIL,
} from '../actions/admin/types'


const initialState = {
    settings: {},
    loading: true,
    errors: null,
    upload: 0
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case RESET_UPLOAD_SETTINGS:
        case UPLOADING_SETTINGS:
            return {
                ...state,
                upload: payload
            }
        case GET_SETTINGS:
        case CREATE_SETTINGS:
            return {
                ...state,
                settings: payload,
                loading: false,
                errors: false
            }
        case GET_SETTINGS_FAIL:
        case CREATE_SETTINGS_FAIL:
            return {
                ...state,
                loading: false,
                errors: payload
            }
        default:
            return state
    }
}