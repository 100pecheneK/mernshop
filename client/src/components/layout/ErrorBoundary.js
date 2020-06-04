import React, {Component} from "react"
import {Link} from "react-router-dom"

export default class ErrorBoundary extends Component {
    state = {
        hasError: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true})
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="row">
                    <div className="col s12 m6">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Что-то пошло не так 😞</span>
                                <p>Наши сотрудники уже оповещены о том, что произошла ошибка и
                                    постараются как можно скорей её устранить.</p>
                            </div>
                            <div className="card-action">
                                <Link to='/admin'>Домой</Link>
                                <Link to='/'>На сайт</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return this.props.children
    }
}