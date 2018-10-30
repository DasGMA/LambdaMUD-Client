import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Register from '../Account/Register';
import Login from '../Account/Login';
import Mud from '../Main/Mud';



class App extends Component {
  render() {
    return (
      <div className='App'>
      
        <Route exact path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/mud' component={Mud} />
        
      </div>
    );
  }
}

export default App;