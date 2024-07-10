import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';
import { useDispatch} from "react-redux";
import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/customer/customerSlice";


const reducers = combineReducers({account:accountReducer,customer:customerReducer});
const store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))


export default store



/// types 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch  = useDispatch.withTypes<AppDispatch>();