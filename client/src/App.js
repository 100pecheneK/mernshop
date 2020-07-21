import React, { useEffect } from 'react'
import './App.css'
import 'materialize-css'
// import 'semantic-ui-css/semantic.min.css'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
// import AdminRoutes from './components/routing/AdminRoutes'
// import ClientRoutes from './components/routing/ClientRoutes'

import store from './store'
import Login from './components/admin/auth/login'
import { loadUser } from './actions/admin/auth'
import ErrorBoundary from './components/layout/ErrorBoundary'
import history from './history'

import withSuspense from './utils/withSuspense'
const AdminRoutes = React.lazy(() => import('./components/routing/AdminRoutes'))
const ClientRoutes = React.lazy(() =>
  import('./components/routing/ClientRoutes')
)

function App() {
  useEffect(() => {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.classList.add('available')
      setTimeout(() => {
        ele.outerHTML = ''
      }, 2000)
    }
    store.dispatch(loadUser())
  }, [])
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/admin/login" component={Login} />
            {/* <Route path="/admin" component={AdminRoutes} />
            <Route path="/" component={ClientRoutes} /> */}
            <Route path="/admin" component={withSuspense(AdminRoutes)} />
            <Route path="/" component={withSuspense(ClientRoutes)} />
            <Route render={() => <h1>NotFound</h1>} />
          </Switch>
        </Router>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
