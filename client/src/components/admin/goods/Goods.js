import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import Header from "../Header/Header"
import SpinnerLinear from "../../layout/SpinnerLinear"
import Pagination from "../../layout/Pagination"
import {connect} from "react-redux"
import {deleteGood, getGoods} from "../../../actions/admin/goods"
import {Link} from "react-router-dom"

const Goods = ({
                   match, getGoods, deleteGood,
                   goods: {loading, goods: {docs, totalPages, page, limit}}
               }) => {
    useEffect(() => {
        getGoods(match.params.page)
    }, [getGoods, match.params.page])

    return (
        <>
            <Header title='Товары' link='/admin/goods/create' linkName='Создать товар'/>
            <button className='waves-effect waves-light btn red lighten-5 black-text'
                    onClick={() => getGoods(match.params.page)}>
                <i className="material-icons">sync</i></button>
            {
                loading || !docs ? <SpinnerLinear/> :
                    <>
                        <table>
                            <thead>
                            <tr>
                                <th>Номер</th>
                                <th>Название</th>
                                <th>Категория</th>
                                <th>Цена</th>
                                <th>Количество</th>
                                <th/>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>

                            {docs.map((doc, i) => (
                                <tr key={doc._id}>
                                    <td>{doc.goodNumber}</td>
                                    <td>{doc.name}</td>
                                    <td>{doc.category.name}</td>
                                    <td>{doc.price}</td>
                                    <td>{doc.count}</td>
                                    <td><Link
                                        to={`/admin/goods/${doc._id}`}
                                        className="waves-effect waves-light btn blue"
                                    ><i className="material-icons prefix">edit</i></Link></td>
                                    <td><a href="#!" className="waves-effect waves-light btn red"
                                           onClick={() => deleteGood(doc._id)}
                                    ><i className="material-icons prefix">delete</i></a>
                                    </td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                        <Pagination
                            path={'/admin/goods/list'}
                            totalPages={totalPages}
                            currentPage={page}
                        />
                    </>
            }
        </>
    )
}

Goods.propTypes = {
    getGoods: PropTypes.func.isRequired,
    deleteGood: PropTypes.func.isRequired,
    goods: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    goods: state.goods
})

export default connect(
    mapStateToProps,
    {getGoods, deleteGood}
)(Goods)