import {
    CLEAR_CART,
    ADD_ITEM_TO_CART,
    DELETE_ITEM_FROM_CART,
} from './types'

export const addItemToCart = (item) => dispatch => {
    dispatch({
        type: ADD_ITEM_TO_CART,
        payload: item
    })
}
export const deleteItemFromCart = item => dispatch => {
    dispatch({
        type: DELETE_ITEM_FROM_CART,
        payload: item
    })
}
export const clearCart = () => dispatch => {
    dispatch({
        type: CLEAR_CART
    })
}
