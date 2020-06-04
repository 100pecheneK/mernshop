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
import {createGood, editGood, getGood, resetUpload} from "../../../actions/admin/goods"
import ProgressBar from "../../layout/ProgressBar"
import {getAllCategories} from "../../../actions/admin/categories"
import Spinner from "../../layout/Spinner"

const GoodCreate = ({editGood, good, loading, upload, match, getGood, resetUpload, getAllCategories, categories: {allCategories: categories, loading: categoriesLoading}}) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        goodNumber: '',
        price: '',
        count: ''
    })
    const [images, setImages] = useState('')
    const [imagesPreview, setImagesPreview] = useState('')
    const {
        name,
        category,
        description,
        goodNumber,
        price,
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
    }, [getAllCategories])

    useEffect(() => {
        getGood(match.params.id)
    }, [getGood, match.params.id])

    useEffect(() => {
        console.log(categoriesLoading, loading)
        if (!categoriesLoading && !loading) {
            setFormData(prev => ({
                ...prev,
                category: !good.category ? '' : good.category._id,
            }))
            const timer = setTimeout(() => {
                window.M.FormSelect.init(document.querySelectorAll('select'))
            }, 0)

            return () => {
                clearTimeout(timer)
            }
        }

    }, [categoriesLoading, loading])
    useEffect(() => {
        if (!loading && !categoriesLoading) {
            setFormData(prev => ({
                ...prev,
                name: !good.name ? '' : good.name,
                description: !good.description ? '' : good.description,
                goodNumber: !good.goodNumber ? '' : good.goodNumber,
                category: !good.category ? '' : good.category._id,
                price: !good.price ? '' : good.price,
                count: !good.count ? '' : good.count,
            }))
            setImagesPreview(!good.images ? '' : good.images)
        }
    }, [loading, good, categoriesLoading])
    useEffect(() => {
        if (imagesPreview.length) {
            window.M.Carousel.init(document.querySelectorAll('.carousel'), {noWrap: true})
        }
    }, [imagesPreview])
    const onSubmit = async e => {
        editGood({
            name,
            category,
            price,
            count,
            goodNumber,
            description,
            images
        }, match.params.id)
    }
    return (
        <>
            {loading && <SpinnerLinear/>}
            <Header title='Редактирование товара' link='/admin/goods/list' linkName='Назад'/>
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
                            value={price}
                            name='price'
                            type='number'
                            placeholder='Цена'
                            onChange={onChange}
                            s={6}/>
                        <InputField
                            value={count}
                            type='number'
                            name='count'
                            placeholder='Количество'
                            onChange={onChange}
                            s={6}/>
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
                        <div className="s12">
                            <div className="carousel">
                                {imagesPreview ? imagesPreview.map((img, i) => (
                                    <a className="carousel-item" key={i}><img
                                        src={`/${img}`} alt="good"/></a>
                                )) : <Spinner/>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <InputField
                            classes="files"
                            type="file"
                            multiple
                            req={false}
                            onChange={onChangeImages}
                        />
                        <ProgressBar progress={Math.round(upload, 2)}/>
                    </div>
                    <input type="submit" value="Изменить" className="btn btn-primary"/>
                </Form>
            </div>

        </>
    )
}

GoodCreate.propTypes = {
    editGood: PropTypes.func.isRequired,
    resetUpload: PropTypes.func.isRequired,
    getAllCategories: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    good: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    good: state.goods.good,
    loading: state.goods.createLoading,
    upload: state.goods.upload,
    categories: state.categories
})
export default connect(
    mapStateToProps,
    {editGood, getGood, resetUpload, getAllCategories}
)(GoodCreate)
