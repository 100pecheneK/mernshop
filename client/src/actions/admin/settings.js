import {
    GET_SETTINGS,
    CREATE_SETTINGS,
    UPDATE_SETTINGS,
    GET_CATEGORIES_FAIL,
    CATEGORY_LOADING,
    CREATE_CATEGORY_SUCCESS,
    UPLOADING_SETTINGS,
    EDIT_GOOD_SUCCESS, CREATE_SETTINGS_FAIL, RESET_UPLOAD_SETTINGS, GET_SETTINGS_FAIL,
} from './types'
import showErrors from "../../utils/showErrors"
import {makeConfig} from "../axios.headers"
import axios from "axios"
import alert from "../../utils/alert"

const createFormData = ({
                            shotTitle,
                            title,
                            image1_text,
                            image2_text,
                            contactUs,
                            image3_text,
                            about,
                            youtube,
                            twitter,
                            facebook,
                            instagram,
                            vkontakte,
                            advantage1,
                            icon1,
                            advantage2,
                            icon2,
                            advantage3,
                            icon3,
                            image1,
                            image2,
                            image3,
                        }) => {
    const formData = new FormData()
    if (shotTitle) formData.append('shotTitle', shotTitle)
    if (title) formData.append('title', title)
    if (image1_text) formData.append('image1_text', image1_text)
    if (image2_text) formData.append('image2_text', image2_text)
    if (contactUs) formData.append('contactUs', contactUs)
    if (image3_text) formData.append('image3_text', image3_text)
    if (about) formData.append('about', about)
    if (youtube) formData.append('youtube', youtube)
    if (twitter) formData.append('twitter', twitter)
    if (facebook) formData.append('facebook', facebook)
    if (instagram) formData.append('instagram', instagram)
    if (vkontakte) formData.append('vkontakte', vkontakte)
    if (advantage1) formData.append('advantage1', advantage1)
    if (icon1) formData.append('icon1', icon1)
    if (advantage2) formData.append('advantage2', advantage2)
    if (icon2) formData.append('icon2', icon2)
    if (advantage3) formData.append('advantage3', advantage3)
    if (icon3) formData.append('icon3', icon3)
    if (image1) formData.append('image1', image1[0])
    if (image2) formData.append('image2', image2[0])
    if (image3) formData.append('image3', image3[0])

    return formData
}
export const resetUpload = (value = 0) => async dispatch => {
    dispatch({type: RESET_UPLOAD_SETTINGS, payload: value})
}
export const createSettings = data => async dispatch => {
    const formData = createFormData(data)
    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: ProgressEvent => {
            dispatch({
                type: UPLOADING_SETTINGS,
                payload: (ProgressEvent.loaded / ProgressEvent.total * 100)
            })
        }
    }
    try {
        const res = await axios.post('/api/admin/settings', formData, options)
        dispatch({
            type: CREATE_SETTINGS,
            payload: res.data
        })
        alert('Настройки сохранены', 'green')
    } catch (e) {
        showErrors(e)
        dispatch({
            type: CREATE_SETTINGS_FAIL,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const getSettings = () => async dispatch => {
    try {
        const res = await axios.get('/api/admin/settings')
        dispatch({
            type: GET_SETTINGS,
            payload: res.data
        })
    } catch (e) {
        showErrors(e)
        dispatch({
            type: GET_SETTINGS_FAIL,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}