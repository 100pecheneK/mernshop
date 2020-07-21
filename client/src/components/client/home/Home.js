import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SpinnerLinear from '../../layout/SpinnerLinear'
import ImageLoader from '../goods/ImageLoader/ImageLoader'
import LazyLoad from 'react-lazy-load'

const Paralax = ({ img, id }) => {
  const [loaded, setLoaded] = useState(false)
  const parallaxClass = `parallax--${id}`

  useEffect(() => {
    if (loaded) {
      window.M.Parallax.init(document.querySelector(`.${parallaxClass}`))
    }
  }, [loaded, parallaxClass])

  return (
    <LazyLoad
      className={`parallax ${parallaxClass}`}
      debounce={false}
      throttle={250}
      offsetVertical={500}
    >
      <ImageLoader
        onLoad={setLoaded}
        src={`/${img}`}
        alt="Unsplashed background img 2"
      />
    </LazyLoad>
  )
}

const Home = ({ settings: { settings, loading } }) => {
  return loading ? (
    <SpinnerLinear />
  ) : (
    <>
      {settings?.image1 && (
        <div id="index-banner" className="parallax-container">
          <div className="section no-pad-bot">
            <div className="container">
              <br />
              <br />
              <h1 className="header center white-text text-lighten-2">
                {settings?.title || 'Магазин'}
              </h1>
              <div className="row center">
                <h5 className="header col s12 light">
                  {settings?.image1_text || 'Описание магазина'}
                </h5>
              </div>
              <div className="row center">
                <Link
                  to="/goods"
                  id="download-button"
                  className="btn-large waves-effect waves-light  pink lighten-2"
                >
                  К покупкам!
                </Link>
              </div>
              <br />
              <br />
            </div>
          </div>
          <Paralax img={settings?.image1} id={1} />
        </div>
      )}

      {settings?.advantages && (
        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center brown-text">
                    <i className="material-icons">
                      {settings?.advantages?.icon1 || 'flash_on'}
                    </i>
                  </h2>
                  <h5 className="center">
                    {settings?.advantages?.advantage1 || 'Быстро'}
                  </h5>
                  <p className="light flow-text">
                    {settings?.advantages?.advantage1_text}
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center brown-text">
                    <i className="material-icons">
                      {settings?.advantages?.icon2 || 'flash_on'}
                    </i>
                  </h2>
                  <h5 className="center">
                    {settings?.advantages?.advantage2 || 'Быстро'}
                  </h5>
                  <p className="light flow-text">
                    {settings?.advantages?.advantage2_text}
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center brown-text">
                    <i className="material-icons">
                      {settings?.advantages?.icon3 || 'flash_on'}
                    </i>
                  </h2>
                  <h5 className="center">
                    {settings?.advantages?.advantage3 || 'Быстро'}
                  </h5>
                  <p className="light flow-text">
                    {settings?.advantages?.advantage3_text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {settings?.image2 && (
        <div className="parallax-container valign-wrapper">
          <div className="section no-pad-bot">
            <div className="container">
              <div className="row center">
                <h5 className="header col s12 light">
                  {settings?.image2_text}
                </h5>
              </div>
            </div>
          </div>
          <Paralax img={settings?.image2} id={2} />
        </div>
      )}
      {settings?.contactUs && (
        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col s12 center">
                <h3>
                  <i className="mdi-content-send brown-text" />
                </h3>
                <h4>{settings?.contactUs}</h4>
                <p className="left-align light flow-text">
                  {settings?.contactUs_text}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {settings?.image3 && (
        <div className="parallax-container valign-wrapper">
          <div className="section no-pad-bot">
            <div className="container">
              <div className="row center">
                <h5 className="header col s12 light">
                  {settings?.image3_text}
                </h5>
              </div>
            </div>
          </div>
          <Paralax img={settings?.image3} id={3} />
        </div>
      )}

      <footer className="page-footer teal">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">О компании</h5>
              <p className="grey-text text-lighten-4">
                {settings?.about || 'Мы отличная компания'}
              </p>
            </div>
            {settings?.links && (
              <div className="col l3 s12">
                <h5 className="white-text">Соц сети</h5>
                <ul>
                  {settings?.links?.facebook && (
                    <li>
                      <a
                        className="white-text"
                        href={settings?.links?.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Facebook
                      </a>
                    </li>
                  )}

                  {settings?.links?.instagram && (
                    <li>
                      <a
                        className="white-text"
                        href={settings?.links?.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Instagram
                      </a>
                    </li>
                  )}

                  {settings?.links?.twitter && (
                    <li>
                      <a
                        className="white-text"
                        href={settings?.links?.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Twitter
                      </a>
                    </li>
                  )}

                  {settings?.links?.vkontakte && (
                    <li>
                      <a
                        className="white-text"
                        href={settings?.links?.vkontakte}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Vkontakte
                      </a>
                    </li>
                  )}

                  {settings?.links?.youtube && (
                    <li>
                      <a
                        className="white-text"
                        href={settings?.links?.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Youtube
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            Made by{' '}
            <a
              className="brown-text text-lighten-3"
              href="https://vk.com/mistermihail23"
            >
              Михаил Притыкин
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

Home.propTypes = {
  settings: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  settings: state.settings,
})
export default connect(mapStateToProps)(Home)
