function Withdraw(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [deposit, setDeposit] = React.useState(0);

  const ctx = React.useContext(UserContext);  

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
  var balance = deposited();
  ctx.users.balance = balance;
  let withdrawal_amount = deposit;
  
  var aux = ctx.users.length -1;
  let name = ctx.users[aux].name;
  let email = ctx.users[aux].email;
  let password = ctx.users[aux].password;

  ctx.users.push({name,email,password,balance, withdrawal_amount, deposit});
}    

function deposited() {
  var aux = parseFloat(JSON.stringify(ctx.users.balance)) - parseInt(deposit);  
  if (aux < 0) {
    setStatus('Error: not enough funds!');
    alert(`Error: not enough funds!`);
    return parseFloat(JSON.stringify(ctx.users.balance)) 
  }
  return aux;
}

function clearForm(){
  setShow(true);
  setDeposit(0);
  setStatus('');    
}

  return (    
    <Card
      bgcolor="primary"
      header="Withdrawal"
      status={status}
      body={show ? (  
              <>              
              Remaining amount is: ${ctx.users.balance}<br/>              
              Withdraw Field<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter amount" value={deposit} onChange={e => setDeposit(e.currentTarget.value)} /><br/>
              <button type="submit" className="btn btn-light" onClick={handleCreate} disabled={!deposit}>Confirm Withdrawal</button>
              </>
            ):(
              <>               
              {!status && (<h5>Success!</h5>)}
              <button type="submit" className="btn btn-light" onClick={clearForm}>Add another withdrawal operation</button>
              </>
            )}
    />
  )
}
