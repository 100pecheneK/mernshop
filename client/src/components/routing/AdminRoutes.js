import {Route, Switch} from "react-router-dom"
import React, {useEffect} from "react"
import Sidebar from "../admin/Sidebar/Sidebar"
import SpinnerLinear from "../layout/SpinnerLinear"
import AdminGoods from "../admin/adminGoods/AdminGoods"
import Accounts from "../admin/accounts/Accounts"
import setAuthToken from "../../utils/setAuthToken"
import PrivateRoute from "./PrivateRoute"
import AccountCreate from "../admin/accounts/AccountCreate"

const AdminHome = () => (
    <h1>AdminHome<SpinnerLinear/></h1>
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

                        <Switch>
                            <PrivateRoute exact path='/admin' component={AdminHome}/>
                            <PrivateRoute exact path='/admin' component={AdminHome}/>
                            <PrivateRoute exact path='/admin/accounts' component={Accounts}/>
                            <PrivateRoute exact path='/admin/accounts/create' component={AccountCreate}/>
                            <PrivateRoute path='/admin/accounts/:page' component={Accounts}/>
                            <PrivateRoute exact path='/admin/goods' component={AdminGoods}/>
                            <PrivateRoute path='/admin/goods/:page' component={AdminGoods}/>
                        </Switch>
                    </div>
                </div>
            </main>
        </>
    )
}
export default AdminRoutes
