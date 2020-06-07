import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import SpinnerLinear from "../../layout/SpinnerLinear"
import alert from '../../../utils/alert'
import Pagination from "../../layout/Pagination"
import {getGoods} from "../../../actions/admin/goods"
import {addItemToCart} from "../../../actions/client/cart"

const Goods = ({
                   getGoods,
                   addItemToCart,
                   goods: {loading, goods: {docs, totalPages, page, limit}},
                   match
               }) => {
    useEffect(() => {
        getGoods(match.params.page)
    }, [getGoods, match.params.page])
    const onGoodAddToCartClick = doc => {
        addItemToCart({id: doc._id, name: doc.name, price: doc.price})
        alert('Товар добавлен', 'green')
    }

    return loading ? <SpinnerLinear/> : (
        <>
            <div className="container">
                <div className="row">
                    <div className='col'>
                        <div className="card-columns">

                            {docs.map((doc, i) => {
                                return (
                                    <div className="card" key={doc._id}>
                                        <div className="card-image">
                                            <img
                                                alt="good"
                                                src={`/${doc.images[0]}`}/>
                                            <span className="card-title">{doc.name}</span>
                                            <a href="#!" onClick={() => onGoodAddToCartClick(doc)}
                                               className="btn-floating halfway-fab waves-effect waves-light red">
                                                <i className="material-icons">add_shopping_cart</i></a>
                                        </div>
                                        <div className="card-content">
                                            <b>{doc.category.name}</b>
                                            <p>Цена: {doc.price} ₽</p>
                                            <p>{doc.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="row row-center">
                    <div className="col">
                        <Pagination
                            path={'/goods'}
                            totalPages={totalPages}
                            currentPage={page}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

Goods.propTypes = {
    getGoods: PropTypes.func.isRequired,
    addItemToCart: PropTypes.func.isRequired,
    goods: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    goods: state.goods
})
export default connect(
    mapStateToProps,
    {getGoods, addItemToCart}
)(Goods)
