import React, { Component } from 'react';
import './App.css';
import history from './history';
import { Button } from 'react-bootstrap';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

class App extends Component {
  
  render() {
    return (
      <div className="text-center">   
       <Button id="createaccbtn" variant="btn btn-success margin-5 " onClick={() => history.push('/CreateAccount')}>Create Account</Button> 
       <Button id="createtransbtn" variant="btn btn-info margin-5 " onClick={() => history.push('/CreateTransaction')}>Create Transaction</Button>  
       <Button id="acclistbtn" variant="btn btn-success margin-5 " onClick={() => history.push('/AccList')}>Accounts List</Button> 
       <Button id="translistbtn" variant="btn btn-info margin-5 " onClick={() => history.push('/TransList')}>Transactions List</Button>  
       <legend />
       <NotificationContainer />
      </div>
    );
  }
}

export default App;
