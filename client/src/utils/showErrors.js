import alert from "./alert"

const showErrors = e => {
    console.log(e.response.data)
    if (e.response.data.errors) {
        e.response.data.errors.forEach(error => alert(error.msg, 'red'))
    }
}

export default showErrors