import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {getSettings} from "../../../actions/admin/settings"
import SpinnerLinear from "../../layout/SpinnerLinear"

const Header = ({getSettings, settings: {settings, loading}}) => {
    useEffect(() => {
        getSettings()
    }, [getSettings])
    useEffect(() => {
        if (!loading) {
            window.M.Sidenav.init(document.querySelectorAll('.sidenav'))
        }
    }, [loading])
    const onNavClick = () => {
        document.querySelectorAll('.sidenav').forEach(nav => window.M.Sidenav.getInstance(nav).close())
    }
    return loading ? <SpinnerLinear/> : (
        <nav className="white" role="navigation">
            <div className="nav-wrapper container">
                <Link to='/' id="logo-container" className="brand-logo">
                    {settings?.shotTitle || 'Магазин'}
                </Link>
                <ul className="right hide-on-med-and-down">
                    <li><Link to='/' onClick={onNavClick}>Корзина</Link></li>
                </ul>
                <ul id="nav-mobile" className="sidenav">
                    <li><Link to='/' onClick={onNavClick}>{settings?.shotTitle || 'Магазин'}</Link>
                    </li>
                    <li><Link to='/goods' onClick={onNavClick}>Товары</Link></li>
                    <li><Link to='/cart' onClick={onNavClick}>Корзина</Link></li>
                </ul>
                <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i
                    className="material-icons">menu</i></a>
            </div>
        </nav>
    )
}

Header.propTypes = {
    settings: PropTypes.object.isRequired,
    getSettings: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    settings: state.settings
})
export default connect(
    mapStateToProps,
    {getSettings}
)(Header)
