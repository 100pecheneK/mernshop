import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {createSettings} from "../../../actions/admin/settings"
import SettingsForm from "./SettingsForm"

const SettingsCreate = ({createSettings}) => {
    return (
        <SettingsForm
            onSubmit={createSettings}
        />
    )
}

SettingsCreate.propTypes = {
    createSettings: PropTypes.func.isRequired,
}

export default connect(
    null,
    {createSettings}
)(SettingsCreate)
