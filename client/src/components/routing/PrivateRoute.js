import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {Redirect, Route} from "react-router-dom"
import Spinner from "../layout/Spinner"
import SpinnerLinear from "../layout/SpinnerLinear"
import ErrorBoundary from "../layout/ErrorBoundary"

const PrivateRoute = ({
                          component: Component,
                          auth: {isAuthenticated, loading},
                          ...rest
                      }) => (
    <Route {...rest} render={
        props => {
            if (loading) {
                return <SpinnerLinear/>
            } else if (!isAuthenticated) {
                return <Redirect to='/admin/login'/>
            } else {
                return <Component {...props}/>
            }
        }
    }
    />
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps
)(PrivateRoute)
