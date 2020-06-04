import axios from "axios"
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
} from './types'
import alert from "../../utils/alert"
import showErrors from "../../utils/showErrors"

export const getGoods = (page = 1) => async dispatch => {
    dispatch({type: GOODS_LOADING})
    try {
        const res = await axios.get(`/api/admin/goods/?page=${page}`)
        dispatch({
            type: GET_GOODS,
            payload: res.data
        })
    } catch (e) {
        showErrors(e)
        dispatch({
            type: GET_GOODS_FAIL,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}
export const getGood = id => async dispatch => {
    dispatch({type: GOODS_LOADING})
    try {
        const res = await axios.get(`/api/admin/goods/${id}`)
        dispatch({
            type: GET_GOOD,
            payload: res.data
        })
    } catch (e) {
        showErrors(e)
        dispatch({
            type: GET_GOOD_FAIL,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}
const createFormData = ({
                            name,
                            category,
                            description,
                            price,
                            goodNumber,
                            count,
                            images,
                        }) => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('category', category)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('goodNumber', goodNumber)
    formData.append('count', count)
    for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i])
    }
    return formData
}
export const createGood = (data) => async dispatch => {
    const formData = createFormData(data)

    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: ProgressEvent => {
            dispatch({type: UPLOADING, payload: ProgressEvent.loaded / ProgressEvent.total * 100})
        }
    }
    try {
        await axios.post('/api/admin/goods', formData, options)
        dispatch({
            type: CREATE_GOOD_SUCCESS
        })
        alert(`Товар ${data.goodNumber} создан`, 'green')
    } catch (e) {
        showErrors(e)
        dispatch({
            type: CREATE_GOOD_FAIL,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}
export const editGood = (data, id) => async dispatch => {
    const formData = createFormData(data)

    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: ProgressEvent => {
            dispatch({type: UPLOADING, payload: (ProgressEvent.loaded / ProgressEvent.total * 100)})
        }
    }
    try {
        const res = await axios.patch(`/api/admin/goods/${id}`, formData, options)
        dispatch({
            type: EDIT_GOOD_SUCCESS,
            payload: res.data
        })
        alert(`Товар ${data.goodNumber} изменён`, 'green')
    } catch (e) {
        showErrors(e)
        dispatch({
            type: EDIT_GOOD_FAIL,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const resetUpload = (value = 0) => async dispatch => {
    dispatch({type: RESET_UPLOAD, payload: value})
}

export const deleteGood = id => async dispatch => {
    try {
        await axios.delete(`/api/admin/goods/${id}`)
        dispatch({
            type: DELETE_GOOD,
            payload: id
        })
        alert('Удалён', 'green')
    } catch (e) {
        showErrors(e)
        dispatch({
            type: DELETE_GOOD_FAIL,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}