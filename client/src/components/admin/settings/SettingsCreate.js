import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {InputField} from "../../layout/Fields"
import ProgressBar from "../../layout/ProgressBar"
import Form from "../../layout/Form"
import SpinnerLinear from "../../layout/SpinnerLinear"
import Header from "../Header/Header"
import {checkFileSize, checkMimeType, maxSelectFile} from "../../../utils/upload"
import {resetUpload} from "../../../actions/admin/settings"
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
