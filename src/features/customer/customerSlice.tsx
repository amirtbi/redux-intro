import { createSlice } from "@reduxjs/toolkit";


const initialStateCustomer ={
    fullName: "",
    nationalID: "",
    createdAt: "",
}

type Actions = {payload:{fullName:string,nationalID:string,createdAt:string}}

const customerSlice = createSlice({
  name:"customer",
  initialState:initialStateCustomer,
  reducers:{
    createCustomer:{
      prepare(fullName:string,nationalID:string,createdAt:string){
        return {
          payload:{
            fullName,
            nationalID,
            createdAt
          }
        }
      },
      reducer(state,action:Actions){
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt; 
      },
    },
    updateName:{
      prepare(fullName:string){
        return {
          payload:{
            fullName
          }
        }
      },
      reducer(state,action:{payload:{fullName:string}}){
        state.fullName  = action.payload.fullName;
      }
    }
  }
})

export const {updateName,createCustomer} = customerSlice.actions; 
export default customerSlice.reducer;