import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name:"notification",
    initialState:{message:"",show:false},
    reducers:{
        setMessage:{
            prepare(message:string){
                return {
                    payload:{
                        message
                    }
                }
            },
            reducer(state,action:{payload:{message:string}}){
                state.message = action.payload.message;
                state.show = true;
            }
        },
        resetMessage(state){
            state.message = "";
            state.show = false
        }
    }
})

export const {setMessage,resetMessage} = notificationSlice.actions

export default notificationSlice.reducer;