function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);  

   function validate(field, label) {
     if (!field) {
       setStatus("Error: " + label);
       setTimeout(() => setStatus(""), 3000);
       return false;
     }
     return true;
   }

  function handleCreate() {
    console.log(name, email, password);

    // validate name
    if (!validate(name, "name")) return;
    // validate email
    if (
      !validate(email, "email") ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(email)
    )
      return alert("Email incorrect", setEmail(""));
    // validate at least one number
    if (!validate(password.match(/\d/)))
      return alert("Password must have at least one number.", setPassword(""));
    // validate at least one Uppercase
    if (!validate(password.match(/[A-Z]/)))
      return alert(
        "Password must have at least one uppercase",
        setPassword("")
      );
    // validate at least one Lowercase
    if (!validate(password.match(/[a-z]/)))
      return alert(
        "Password must have at least one lowercase",
        setPassword("")
      );
    // validate at least one Special Character
    if (
      !validate(
        password.match(/[!\@\#\$\%\&\(\)\=\?\¿\^\*\+\_\>\<\,\.\-\:\{\}\¨\¡\ç]/)
      )
    )
      return alert(
        "Password must have at least one special Character !¡@#$%&/()=?¿^*_+,.-:{}ç¨",
        setPassword("")
      );
    // validate at least 6 characters of length
    if (!validate(password.length >= 7))
      return alert("Password must have at least 8 characters", setPassword(""));

    ctx.users.push({ name, email, password, balance: 0 });
    setShow(false);
  }

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <>
            Name
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
            Email address
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              id="btnCreateAccout"
              onClick={handleCreate}
              disabled={!name || !password || !email}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Add another account
            </button>
          </>
        )
      }
    />
  )
}