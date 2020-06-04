import React from 'react'
import PropTypes from 'prop-types'

const Form = ({onSubmit, children}) => {
    const onsubmit = e => {
        e.preventDefault()
        onSubmit(e)
    }
    return (
        <form onSubmit={onsubmit} className="col s12">
            {children}
        </form>
    )
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default Form
