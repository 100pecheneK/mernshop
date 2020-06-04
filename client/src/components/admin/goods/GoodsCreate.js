import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from "react-router-dom"
import alert from '../../../utils/alert'
import PropTypes from 'prop-types'
import {createUser} from "../../../actions/admin/users"
import Header from "../Header/Header"
import Form from "../../layout/Form"
import {InputField} from "../../layout/Fields"
import SpinnerLinear from "../../layout/SpinnerLinear"
import {createGood, resetUpload} from "../../../actions/admin/goods"
import ProgressBar from "../../layout/ProgressBar"
import {getAllCategories} from "../../../actions/admin/categories"
import Spinner from "../../layout/Spinner"

const GoodCreate = ({createGood, loading, upload, resetUpload, getAllCategories, categories: {allCategories: categories, loading: categoriesLoading}}) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        goodNumber: '',
        count: ''
    })
    const [images, setImages] = useState('')
    const {
        name,
        category,
        description,
        price,
        goodNumber,
        count,
    } = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const checkMimeType = (e) => {
        let files = e.target.files
        let err = []
        const types = ['image/png', 'image/jpeg']
        for (let x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                err[x] = files[x].type + ' не поддерживаемый формат\n'
            }
        }
        for (let z = 0; z < err.length; z++) {
            alert(err[z])
            e.target.value = null
        }
        return true
    }
    const maxSelectFile = (e) => {
        let files = e.target.files
        if (files.length > 5) {
            const msg = 'Можно загрузить только 5 изображения'
            e.target.value = null
            alert(msg, 'red')
            return false
        }
        return true
    }
    const checkFileSize = (e) => {
        let files = e.target.files
        let size = 2000000
        let err = []
        for (let x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                err[x] = files[x].type + 'слишком больше изобрежние\n'
            }
        }
        for (let z = 0; z < err.length; z++) {
            alert(err[z], 'red')
            e.target.value = null
        }
        return true
    }
    const onChangeImages = e => {
        if (maxSelectFile(e) && checkMimeType(e) && checkFileSize(e)) {
            setImages(e.target.files)
            resetUpload(0)
        }
    }
    useEffect(() => {
        window.M.updateTextFields()
        getAllCategories()
    }, [])

    useEffect(() => {
        if (!categoriesLoading) {
            window.M.FormSelect.init(document.querySelectorAll('select'))
        }
    }, [categoriesLoading])

    const onSubmit = async e => {
        createGood({
            name,
            category,
            goodNumber,
            price,
            count,
            description,
            images
        })
    }
    return (
        <>
            {loading && <SpinnerLinear/>}
            <Header title='Создание товара' link='/admin/goods/list' linkName='Назад'/>
            <div className="row">
                <Form onSubmit={onSubmit} className="col s12">
                    <div className="row">
                        <InputField
                            value={name}
                            name='name'
                            placeholder='Название'
                            onChange={onChange}
                            s={6}/>
                        <div className="input-field col s6">
                            <select value={category} name='category' onChange={onChange}>
                                <option value="" disabled>Выберите категорию</option>
                                {
                                    (!categoriesLoading && categories.length) &&
                                    <>
                                        {categories.map(cat => {
                                            return (
                                                <option
                                                    key={cat._id}
                                                    value={cat._id}
                                                >
                                                    {cat.name}
                                                </option>
                                            )
                                        })}
                                    </>
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <InputField
                            value={goodNumber}
                            name='goodNumber'
                            type='number'
                            placeholder='Номер'
                            onChange={onChange}
                            s={4}/>
                        <InputField
                            value={price}
                            name='price'
                            type='number'
                            placeholder='Цена'
                            onChange={onChange}
                            s={4}/>
                        <InputField
                            value={count}
                            type='number'
                            name='count'
                            placeholder='Количество'
                            onChange={onChange}
                            s={4}/>
                    </div>
                    <div className="row">
                        <InputField
                            value={description}
                            name='description'
                            textarea={true}
                            placeholder='Описание'
                            onChange={onChange}
                        />
                    </div>
                    <div className="row">
                        <InputField
                            classes="files"
                            type="file"
                            multiple
                            onChange={onChangeImages}
                        />
                        <ProgressBar progress={Math.round(upload, 2)}/>

                    </div>
                    <input type="submit" value="Создать" className="btn btn-primary"/>
                </Form>
            </div>

        </>
    )
}

GoodCreate.propTypes = {
    createGood: PropTypes.func.isRequired,
    resetUpload: PropTypes.func.isRequired,
    getAllCategories: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    categories: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    loading: state.goods.createLoading,
    upload: state.goods.upload,
    categories: state.categories
})
export default connect(
    mapStateToProps,
    {createGood, resetUpload, getAllCategories}
)(GoodCreate)
