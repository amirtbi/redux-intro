import { combineReducers, createStore } from "redux";
import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/customer/customerSlice";


const reducers = combineReducers({account:accountReducer,customer:customerReducer});
const store = createStore(reducers)


export default store