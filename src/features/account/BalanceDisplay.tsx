import { useSelector } from "react-redux";

function formatCurrency(value:string) {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }
  
  function BalanceDisplay() {
    const balance = useSelector(store=>store.account.balance)
    console.log(balance)
    return <div className="balance">{balance ? formatCurrency(balance) : 0}</div>;
  }
  
  export default BalanceDisplay;