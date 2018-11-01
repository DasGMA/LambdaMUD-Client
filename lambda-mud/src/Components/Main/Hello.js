import React, { Component } from 'react';
import {Container, Jumbotron, Alert} from 'reactstrap';
import {Link} from 'react-router-dom';

const styles = {
    jumbo: {
        height: '500px',
        marginTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
}

class Hello extends Component {
    
    render() {
        return (
            <Container>
                <Jumbotron style={styles.jumbo}>
                    <Alert color='dark'><h2>Welcome to MUD-DY!</h2>
                        <br/>
                    <Link to='/login' style={{textDecoration: 'none'}}><h3 className='text-success'>Login</h3></Link>
                    <Link to='/register' style={{textDecoration: 'none'}}><h3 className='text-danger'>Register</h3></Link>
                    </Alert>
                    
                </Jumbotron>
            </Container>
        );
    }
}


export default Hello;