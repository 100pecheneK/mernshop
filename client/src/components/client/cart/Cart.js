import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {addItemToCart, clearCart, deleteItemFromCart} from "../../../actions/client/cart"
import {Link} from "react-router-dom"
import alert from '../../../utils/alert'

const Cart = ({addItemToCart, deleteItemFromCart, clearCart, cart}) => {
    const onItemAdded = id => {
        alert('Товар добавлен', 'green')
        addItemToCart({id})
    }
    const onItemDeleted = id => {
        alert('Товар удалён', 'green')
        deleteItemFromCart({id})
    }
    const onCartSubmit = ()=>{
        alert('Спасибо за покупку!', 'purple')
    }
    const cartTable = cart.cart.length ? (
        <div className='container'>
            <div className="row">
                <div className="col">
                    <h2 className="header">Ваша корзина</h2>
                    <div className="card horizontal">
                        <div className="card-stacked">
                            <div className="card-content">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Название</th>
                                        <th>Количество</th>
                                        <th>Стоимость</th>
                                        <th/>
                                        <th>
                                            <button onClick={clearCart}
                                                    className="waves-effect waves-light btn red">
                                                <i
                                                    className="material-icons">delete</i>
                                            </button>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cart.cart.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.count}</td>
                                            <td>{item.totalPrice} ₽</td>
                                            <td>
                                                <a onClick={() => onItemAdded(item.id)}
                                                   href="#!"
                                                   className="waves-effect waves-light btn green"><i
                                                    className="material-icons">add</i></a>
                                            </td>
                                            <td>
                                                <a onClick={() => onItemDeleted(item.id)}
                                                   href="#!"
                                                   className="waves-effect waves-light btn red"><i
                                                    className="material-icons">remove</i></a>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-action">
                                <button
                                    onClick={onCartSubmit}
                                    className="waves-effect waves-light btn blue">Купить
                                    за <b>{cart.total} ₽</b>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <>
            <h2>Ваша корзина пуста</h2>
            <Link to='/goods' className="waves-effect waves-light btn pink lighten-2">К покупкам!</Link>
        </>
    )
    return (
        <div className='container'>
            <div className="row">
                <div className="col">
                    {cartTable}
                </div>
            </div>
        </div>
    )
}

Cart.propTypes = {
    addItemToCart: PropTypes.func.isRequired,
    deleteItemFromCart: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
    cart: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    cart: state.cart
})
export default connect(
    mapStateToProps,
    {addItemToCart, deleteItemFromCart, clearCart}
)(Cart)
