import React, { Component } from 'react';
import {Container, Jumbotron, Alert, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

const styles = {
    jumbo: {
        height: '500px',
        marginTop: '100px',
        display: 'flex',
        border: '1px solid silver',
        borderRadius: '5px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    alert: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

    },
    button: {
        width: '100px',
        margin: '10px',
        display: 'block'

    }

}

class Hello extends Component {
    
    render() {
        return (
            <Container>
                <Jumbotron style={styles.jumbo}>
                    <Alert style={styles.alert} color='dark'><h2 style={{color: '#183e2c'}}>Welcome to MUD-DY adventures!</h2>
                    <Button style={styles.button}><Link style={{color: 'inherit', textDecoration: 'none'}} to='/login'>Login</Link></Button>
                    <Button style={styles.button}><Link style={{color: 'inherit', textDecoration: 'none'}} to='/register'>Register</Link></Button>
                    </Alert>
                </Jumbotron>
            </Container>
        );
    }
}


export default Hello;