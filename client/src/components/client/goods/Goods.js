import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Header from "../home/Header"
import {getSettings} from "../../../actions/admin/settings"
import {connect} from "react-redux"
import SpinnerLinear from "../../layout/SpinnerLinear"
import alert from '../../../utils/alert'
import Pagination from "../../layout/Pagination"
import {getGoods} from "../../../actions/admin/goods"
import {LazyLoadImage} from 'react-lazy-load-image-component'
import Masonry from 'masonry-layout'
import StackGrid from "react-stack-grid"
import AutoResponsive from 'autoresponsive-react'
import ProgressiveImage from "./ProgressiveImage"

const Goods = ({
                   getGoods,
                   goods: {loading, goods: {docs, totalPages, page, limit}},
                   match
               }) => {
    // const [msnry, setMsnry] = useState('')
    useEffect(() => {
        getGoods(match.params.page)
    }, [getGoods, match.params.page])
    const onGoodAddToCartClick = () => {
        alert('Товар добавлен', 'green')
    }
    // useEffect(() => {
    //     if (!loading) {
    //         const m = new Masonry('.grid', {
    //             itemSelector: '.grid-item',
    //             initLayout: false,
    //         })
    //         setMsnry(m)
    //     }
    // }, [loading])
    //

    const [grid, setGrid] = useState('')

    const resizeGrid = () => {
        if (!loading) {
            grid.updateLayout()
        }
    }
    return loading ? <SpinnerLinear/> : (
        <>
            <div className="container">
                <div className="row">
                    <StackGrid
                        columnWidth={300}
                        gridRef={grid => setGrid(grid)}
                    >
                        {docs.map((doc, i) => {
                            return (
                                <div className="card" key={doc._id}>
                                    <div className="card-image">
                                        <img
                                            onLoad={() => resizeGrid()}
                                            alt="good"
                                            src={`/${doc.images[0]}`}/>
                                        <span className="card-title">{doc.name}</span>
                                        <a onClick={() => onGoodAddToCartClick(i)}
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
                    </StackGrid>
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
    goods: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    goods: state.goods
})
export default connect(
    mapStateToProps,
    {getGoods}
)(Goods)
