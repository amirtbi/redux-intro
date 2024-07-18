import { useSelector } from "react-redux"
import ClassNames from "./notification.module.css"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {resetMessage} from "./notificationSlice"
function NotifyBar(){
    const notification = useSelector(store=>store.notification);
    const dispatch = useDispatch()
    useEffect(()=>{
        if(notification.show){
            setTimeout(()=>{
                dispatch(resetMessage())
            },5000)
        }
    },[dispatch, notification.show])
    return <>
       {
        notification.show && 
           <div className={ClassNames.notify}>
           <h1>Message</h1>
            <p>{notification.message}</p>
        </div>
    }
    </>
}

export {NotifyBar}