import { configureStore } from "@reduxjs/toolkit";
import { useDispatch} from "react-redux";
import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/customer/customerSlice";



const store = configureStore({
    reducer:{
        account:accountReducer,
        customer:customerReducer
    }
})
export default store
/// types 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch  = useDispatch.withTypes<AppDispatch>();