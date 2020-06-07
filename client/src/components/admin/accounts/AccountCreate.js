import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import alert from '../../../utils/alert'
import PropTypes from 'prop-types'
import {createUser} from "../../../actions/admin/users"
import Header from "../Header/Header"
import Form from "../../layout/Form"
import {InputField} from "../../layout/Fields"
import SpinnerLinear from "../../layout/SpinnerLinear"

const AccountCreate = ({createUser, loading}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        isAdmin: '',
    })

    const {name, email, isAdmin, password, password2} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const onSubmit = async e => {
        if (password !== password2) {
            alert('Пароли не совпадают', 'red')
        } else {
            createUser({name, email, isAdmin, password})
        }
    }

    return (
        <>
            <Header title='Создание аккаунта' link='/admin/accounts/list' linkName='Назад'/>
            {loading && <SpinnerLinear/>}
            <div className="row">
                <Form onSubmit={onSubmit} className="col s12">
                    <div className="row">
                        <InputField
                            value={name}
                            name='name'
                            onChange={onChange}
                            type="text"
                            placeholder="Имя"
                            required={true}
                            s={8}
                            icon='account_circle'
                        />
                         <div className='input-field col s4'>
                                <label>
                                    <input
                                        type="checkbox"
                                        name='isAdmin'
                                        onChange={onChange}/>
                                    <span>Админ</span>
                                </label>
                            </div>
                        <InputField
                            name='email'
                            onChange={onChange}
                            type="email"
                            placeholder="Электронная почта"
                            required
                            icon='email'
                        />
                    </div>
                    <div className="row">
                        <InputField
                            value={password}
                            name='password'
                            onChange={onChange}
                            type="password"
                            placeholder="Пароль"
                            minLength="6"
                            required
                            s='6'
                            icon='lock'
                        />
                        <InputField
                            value={password2}
                            name='password2'
                            onChange={onChange}
                            type="password"
                            placeholder="Подтвердите пароль"
                            minLength="6"
                            required
                            s='6'
                            icon='lock'
                        />
                    </div>
                    <input type="submit" value="Создать" className="btn btn-primary"/>
                </Form>
            </div>

        </>
    )
}

AccountCreate.propTypes = {
    createUser: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    loading: state.users.createLoading
})
export default connect(
    mapStateToProps,
    {createUser}
)(AccountCreate)
