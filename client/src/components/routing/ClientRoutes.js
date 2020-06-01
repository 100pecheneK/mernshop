import {Link, Route, Switch} from "react-router-dom"
import React from "react"

const Home = () => (
    <>
        <Link to='/home2'>home2</Link>
        <Link to='/admin'>admin</Link>
        <h1>Home</h1>
    </>
)
const Home2 = () => (
    <>
        <Link to='/'>home</Link>
        <Link to='/admin'>admin</Link>
        <h1>Home2</h1>
    </>
)
const ClientRoutes = () => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/home2' component={Home2}/>
    </Switch>
)
export default ClientRoutes