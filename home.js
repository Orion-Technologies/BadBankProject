function Home(){

  return (
    <Card
      bgcolor="primary"
      txtcolor="white"
      header="BadBank"
      title="Welcome to the bank!"
      text="BadBank is our project to show our skills in MERN."
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />    
  );  
}
