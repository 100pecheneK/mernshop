import {makeConfig} from "../axios.headers"
import axios from "axios"
import {
    CREATE_USER_SUCCESS,
    GET_USERS,
    DELETE_USER,
    GET_USERS_FAIL,
    DELETE_USER_FAIL, USER_LOADING, CREATE_USER_FAIL,
} from "./types"
import alert from "../../utils/alert"
import showErrors from "../../utils/showErrors"
import history from "../../history"

export const createUser = formData => async dispatch => {
    const config = makeConfig()
    dispatch({type: USER_LOADING})
    try {
        await axios.post('/api/admin/users', formData, config)
        dispatch({
            type: CREATE_USER_SUCCESS,
        })
        alert(`${formData.name} создан!`, 'green')
        history.push('/admin/accounts/list')
    } catch (e) {
        const errors = e.response.data.errors
        if (errors) {
            errors.forEach(error => alert(error.msg, 'red'))
        }
        dispatch({type: CREATE_USER_FAIL, payload: errors})
    }
}

export const getUsers = (page = 1) => async dispatch => {
    dispatch({type: USER_LOADING})
    try {
        const res = await axios.get(`/api/admin/users/list/?page=${page}`)
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    } catch (e) {
        showErrors(e)
        dispatch({
            type: GET_USERS_FAIL,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const deleteUser = id => async dispatch => {
    try {
        await axios.delete(`/api/admin/users/${id}`)
        dispatch({
            type: DELETE_USER,
            payload: id
        })
        alert('Удалён', 'green')
    } catch (e) {
        showErrors(e)
        dispatch({
            type: DELETE_USER_FAIL,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}
