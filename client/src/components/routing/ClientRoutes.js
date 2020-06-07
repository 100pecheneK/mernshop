import {Route, Switch} from "react-router-dom"
import React from "react"
import Home from "../client/home/Home"
import './client.css'
import Goods from "../client/goods/Goods"
import Header from "../client/home/Header"
import Cart from "../client/cart/Cart"



const ClientRoutes = () => (
    <>
        <Header/>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/cart' component={Cart}/>
            <Route exact path='/goods' component={Goods}/>
            <Route path='/goods/:page' component={Goods}/>
        </Switch>
    </>
)
export default ClientRoutes