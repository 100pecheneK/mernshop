import React from 'react'
import PropTypes from 'prop-types'

export const InputField = ({req, s = 12, classes = '', type = 'text', textarea = false, icon, ...rest}) => {
    return (
        <div className={`input-field col s${s} ${classes}`}>
            {icon && <i className="material-icons prefix">{icon}</i>}
            {!textarea ?
                <input
                    {...rest}
                    type={type}
                    required={req ?? true}
                    className="validate"
                />
                :
                <textarea {...rest} className="materialize-textarea"/>
            }
        </div>
    )
}

