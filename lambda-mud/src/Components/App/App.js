import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {Container} from 'reactstrap';
import Register from '../Account/Register';
import Login from '../Account/Login';
import Home from '../Main/Home';
import Hello from '../Main/Hello';

class App extends Component {
  render() {
    return (
      <Container>
        <Route exact path='/' component={Hello} />
        <Route path='/home' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Container>
    );
  }
}

export default App;