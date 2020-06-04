import {
    GET_CATEGORIES,
    GET_CATEGORY,
    DELETE_CATEGORY,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,
    EDIT_CATEGORY_FAIL,
    EDIT_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    CATEGORY_LOADING,
    GET_CATEGORY_FAIL,
    GET_CATEGORIES_FAIL, GET_ALL_CATEGORIES, GET_ALL_CATEGORIES_FAIL,
} from './types'
import axios from "axios"
import showErrors from "../../utils/showErrors"
import alert from "../../utils/alert"
import {makeConfig} from "../axios.headers"


export const getCategories = (page = 1) => async dispatch => {
    dispatch({type: CATEGORY_LOADING})
    try {
        const res = await axios.get(`/api/admin/categories/?page=${page}`)
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        })
    } catch (e) {
        showErrors(e)
        dispatch({
            type: GET_CATEGORIES_FAIL,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}
export const getAllCategories = () => async dispatch => {
    dispatch({type: CATEGORY_LOADING})
    try {
        const res = await axios.get(`/api/admin/categories/all`)
        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: res.data
        })
    } catch (e) {
        showErrors(e)
        dispatch({
            type: GET_ALL_CATEGORIES_FAIL,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}
export const getCategory = id => async dispatch => {
    dispatch({type: CATEGORY_LOADING})
    try {
        const res = await axios.get(`/api/admin/categories/${id}`)
        dispatch({
            type: GET_CATEGORY,
            payload: res.data
        })
    } catch (e) {
        showErrors(e)
        dispatch({
            type: GET_CATEGORY_FAIL,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const createCategory = formData => async dispatch => {
    dispatch({type: CATEGORY_LOADING})
    const config = makeConfig()
    try {
        await axios.post('/api/admin/categories', formData, config)
        dispatch({
            type: CREATE_CATEGORY_SUCCESS
        })
        alert(`Категория ${formData.name} создана`, 'green')
    } catch (e) {
        showErrors(e)
        dispatch({
            type: CREATE_CATEGORY_FAIL,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}
export const editCategory = (formData, id) => async dispatch => {
    const config = makeConfig()
    try {
        await axios.patch(`/api/admin/categories/${id}`, formData, config)
        dispatch({
            type: EDIT_CATEGORY_SUCCESS
        })
        alert(`Категория изменена на ${formData.name}`, 'green')
    } catch (e) {
        showErrors(e)
        dispatch({
            type: EDIT_CATEGORY_FAIL,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}


export const deleteCategory = id => async dispatch => {
    try {
        await axios.delete(`/api/admin/categories/${id}`)
        dispatch({
            type: DELETE_CATEGORY,
            payload: id
        })
        alert('Удалена', 'green')
    } catch (e) {
        showErrors(e)
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}