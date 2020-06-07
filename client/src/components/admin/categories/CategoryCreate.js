import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import SpinnerLinear from "../../layout/SpinnerLinear"
import Header from "../Header/Header"
import Form from "../../layout/Form"
import {InputField} from "../../layout/Fields"
import {connect} from "react-redux"
import {createCategory} from "../../../actions/admin/categories"


const CategoryCreate = ({createCategory, loading}) => {
    const [formData, setFormData] = useState({
        name: ''
    })

    const {name} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const onSubmit = async e => {
        createCategory({name})
    }

    return (
        <>
            <Header title='Создание категории' link='/admin/categories/list' linkName='Назад'/>
            {loading && <SpinnerLinear/>}
            <div className="row">
                <Form onSubmit={onSubmit} className="col s12">
                    <div className="row">
                        <InputField
                            value={name}
                            name='name'
                            onChange={onChange}
                            type="text"
                            s={6}
                            placeholder="Название"
                            required={true}
                        />
                    </div>
                    <input type="submit" value="Создать" className="btn btn-primary"/>
                </Form>
            </div>

        </>
    )
}

CategoryCreate.propTypes = {
    createCategory: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    loading: state.categories.createLoading
})
export default connect(
    mapStateToProps,
    {createCategory}
)(CategoryCreate)

