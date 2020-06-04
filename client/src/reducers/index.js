import {combineReducers} from "redux"
import auth from "./auth"
import users from "./users"
import goods from "./goods"
import categories from "./categories"

export default combineReducers({
    auth,
    users,
    goods,
    categories,
})