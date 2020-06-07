import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {Redirect, Route} from "react-router-dom"
import SpinnerLinear from "../layout/SpinnerLinear"

const PrivateRoute = ({
                          component: Component,
                          auth: {isAuthenticated, loading, user},
                          admin = false,
                          ...rest
                      }) => {
    return (
        <Route {...rest} render={
            props => {
                if (loading) {
                    return <SpinnerLinear/>
                } else if (!isAuthenticated) {
                    return <Redirect to='/admin/login'/>
                } else if (admin && !user?.isAdmin) {
                    return <Redirect to='/admin'/>
                } else {
                    return <Component {...props}/>
                }
            }
        }
        />
    )
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps
)(PrivateRoute)
