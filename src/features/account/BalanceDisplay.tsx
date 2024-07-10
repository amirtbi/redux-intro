import { connect, useSelector } from "react-redux";

function formatCurrency(value:string) {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }
  
  function BalanceDisplay() {
    // Modern way 
    const balance = useSelector(store=>store.account.balance)
    return <div className="balance">{balance ? formatCurrency(balance) : 0}</div>;
  }
  

  /**
   * Old way
   */
  // function mapStatetoProps(state:any){
  //   return {
  //     balance:state.account.balance,
  //     loan:state.account.loan
  //   }
  // }
  // eslint-disable-next-line react-refresh/only-export-components
  export default BalanceDisplay  