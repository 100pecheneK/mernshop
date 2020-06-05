import {Link} from "react-router-dom"
import React, {useEffect} from "react"
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {getSettings} from "../../../actions/admin/settings"

const Home = ({getSettings, settings: {settings}}) => {
    useEffect(() => {
        getSettings()
        window.M.Sidenav.init(document.querySelectorAll('.sidenav'))
        window.M.Parallax.init(document.querySelectorAll('.parallax'))
    }, [])

    return (
        <>
            <nav className="white" role="navigation">
                <div className="nav-wrapper container">
                    <a id="logo-container" href="#" className="brand-logo">
                        {settings?.shotTitle || 'Магазин'}
                    </a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="#">Корзина</a></li>
                    </ul>

                    <ul id="nav-mobile" className="sidenav">
                        <li><a href="#">{settings?.shotTitle || 'Магазин'}</a></li>
                        <li><a href="#">Корзина</a></li>
                    </ul>
                    <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i
                        className="material-icons">menu</i></a>
                </div>
            </nav>

            <div id="index-banner" className="parallax-container">
                <div className="section no-pad-bot">
                    <div className="container">
                        <br/><br/>
                        <h1 className="header center teal-text text-lighten-2">
                            {settings?.title || 'Магазин'}</h1>
                        <div className="row center">
                            <h5 className="header col s12 light">{settings?.image1_text || 'Описание магазина'}</h5>
                        </div>
                        <div className="row center">
                            <a href="#!"
                               id="download-button"
                               className="btn-large waves-effect waves-light teal lighten-1">
                                К покупкам
                            </a>
                        </div>
                        <br/><br/>

                    </div>
                </div>
                <div className="parallax"><img
                    src={`/${settings?.image1}`}
                    alt="Unsplashed background img 1"/>
                </div>
            </div>


            <div className="container">
                <div className="section">
                    <div className="row">
                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center brown-text">
                                    <i className="material-icons">{settings?.advantages?.icon1 || 'flash_on'}</i>
                                </h2>
                                <h5 className="center">{settings?.advantages?.advantage1 || 'Быстро'}</h5>
                                <p className="light">{settings?.advantages?.advantage1_text}</p>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center brown-text">
                                    <i className="material-icons">{settings?.advantages?.icon2 || 'flash_on'}</i>
                                </h2>
                                <h5 className="center">{settings?.advantages?.advantage2 || 'Быстро'}</h5>
                                <p className="light">{settings?.advantages?.advantage2_text}</p>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center brown-text">
                                    <i className="material-icons">{settings?.advantages?.icon3 || 'flash_on'}</i>
                                </h2>
                                <h5 className="center">{settings?.advantages?.advantage3 || 'Быстро'}</h5>
                                <p className="light">{settings?.advantages?.advantage3_text}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <div className="parallax-container valign-wrapper">
                <div className="section no-pad-bot">
                    <div className="container">
                        <div className="row center">
                            <h5 className="header col s12 light">{settings?.image2_text}</h5>
                        </div>
                    </div>
                </div>
                <div className="parallax"><img
                    src={`/${settings?.image2}`}
                    alt="Unsplashed background img 2"/>
                </div>
            </div>

            <div className="container">
                <div className="section">
                    <div className="row">
                        <div className="col s12 center">
                            <h3><i className="mdi-content-send brown-text"/></h3>
                            <h4>Напишите нам</h4>
                            <p className="left-align light flow-text">{settings?.contactUs}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="parallax-container valign-wrapper">
                <div className="section no-pad-bot">
                    <div className="container">
                        <div className="row center">
                            <h5 className="header col s12 light">{settings?.image3_text}</h5>
                        </div>
                    </div>
                </div>
                <div className="parallax"><img
                    src={`/${settings?.image2}`}
                    alt="Unsplashed background img 3"/>
                </div>
            </div>

            <footer className="page-footer teal">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">О компании</h5>
                            <p className="grey-text text-lighten-4">{settings?.about}</p>
                        </div>
                        <div className="col l3 s12">
                            <h5 className="white-text">Соц сети</h5>
                            <ul>
                                {settings?.links?.facebook &&
                                <li><a className="white-text" href={settings?.links?.facebook}
                                       target='_blank' rel='noopener noreferrer'>Facebook</a></li>
                                }

                                {settings?.links?.instagram &&
                                <li><a className="white-text" href={settings?.links?.instagram}
                                       target='_blank' rel='noopener noreferrer'>Instagram</a></li>
                                }

                                {settings?.links?.twitter &&
                                <li><a className="white-text" href={settings?.links?.twitter}
                                       target='_blank' rel='noopener noreferrer'>Twitter</a></li>
                                }

                                {settings?.links?.vkontakte &&
                                <li><a className="white-text" href={settings?.links?.vkontakte}
                                       target='_blank' rel='noopener noreferrer'>Vkontakte</a></li>
                                }

                                {settings?.links?.youtube &&
                                <li><a className="white-text" href={settings?.links?.youtube}
                                       target='_blank' rel='noopener noreferrer'>Youtube</a></li>
                                }

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        Made by <a className="brown-text text-lighten-3"
                                   href="https://vk.com/mistermihail23">Михаил Притыкин</a>
                    </div>
                </div>
            </footer>
        </>
    )
}

Home.propTypes = {
    getSettings: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    settings: state.settings
})
export default connect(
    mapStateToProps,
    {getSettings}
)(Home)