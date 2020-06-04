import {
    GET_CATEGORIES,
    GET_CATEGORIES_FAIL,
    CATEGORY_LOADING,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,
    GET_CATEGORY,
    GET_CATEGORY_FAIL,
    EDIT_CATEGORY_FAIL,
    DELETE_CATEGORY,
    DELETE_CATEGORY_FAIL, EDIT_CATEGORY_SUCCESS, GET_ALL_CATEGORIES, GET_ALL_CATEGORIES_FAIL,
} from '../actions/admin/types'


const initialState = {
    categories: {},
    category: {},
    allCategories: {},
    loading: true,
    createLoading: false,
    errors: null,
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case CATEGORY_LOADING:
            return {
                ...state,
                createLoading: true,
                loading: true,
                errors: false
            }
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                allCategories: payload,
                loading: false,
                createLoading: false,
                errors: false
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload,
                loading: false,
                createLoading: false,
                errors: false,
            }
        case GET_CATEGORY:
            return {
                ...state,
                category: payload,
                loading: false,
                createLoading: false,
                errors: false,
            }
        case CREATE_CATEGORY_SUCCESS:
        case EDIT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                createLoading: false,
                errors: false,
            }
        case DELETE_CATEGORY:
            const {docs, totalDocs, limit} = state.categories
            return {
                ...state,
                categories: {
                    ...state.categories,
                    docs: docs.filter(good => good._id !== payload),
                    totalDocs: totalDocs - 1,
                    totalPages: Math.ceil((totalDocs - 1) / limit)
                },
                loading: false,
                createLoading: false,
            }
        case GET_ALL_CATEGORIES_FAIL:
        case CREATE_CATEGORY_FAIL:
        case GET_CATEGORIES_FAIL:
        case GET_CATEGORY_FAIL:
        case EDIT_CATEGORY_FAIL:
        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                createLoading: false,
                errors: payload,
            }
        default:
            return state
    }
}