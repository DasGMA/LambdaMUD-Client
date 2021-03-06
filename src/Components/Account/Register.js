import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px',
        width: '100%',
        minHeight: '400px',
        margin: '100px auto 0 auto',
        padding: '5px',
        border: '1px solid silver',
        borderRadius: '5px',
        justifyContent: 'center',
        alignItems:' center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    link: {
        textDecoration: 'none',
        color: '#f4511e',
    }
}

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password1: '',
                password2: ''
            }
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('key');
        if (token) {
            this.props.history.replace('/mud')
        }
    }

    changeHandler = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        });
    }

    submitHandler = async (event, user) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://lambdamud-dasma.herokuapp.com/api/registration', user);
            const token = response.data.key;
            localStorage.setItem('key', token);
            window.location.reload();
        } catch (error) {
            console.log(error.response);
        }
    }


    render() { 
        const LinkToLogin = <Link to='/login' style={styles.link}>Login</Link>
        return (
            <Container className="App" onSubmit={(event) => this.submitHandler(event, this.state.user)}>
                <Form className="form" style={styles.form}>
                <h2 style={{color: '#183e2c'}}>Register</h2>
                <Col>
                    <FormGroup>
                    <Label style={{color: '#183e2c'}}>Username</Label>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.changeHandler}
                    />
                    </FormGroup>
                
                    <FormGroup>
                    <Label style={{color: '#183e2c'}}>Password</Label>
                    <Input
                        type="password"
                        name="password1"
                        id="password1"
                        placeholder="********"
                        value={this.state.password1}
                        onChange={this.changeHandler}
                    />
                    </FormGroup>
                
                    <FormGroup>
                    <Label style={{color: '#183e2c'}}>Verify Password</Label>
                    <Input
                        type="password"
                        name="password2"
                        id="password2"
                        placeholder="Enter your password again"
                        value={this.state.password2}
                        onChange={this.changeHandler}
                    />
                    </FormGroup>
                </Col>
                <Button style = {{margin: '10px'}} type='submit' block>Register</Button>
                <p className='text-dark' style={{fontSize: '0.7rem'}}>Have an account? {LinkToLogin}</p>
                </Form>
            </Container> 
         );
    }
}
 
export default Register;