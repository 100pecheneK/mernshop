import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import Header from "../Header/Header"
import SpinnerLinear from "../../layout/SpinnerLinear"
import Pagination from "../../layout/Pagination"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {deleteCategory, getCategories} from "../../../actions/admin/categories"

const Categories = ({
                        match, getCategories, deleteCategory,
                        categories: {loading, categories: {docs, totalPages, page, limit}}
                    }) => {

    useEffect(() => {
        getCategories(match.params.page)
    }, [getCategories, match.params.page])

    return (
        <>
            <Header title='Категории' link='/admin/categories/create' linkName='Создать категорию'/>
            <button className='waves-effect waves-light btn red lighten-5 black-text'
                    onClick={() => getCategories(match.params.page)}>
                <i className="material-icons">sync</i></button>
            {loading || !docs ? <SpinnerLinear/> :
                (
                    <>
                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Название</th>
                                <th/>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>

                            {docs.map((doc, i) => (
                                <tr key={doc._id}>
                                    <td>{(i + 1) + limit * (page - 1)}</td>
                                    <td>{doc.name}</td>
                                    <td><Link
                                        to={`/admin/categories/${doc._id}`}
                                        className="waves-effect waves-light btn blue"
                                    ><i className="material-icons prefix">edit</i></Link></td>
                                    <td><a className="waves-effect waves-light btn red"
                                           onClick={() => deleteCategory(doc._id)}
                                    ><i className="material-icons prefix">delete</i></a>
                                    </td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                        <Pagination
                            path={'/admin/categories/list'}
                            totalPages={totalPages}
                            currentPage={page}
                        />
                    </>
                )}
        </>
    )
}

Categories.propTypes = {
    getCategories: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    categories: state.categories
})

export default connect(
    mapStateToProps,
    {getCategories, deleteCategory}
)(Categories)