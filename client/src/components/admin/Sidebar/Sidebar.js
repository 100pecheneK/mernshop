import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {logout} from "../../../actions/admin/auth"
import SpinnerLinear from "../../layout/SpinnerLinear"

const Sidebar = ({logout, auth: {loading, user}}) => {

    return loading ? <SpinnerLinear/> : (
        <ul className="sidenav sidenav-fixed">
            <li>
                <Link to='/'>На сайт</Link>
            </li>
            <li>
                <Link to='/admin'>Главная</Link>
            </li>
            {user?.isAdmin &&
            <li>
                <Link to='/admin/accounts/list'>Аккаунты</Link>
            </li>
            }
            <li>
                <Link to='/admin/goods/list'>Товары</Link>
            </li>
            <li>
                <Link to='/admin/categories/list'>Категории</Link>
            </li>
            {user?.isAdmin &&
            <li>
                <Link to='/admin/settings'>Настройки</Link>
            </li>
            }
            <li>
                <a href="#!" onClick={logout}>Выйти</a>
            </li>
        </ul>
    )
}

Sidebar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(
    mapStateToProps,
    {logout}
)(Sidebar)
