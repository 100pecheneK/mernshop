import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Header from "../Header/Header"
import Form from "../../layout/Form"
import {InputField} from "../../layout/Fields"
import SpinnerLinear from "../../layout/SpinnerLinear"
import {editGood, getGood, resetUpload} from "../../../actions/admin/goods"
import ProgressBar from "../../layout/ProgressBar"
import {getAllCategories} from "../../../actions/admin/categories"
import Spinner from "../../layout/Spinner"
import {checkFileSize, checkMimeType, maxSelectFile} from "../../../utils/upload"

const GoodEdit = ({editGood, good, loading, upload, match, getGood, resetUpload, getAllCategories, categories: {allCategories: categories, loading: categoriesLoading}}) => {
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
    const [fileClasses, setFileClasses] = useState('')
    const {
        name,
        category,
        description,
        goodNumber,
        price,
        count,
    } = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onChangeImages = e => {
        if (maxSelectFile(e) && checkMimeType(e) && checkFileSize(e)) {
            setImages(e.target.files)
            resetUpload(0)
        }
    }
    useEffect(() => {
        getAllCategories()
    }, [getAllCategories])

    useEffect(() => {
        getGood(match.params.id)
    }, [getGood, match.params.id])

    useEffect(() => {
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

    }, [categoriesLoading, loading, good])
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
            <Header title='Редактирование товара' link='/admin/goods/list' linkName='Назад'/>
            {loading && <SpinnerLinear/>}
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
                                    <a href="#!" className="carousel-item" key={i}><img
                                        src={`/${img}`} alt="good"/></a>
                                )) : <Spinner/>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <InputField
                            classes={`files ${fileClasses}`}
                            type="file"
                            multiple
                            req={false}
                            onDragEnter={() => {
                                setFileClasses('files-enter')
                            }}
                            onDrop={() => {
                                setFileClasses('files-in')
                            }}
                            onDragLeave={() => {
                                setFileClasses('')
                            }}
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

GoodEdit.propTypes = {
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
)(GoodEdit)
