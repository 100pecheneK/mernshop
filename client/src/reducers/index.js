import {combineReducers} from "redux"
import auth from "./auth"
import users from "./users"
import goods from "./goods"
import categories from "./categories"
import settings from "./settings"
import cart from "./cart"

export default combineReducers({
    auth,
    users,
    goods,
    categories,
    settings,
    cart,
})