import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import SpinnerLinear from "../../layout/SpinnerLinear"
import Pagination from "../../layout/Pagination"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {getUsers} from "../../../actions/admin/users"
import Spinner from "../../layout/Spinner"

const Accounts = ({
                      match, getUsers,
                      users: {loading, users: {docs, totalPages, page, totalDocs, limit}}
                  }) => {
    useEffect(() => {
        getUsers(match.params.page)
    }, [getUsers, match.params.page])


    return (
        <>
            <Link to='/admin/accounts/create'>Создать аккаунт</Link>
            {loading ? <Spinner/> :
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

                            {docs.map((doc, i) => (
                                <tr key={doc._id}>
                                    <td>{(i + 1) + limit * (page - 1)}</td>
                                    <td>{doc.name}</td>
                                    <td>{doc.email}</td>
                                    <td>{doc.isAdmin ? 'Админ' : 'Сотрудник'}</td>
                                    <td><a className="waves-effect waves-light btn red">Удалить</a>
                                    </td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                        <Pagination
                            path={'/admin/accounts'}
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
    users: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    users: state.users
})

export default connect(
    mapStateToProps,
    {getUsers}
)(Accounts)
