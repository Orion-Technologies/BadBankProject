function Deposit(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [deposit, setDeposit] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  const ctx = React.useContext(UserContext);  

  var aux = ctx.users.length -1;
  
  function validate(field, label){
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""),3000);
      return false;
    }     
    return true;
}

function handleCreate(){

  if (!validate(deposit, "deposit")) {
  return;
  } else if (isNaN(deposit)) {
    alert("This field only accept numbers", setDeposit(0));
    return false;
  } else if (deposit < 0) {
    alert("Deposit cannot be less than 0", setDeposit(0));
    return false;
  }
  
  setShow(false);
 
  var balance = amount_deposited(); 

  ctx.users.balance = balance; 
  
  let withdrawal_amount = "0";
  
  let name = ctx.users[aux].name;
  let email = ctx.users[aux].email;
  let password = ctx.users[aux].password;
  ctx.users.push({name,email,password,balance, deposit, withdrawal_amount});
}    

function amount_deposited() {
  let aux3 = ctx.users.length -1;
  let previous_amount = ctx.users[aux3].balance;
  var aux2 = previous_amount + parseFloat(deposit);  
  setTotal(aux2);
  return aux2;
}

function clearForm(){
  setShow(true);    
  setDeposit(0);
}

  return (    
    <Card
      bgcolor="primary"
      header="Deposit"
      status={status}
      body={show ? (  
              <>
              Name: {ctx.users[aux].name}<br/><br/>                            
              Deposited: ${ctx.users.balance}<br/><br/>
              Deposit<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter amount" value={deposit} onChange={e => setDeposit(e.currentTarget.value)} /><br/>
              <button type="submit" className="btn btn-light" onClick={handleCreate} disabled={!deposit}>Deposit</button>
              </>
            ):(
              <>
              <h5>Success!</h5>              
              <button type="submit" className="btn btn-light" onClick={clearForm}>Add another deposit</button>
              </>
            )}
    />
  )
}
