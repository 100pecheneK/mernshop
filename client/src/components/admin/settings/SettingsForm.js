import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {InputField} from "../../layout/Fields"
import ProgressBar from "../../layout/ProgressBar"
import Form from "../../layout/Form"
import Header from "../Header/Header"
import {checkMimeType, maxSelectFile} from "../../../utils/upload"
import {resetUpload} from "../../../actions/admin/settings"

const SettingsForm = ({initialValues, loading, onSubmit, resetUpload, upload}) => {
    const [formData, setFormData] = useState({
        shotTitle: '',
        title: '',
        image1_text: '',
        image2_text: '',
        contactUs: '',
        contactUs_text: '',
        image3_text: '',
        about: '',
        youtube: '',
        twitter: '',
        facebook: '',
        instagram: '',
        vkontakte: '',
        advantage1: '',
        advantage1_text: '',
        icon1: '',
        advantage2: '',
        advantage2_text: '',
        icon2: '',
        advantage3: '',
        advantage3_text: '',
        icon3: '',
    })
    const [image1, setImage1] = useState('')
    const [image1Preview, setImage1Preview] = useState('')
    const [image2, setImage2] = useState('')
    const [image2Preview, setImage2Preview] = useState('')
    const [image3, setImage3] = useState('')
    const [image3Preview, setImage3Preview] = useState('')
    const [file1Classes, setFile1Classes] = useState('')
    const [file2Classes, setFile2Classes] = useState('')
    const [file3Classes, setFile3Classes] = useState('')
    const {
        shotTitle,
        title,
        image1_text,
        image2_text,
        contactUs,
        contactUs_text,
        image3_text,
        about,
        youtube,
        twitter,
        facebook,
        instagram,
        vkontakte,
        advantage1,
        advantage1_text,
        icon1,
        advantage2,
        advantage2_text,
        icon2,
        advantage3,
        advantage3_text,
        icon3,
    } = formData
    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    const onChangeImages = e => {
        if (maxSelectFile(e) && checkMimeType(e)) {
            switch (e.target.name) {
                case 'image1':
                    setImage1(e.target.files)
                    break
                case 'image2':
                    setImage2(e.target.files)
                    break
                case 'image3':
                    setImage3(e.target.files)
                    break
                default:
                    break
            }
            resetUpload(0)
        }
    }
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onsubmit = async e => {
        onSubmit({
            ...formData,
            image1,
            image2,
            image3,
        })
    }

    useEffect(() => {
        if (image1Preview || image2Preview || image3Preview) {
            window.M.Carousel.init(document.querySelectorAll('.carousel'), {noWrap: true})
        }
    }, [image1Preview, image2Preview, image3Preview])
    useEffect(() => {
        if (!loading) {
            setFormData(prev => ({
                ...prev,
                shotTitle: initialValues?.shotTitle || '',
                title: initialValues?.title || '',
                image1_text: initialValues?.image1_text || '',
                image2_text: initialValues?.image2_text || '',
                contactUs: initialValues?.contactUs || '',
                contactUs_text: initialValues?.contactUs_text || '',
                image3_text: initialValues?.image3_text || '',
                about: initialValues?.about || '',
                youtube: initialValues?.links?.youtube || '',
                twitter: initialValues?.links?.twitter || '',
                facebook: initialValues?.links?.facebook || '',
                instagram: initialValues?.links?.instagram || '',
                vkontakte: initialValues?.links?.vkontakte || '',
                advantage1: initialValues?.advantages?.advantage1 || '',
                advantage1_text: initialValues?.advantages?.advantage1_text || '',
                icon1: initialValues?.advantages?.icon1 || '',
                advantage2: initialValues?.advantages?.advantage2 || '',
                advantage2_text: initialValues?.advantages?.advantage2_text || '',
                icon2: initialValues?.advantages?.icon2 || '',
                advantage3: initialValues?.advantages?.advantage3 || '',
                advantage3_text: initialValues?.advantages?.advantage3_text || '',
                icon3: initialValues?.advantages?.icon3 || '',
            }))
            setImage1Preview(initialValues?.image1 || '')
            setImage2Preview(initialValues?.image2 || '')
            setImage3Preview(initialValues?.image3 || '')
        }
    }, [initialValues, loading])
    return (
        <>
            <Header title={`${initialValues ? 'Изменение' : 'Создание'} настроек`}/>
            <div className="row">
                <Form onSubmit={onsubmit} className="col s12">
                    <InputField
                        value={shotTitle}
                        name='shotTitle'
                        placeholder='Короткое название'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    <InputField
                        value={title}
                        name='title'
                        placeholder='Длинное название'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    <InputField
                        value={image1_text}
                        name='image1_text'
                        placeholder='Текст на первом изображении'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    {
                        image1Preview &&
                        <div className="row">
                            <div className="s12">
                                <div className="carousel">
                                    <a href="#!" className="carousel-item">
                                        <img src={`/${image1Preview}`} alt="settings"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="row">
                        <InputField
                            classes={`files ${file1Classes}`}
                            type="file"
                            req={false}
                            onDragEnter={() => {
                                setFile1Classes('files-enter')
                            }}
                            onDrop={() => {
                                setFile1Classes('files-in')
                            }}
                            onDragLeave={() => {
                                setFile1Classes('')
                            }}
                            name='image1'
                            onChange={onChangeImages}
                        />
                    </div>
                    <InputField
                        value={advantage1}
                        name='advantage1'
                        placeholder='Преимущество 1'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    <InputField
                        value={advantage1_text}
                        textarea={true}
                        name='advantage1_text'
                        placeholder='Описание преимущества 1'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    <InputField
                        value={icon1}
                        name='icon1'
                        placeholder='Иконка 1'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    <InputField
                        value={advantage2}
                        name='advantage2'
                        placeholder='Преимущество 2'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    <InputField
                        value={advantage2_text}
                        textarea={true}
                        name='advantage2_text'
                        placeholder='Описание преимущества 2'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    <InputField
                        value={icon2}
                        name='icon2'
                        placeholder='Иконка 2'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    <InputField
                        value={advantage3}
                        name='advantage3'
                        placeholder='Преимущество 3'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    <InputField
                        value={advantage3_text}
                        textarea={true}
                        name='advantage3_text'
                        placeholder='Описание преимущества 3'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    <InputField
                        value={icon3}
                        name='icon3'
                        placeholder='Иконка 3'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    <InputField
                        value={image2_text}
                        name='image2_text'
                        placeholder='Текст на втором изображении'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    {
                        image2Preview &&
                        <div className="row">
                            <div className="s12">
                                <div className="carousel">
                                    <a href="#!" className="carousel-item">
                                        <img src={`/${image2Preview}`} alt="settings"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="row">
                        <InputField
                            classes={`files ${file2Classes}`}
                            type="file"
                            req={false}
                            onDragEnter={() => {
                                setFile2Classes('files-enter')
                            }}
                            onDrop={() => {
                                setFile2Classes('files-in')
                            }}
                            onDragLeave={() => {
                                setFile2Classes('')
                            }}
                            name='image2'
                            onChange={onChangeImages}
                        />
                    </div>
                    <InputField
                        value={contactUs}
                        name='contactUs'
                        placeholder='Дополнительный текст заголовок'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    <InputField
                        value={contactUs_text}
                        name='contactUs_text'
                        placeholder='Дополнительный текст'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    <InputField
                        value={image3_text}
                        name='image3_text'
                        placeholder='Текст на третьем изображении'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    {
                        image3Preview &&
                        <div className="row">
                            <div className="s12">
                                <div className="carousel">
                                    <a href="#!" className="carousel-item">
                                        <img src={`/${image3Preview}`} alt="settings"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="row">
                        <InputField
                            classes={`files ${file3Classes}`}
                            type="file"
                            req={false}
                            onDragEnter={() => {
                                setFile3Classes('files-enter')
                            }}
                            onDrop={() => {
                                setFile3Classes('files-in')
                            }}
                            onDragLeave={() => {
                                setFile3Classes('')
                            }}
                            name='image3'
                            onChange={onChangeImages}
                        />
                    </div>
                    <InputField
                        value={about}
                        name='about'
                        placeholder='О компании'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    <InputField
                        value={youtube}
                        name='youtube'
                        placeholder='YouTube'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    <InputField
                        value={twitter}
                        name='twitter'
                        placeholder='Twitter'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    <InputField
                        value={facebook}
                        name='facebook'
                        placeholder='Facebook'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    <InputField
                        value={instagram}
                        name='instagram'
                        placeholder='Instagram'
                        onChange={onChange}
                        req={false}
                        s={12}/>
                    <InputField
                        value={vkontakte}
                        name='vkontakte'
                        placeholder='VK'
                        onChange={onChange}
                        req={false}
                        s={12}/>

                    <ProgressBar progress={Math.round(upload, 2)}/>
                    <input type="submit" value="Сохранить" className="btn btn-primary"/>
                </Form>
            </div>
        </>
    )
}

SettingsForm.propTypes = {
    upload: PropTypes.number.isRequired,
    resetUpload: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    upload: state.settings.upload,
    loading: state.settings.loading
})

export default connect(
    mapStateToProps,
    {resetUpload}
)(SettingsForm)