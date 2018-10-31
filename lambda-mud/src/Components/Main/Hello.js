import React, { Component } from 'react';
import {Container, Jumbotron, Alert} from 'reactstrap';
import {Link} from 'react-router-dom';


class Hello extends Component {
    
    render() {
        return (
            <Container>
                <Jumbotron style = {{height: '500px', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Alert color='dark'><h2>Welcome to MUD-DY!</h2>
                        <br/>
                        <Link to='/home'><h3>Enter the MUD-DY World!!!</h3></Link>
                    </Alert>
                    
                </Jumbotron>
            </Container>
        );
    }
}


export default Hello;