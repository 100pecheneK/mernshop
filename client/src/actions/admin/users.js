import {makeBody, makeConfig} from "../axios.headers"
import axios from "axios"
import {
    CREATE_USER_SUCCESS,
    GET_USERS,
    GET_USER,
    DELETE_USER,
    GET_USERS_FAIL,
    GET_USER_FAIL,
    DELETE_USER_FAIL, USER_LOADING,
} from "./types"
import alert from "../../utils/alert"
import {loadUser} from "./auth"

export const createUser = ({name, email, password}) => async dispatch => {
    const config = makeConfig()
    const body = makeBody({name, email, password})

    try {
        const res = await axios.post('/api/admin/users', body, config)
        dispatch({
            type: CREATE_USER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
        alert(`${name} создан!`, 'green')
    } catch (e) {
        const errors = e.response.data.errors
        if (errors) {
            errors.forEach(error => alert(error.msg))
        }
    }
}

export const getUsers = page => async dispatch => {
    dispatch({type: USER_LOADING})
    try {
        const res = await axios.get(`/api/admin/users/list/?page=${page||1}`)
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    } catch (e) {
        const errors = e.response.data.errors
        if (errors) {
            errors.forEach(error => alert(error.msg, 'red'))
        }
        dispatch({
            type: GET_USERS_FAIL,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}
export const getUser = id => async dispatch => {

}
export const deleteUser = id => async dispatch => {

}
