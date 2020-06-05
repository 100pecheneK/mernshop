import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"

const Header = ({title, link = '', linkName = ''}) => {
    return (
        <nav>
            <div className="nav-wrapper">
                <h1 className="brand-logo">{title}</h1>
                {link && linkName &&
                <div className="nav-right">
                    <Link to={link} className="waves-effect waves-light btn">
                        {linkName}
                    </Link>
                </div>}
            </div>
        </nav>
    )
}

Header.propTypes = {}

export default Header
