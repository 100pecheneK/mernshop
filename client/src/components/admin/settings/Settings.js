import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {createSettings, getSettings} from "../../../actions/admin/settings"
import SettingsCreate from "./SettingsCreate"
import SettingsEdit from "./SettingsEdit"
import SettingsForm from "./SettingsForm"

const Settings = ({getSettings, createSettings, settings}) => {
    useEffect(() => {
        getSettings()
    }, [getSettings])
    if (settings) {
        return <SettingsForm
            onSubmit={createSettings}
            initialValues={settings.settings}
        />
    } else {
        return <SettingsForm
            onSubmit={createSettings}
        />
    }

}

Settings.propTypes = {
    createSettings: PropTypes.func.isRequired,
    getSettings: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    settings: state.settings
})
export default connect(
    mapStateToProps,
    {getSettings, createSettings}
)(Settings)
