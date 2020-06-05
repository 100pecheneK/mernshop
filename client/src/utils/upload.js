import alert from "./alert"

export const checkMimeType = (e) => {
    let files = e.target.files
    let err = []
    const types = ['image/png', 'image/jpeg']
    for (let x = 0; x < files.length; x++) {
        if (types.every(type => files[x].type !== type)) {
            err[x] = files[x].type + ' не поддерживаемый формат\n'
        }
    }
    for (let z = 0; z < err.length; z++) {
        alert(err[z])
        e.target.value = null
    }
    return true
}
export const maxSelectFile = (e) => {
    let files = e.target.files
    if (files.length > 5) {
        const msg = 'Можно загрузить только 5 изображения'
        e.target.value = null
        alert(msg, 'red')
        return false
    }
    return true
}
export const checkFileSize = (e) => {
    let files = e.target.files
    let size = 2000000
    let err = []
    for (let x = 0; x < files.length; x++) {
        if (files[x].size > size) {
            err[x] = files[x].type + 'слишком больше изобрежние\n'
        }
    }
    for (let z = 0; z < err.length; z++) {
        alert(err[z], 'red')
        e.target.value = null
    }
    return true
}