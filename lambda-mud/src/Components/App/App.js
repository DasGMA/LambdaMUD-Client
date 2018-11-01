import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {Container} from 'reactstrap';
import Register from '../Account/Register';
import Login from '../Account/Login';
import Hello from '../Main/Hello';
import Mud from '../Main/Mud';

class App extends Component {
  render() {
    return (
      <Container>
        <Route exact path='/' component={Hello} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/mud' component={Mud} />
      </Container>
    );
  }
}

export default App;