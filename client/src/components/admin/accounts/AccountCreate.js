import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from "react-router-dom"
import alert from '../../../utils/alert'
import PropTypes from 'prop-types'
import {createUser} from "../../../actions/admin/users"

const AccountCreate = ({createUser}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault()
        if (password !== password2) {
            alert('Пароли не совпадают', 'red')
        } else {
            createUser({name, email, password})
        }
    }

    return (
        <>
            <p className="lead"><i className="fas fa-user"/> Создание аккаунта</p>
            <form onSubmit={onSubmit} className="form">
                <div className="form-group">
                    <input
                        value={name}
                        name='name'
                        onChange={onChange}
                        type="text"
                        placeholder="Имя"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        value={email}
                        name='email'
                        onChange={onChange}
                        type="email"
                        placeholder="Электронная почта"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        value={password}
                        name='password'
                        onChange={onChange}
                        type="password"
                        placeholder="Пароль"
                        minLength="6"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        value={password2}
                        name='password2'
                        onChange={onChange}
                        type="password"
                        placeholder="Подтвердите пароль"
                        minLength="6"
                        required
                    />
                </div>
                <input type="submit" value="Регистрация" className="btn btn-primary"/>
            </form>
        </>
    )
}

AccountCreate.propTypes = {
    createUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(
    mapStateToProps,
    {createUser}
)(AccountCreate)
