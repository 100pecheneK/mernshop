import React from 'react'
import PropTypes from 'prop-types'

export const InputField = ({req, s = 12, onDragEnter, onDragLeave, onDrop, classes = '', type = 'text', placeholder, textarea = false, icon, ...rest}) => {
    return (
        <div className={`input-field col s${s} ${classes}`}>
            {icon && <i className="material-icons prefix">{icon}</i>}
            {!textarea ?
                <>
                    <input
                        {...rest}
                        type={type}
                        required={req ?? true}
                        className="validate"
                        onDragEnter={() => {
                            if (onDragEnter) {
                                onDragEnter()
                            }
                        }}
                        onDragLeave={() => {
                            if (onDragLeave) {
                                onDragLeave()
                            }
                        }
                        }
                        onDrop={() => {
                            if (onDrop) {
                                onDrop()
                            }
                        }}
                        placeholder={placeholder}
                    />
                    <label>{placeholder}</label>
                </>
                :
                <>
                    <textarea {...rest} placeholder={placeholder} className="materialize-textarea"/>
                    <label>{placeholder}</label>
                </>
            }
        </div>
    )
}

