import {
    CLEAR_CART,
    ADD_ITEM_TO_CART,
    DELETE_ITEM_FROM_CART
} from "../actions/client/types"
// {
// type: "ADD_ITEM_TO_CART",
// payload: {id:1, name:'123', price:1}
// }
// {
// type: "DELETE_ITEM_FROM_CART",
// payload: {id:1}
// }
const createItem = item => {
    return {
        id: item.id,
        name: item.name,
        price: item.price,
        totalPrice: item.price,
        count: 1
    }
}
const updateItem = (item, count) => {
    return {
        id: item.id,
        name: item.name,
        price: item.price,
        totalPrice: item.totalPrice + item.price * count,
        count: item.count + count
    }
}
const updateCarItems = (cartItems, item, idx, count) => {
    let cart
    if (idx === -1) {
        cart = [
            ...cartItems,
            createItem(item)
        ]
        localStorage.setItem('cart', JSON.stringify(cart))
    } else {
        if (item.count + count === 0) {
            cart = [
                ...cartItems.slice(0, idx),
                ...cartItems.slice(idx + 1)
            ]
        } else {
            cart = [
                ...cartItems.slice(0, idx),
                updateItem(item, count),
                ...cartItems.slice(idx + 1)
            ]
        }
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    const total = cart.reduce((sum, {totalPrice}) => sum + totalPrice, 0)
    localStorage.setItem('cartTotal', JSON.stringify(total))
    return {
        cart,
        total
    }
}
const findAndUpdateOrCreateItem = (state, item, count) => {
    const itemFromCart = state.cart.find(cartItem => cartItem.id === item.id)
    const idx = state.cart.findIndex(cartItem => cartItem.id === item.id)
    if (idx > -1) {
        // Exists
        return {
            ...state,
            ...updateCarItems(state.cart, itemFromCart, idx, count)
        }
    } else {
        // New
        return {
            ...state,
            ...updateCarItems(state.cart, item, idx, count),

        }
    }
}
const initialValues = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    total: JSON.parse(localStorage.getItem('cartTotal')) || 0
}
const updateShoppingCart = (state = initialValues, action) => {
    const {type, payload} = action
    switch (type) {
        case ADD_ITEM_TO_CART:
            return findAndUpdateOrCreateItem(state, payload, 1)
        case DELETE_ITEM_FROM_CART:
            return findAndUpdateOrCreateItem(state, payload, -1)
        case CLEAR_CART:
            localStorage.setItem('cart', JSON.stringify([]))
            localStorage.setItem('cartTotal', JSON.stringify(0))
            return {
                ...state,
                cart: [],
                total: 0
            }
        default:
            return state
    }
}
export default updateShoppingCart