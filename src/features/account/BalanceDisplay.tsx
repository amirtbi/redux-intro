import { connect, useSelector } from "react-redux";

function formatCurrency(value:string) {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }
  
  function BalanceDisplay(props:{balance:string,loan:string}) {
    console.log("loan",props.loan)
    return <div className="balance">{props.balance ? formatCurrency(props.balance) : 0}</div>;
  }
  

  function mapStatetoProps(state:any){
    return {
      balance:state.account.balance,
    }
  }
  // eslint-disable-next-line react-refresh/only-export-components
  export default connect(mapStatetoProps)(BalanceDisplay);