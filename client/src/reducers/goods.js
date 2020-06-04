import {
    CREATE_GOOD_SUCCESS,
    CREATE_GOOD_FAIL,
    EDIT_GOOD_SUCCESS,
    EDIT_GOOD_FAIL,
    GET_GOODS,
    GET_GOODS_FAIL,
    GET_GOOD,
    GET_GOOD_FAIL,
    DELETE_GOOD,
    DELETE_GOOD_FAIL,
    GOODS_LOADING, UPLOADING, RESET_UPLOAD,
} from '../actions/admin/types'

const initialState = {
    goods: {},
    good: {},
    loading: true,
    createLoading: false,
    errors: null,
    upload: 0
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case RESET_UPLOAD:
        case UPLOADING:
            return {
                ...state,
                upload: payload
            }
        case GOODS_LOADING:
            return {
                ...state,
                createLoading: true,
                loading: true,
                upload: 0,
                errors: false
            }
        case GET_GOODS:
            return {
                ...state,
                goods: payload,
                loading: false,
                createLoading: false,
                errors: false,
                upload: 0
            }

        case GET_GOOD:
        case EDIT_GOOD_SUCCESS:
            return {
                ...state,
                good: payload,
                loading: false,
                createLoading: false,
                errors: false,
                upload: 0
            }
        case CREATE_GOOD_SUCCESS:
            return {
                ...state,
                loading: false,
                createLoading: false,
                errors: false,
                upload: 0
            }
        case DELETE_GOOD:
            const {docs, totalDocs, limit} = state.goods
            return {
                ...state,
                goods: {
                    ...state.goods,
                    docs: docs.filter(good => good._id !== payload),
                    totalDocs: totalDocs - 1,
                    totalPages: Math.ceil((totalDocs - 1) / limit)
                },
                loading: false,
                upload: 0,
                createLoading: false,
            }
        case CREATE_GOOD_FAIL:
        case GET_GOODS_FAIL:
        case GET_GOOD_FAIL:
        case EDIT_GOOD_FAIL:
        case DELETE_GOOD_FAIL:
            return {
                ...state,
                loading: false,
                createLoading: false,
                errors: payload,
                upload: 0
            }
        default:
            return state
    }
}