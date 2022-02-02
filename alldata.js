function AllData(){
  
  const ctx = React.useContext(UserContext);
  function review_deposit(index){
    if(ctx.users[index].deposit == undefined) {      
      return "0";      
    }
    return ctx.users[index].deposit;
  }

  function aux_function() {
    return ctx.users.map((variant, index) => (
      <Card
        bgcolor="secondary"
        header="Movement"
        key="variant"
        body={
          <>
            "Deposit: " ${review_deposit(index)}
            <br />
            "Withdrawal: " ${ctx.users[index].withdrawal_amount}
            <br />
            "Remaining: " ${ctx.users[index].balance}
            <br />
            "Client: " {ctx.users[index].name}
          </>
        }
      ></Card>
    ));
  }

  return (
    <>
      <h5>All Data Movements in the Bank</h5>
      <br />
      {aux_function()}
    </>
  );
}
