import {Link, Route, Switch} from "react-router-dom"
import React from "react"
import Home from "../client/home/Home"
import './client.css'

const Home2 = () => (
    <>
        <ul>
            <li>
                <Link to='/'>Страница 1</Link>
            </li>
            <li>
                <Link to='/admin'>admin</Link>
            </li>
        </ul>

        <h1>Страница 2</h1>
    </>
)
const ClientRoutes = () => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/home2' component={Home2}/>
    </Switch>
)
export default ClientRoutes