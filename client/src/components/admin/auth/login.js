import React, {useState} from 'react'
import {Redirect} from "react-router-dom"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {login} from "../../../actions/admin/auth"

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = async e => {
        e.preventDefault()
        login(email, password)
    }

    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/admin'/>
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <p className="lead"><i className="fas fa-user"/> Войдите в свой аккаунт</p>
                    <form onSubmit={onSubmit} className="form">
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
                        <input type="submit" value="Войти" className="btn btn-primary"/>
                    </form>
                </div>
            </div>
        </>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    {login}
)(Login)
