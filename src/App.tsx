import CreateCustomer from "./features/customer/CreateCustomer";
import Customer from "./features/customer/Customer";
import AccountOperations from "./features/account/AccountOperations";
import BalanceDisplay from "./features/account/BalanceDisplay";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {setMessage} from "./features/notiication/notificationSlice"
import { NotifyBar } from "./features/notiication/NotificationBar";

function App() {

  const fullName = useSelector(store=>store.customer.fullName);

  const dispatch = useDispatch()
  return (
    <div>
            <NotifyBar/>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      <button onClick={()=>dispatch(setMessage("Notification works"))}>Show notification</button>
      {fullName ==="" ? <CreateCustomer /> :
      <>
      <Customer />
      <AccountOperations />
      <BalanceDisplay />
      </>  
    }
    </div>
  );
}

export default App;