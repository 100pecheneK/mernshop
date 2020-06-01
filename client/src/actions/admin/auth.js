import axios from 'axios'
import {
    LOGIN_SUCCESS,
    AUTH_ERROR,
    LOGIN_FAIL,
    USER_LOADED,
    LOGOUT,
} from "./types"
import {makeBody, makeConfig} from "../axios.headers"
import setAuthToken from "../../utils/setAuthToken"
import alert from "../../utils/alert"

// Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/admin/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}


// Login User
export const login = (email, password) => async dispatch => {
    const config = makeConfig()
    const body = makeBody({email, password})

    try {
        const res = await axios.post('/api/admin/auth', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (e) {
        const errors = e.response.data.errors
        if (errors) {
            errors.forEach(error => alert(error.msg, 'red'))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// Logout / Clear profile
export const logout = () => dispatch => {
    dispatch({type: LOGOUT})
}