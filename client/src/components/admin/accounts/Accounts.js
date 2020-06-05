import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import SpinnerLinear from "../../layout/SpinnerLinear"
import Pagination from "../../layout/Pagination"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {deleteUser, getUsers} from "../../../actions/admin/users"
import Spinner from "../../layout/Spinner"
import Header from "../Header/Header"

const Accounts = ({
                      match, getUsers, deleteUser,
                      users: {loading, users: {docs, totalPages, page, limit}}
                  }) => {

    useEffect(() => {
        getUsers(match.params.page)
    }, [getUsers, match.params.page])

    return (
        <>
            <Header title='Аккаунты' link='/admin/accounts/create' linkName='Создать аккаунт'/>
            <button className='waves-effect waves-light btn red lighten-5 black-text'
                    onClick={() => getUsers(match.params.page)}>
                <i className="material-icons">sync</i></button>
            {loading ? <SpinnerLinear/> :
                (
                    <>
                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Имя</th>
                                <th>Email</th>
                                <th>Статус</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>

                            {docs.length && docs.map((doc, i) => (
                                <tr key={doc._id}>
                                    <td>{(i + 1) + limit * (page - 1)}</td>
                                    <td>{doc.name}</td>
                                    <td>{doc.email}</td>
                                    <td>{doc.isAdmin ? 'Админ' : 'Сотрудник'}</td>
                                    <td><a className="waves-effect waves-light btn red"
                                           onClick={() => deleteUser(doc._id)}
                                    >Удалить</a>
                                    </td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                        <Pagination
                            path={'/admin/accounts/list'}
                            totalPages={totalPages}
                            currentPage={page}
                        />
                    </>
                )}
        </>
    )
}


Accounts.propTypes = {
    getUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    users: state.users
})

export default connect(
    mapStateToProps,
    {getUsers, deleteUser}
)(Accounts)
