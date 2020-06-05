import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {getSettings} from "../../../actions/admin/settings"
import {createSettings} from "../../../actions/admin/settings"
import SettingsForm from "./SettingsForm"

const SettingsEdit = ({createSettings, settings}) => {
    return (
        <SettingsForm
            onSubmit={createSettings}
            initialValues={settings}
        />
    )
}

SettingsEdit.propTypes = {
    createSettings: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    settings: state.settings
})
export default connect(
    mapStateToProps,
    {createSettings}
)(SettingsEdit)
