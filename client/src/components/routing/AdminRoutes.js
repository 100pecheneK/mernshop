import {Route, Switch} from "react-router-dom"
import React, {useEffect} from "react"
import Sidebar from "../admin/Sidebar/Sidebar"
import SpinnerLinear from "../layout/SpinnerLinear"
import setAuthToken from "../../utils/setAuthToken"
import ErrorBoundary from "../layout/ErrorBoundary"
import PrivateRoute from "./PrivateRoute"

import Accounts from "../admin/accounts/Accounts"
import AccountCreate from "../admin/accounts/AccountCreate"

import Goods from '../admin/goods/Goods'
import GoodsCreate from '../admin/goods/GoodsCreate'
import GoodsEdit from '../admin/goods/GoodsEdit'

import Categories from '../admin/categories/Categories'
import CategoryCreate from '../admin/categories/CategoryCreate'
import CategoryEdit from '../admin/categories/CategoryEdit'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {logout} from "../../actions/admin/auth"
import SettingsCreate from "../admin/settings/SettingsCreate"
import Settings from "../admin/settings/Settings"


const AdminHome = () => (
    <>
        <h1>AdminHome</h1>
    </>
)

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

const AdminRoutes = () => {
    return (
        <>
            <Sidebar/>
            <main>
                <div className="container">
                    <div className="row">
                        <ErrorBoundary>
                            <Switch>
                                <PrivateRoute admin={true} exact path='/admin'
                                              component={AdminHome}/>
                                <PrivateRoute admin={true} exact path='/admin/accounts/list'
                                              component={Accounts}/>
                                <PrivateRoute admin={true} exact path='/admin/accounts/create'
                                              component={AccountCreate}/>
                                <PrivateRoute admin={true} path='/admin/accounts/list/:page'
                                              component={Accounts}/>


                                <PrivateRoute exact path='/admin/goods/list' component={Goods}/>
                                <PrivateRoute path='/admin/goods/list/:page' component={Goods}/>
                                <PrivateRoute exact path='/admin/goods/create'
                                              component={GoodsCreate}/>
                                <PrivateRoute path='/admin/goods/:id' component={GoodsEdit}/>

                                <PrivateRoute exact path='/admin/categories/list'
                                              component={Categories}/>
                                <PrivateRoute path='/admin/categories/list/:page'
                                              component={Categories}/>
                                <PrivateRoute exact path='/admin/categories/create'
                                              component={CategoryCreate}/>
                                <PrivateRoute path='/admin/categories/:id'
                                              component={CategoryEdit}/>

                                <PrivateRoute admin={true} exact path='/admin/settings'
                                              component={Settings}/>
                            </Switch>
                        </ErrorBoundary>
                    </div>
                </div>
            </main>
        </>
    )
}


export default AdminRoutes
