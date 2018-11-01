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
        height: '300px',
        margin: '100px auto 0 auto',
        padding: '5px',
        border: '1px solid silver',
        borderRadius: '5px',
        justifyContent: 'center',
        alignItems:' center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    link: {
        textDecoration: 'none',
        color: '#f4511e',
    }
}


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {
                username: '',
                password: '',
            }
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('key');
        if (token) {
            this.props.history.replace('/home')
        }
    }

    changeHandler = (event) => {
        this.setState({ user: {
            ...this.state.user,
            [event.target.name]: event.target.value 
        }});
    }

    submitHandler = async (event, user) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://lambdamud-dasma.herokuapp.com/api/login', user);
            const token = response.data.key;
            localStorage.setItem('key', token);
            window.location.reload();
        } catch (error) {
            console.log(error.response, 'Something went wrong.')
        }
    }


    render() { 
        const LinkToRegister = <Link to='/register' style={styles.link}>Register</Link>
        return (
            <Container className="App" onSubmit={(event) => this.submitHandler(event, this.state.user)}>
                <Form className="form" style={styles.form}>
                <h2>Login</h2>
                <Col>
                    <FormGroup>
                    <Label>Username</Label>
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
                    <Label for="examplePassword">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="********"
                        value={this.state.password}
                        onChange={this.changeHandler}
                    />
                    </FormGroup>
                </Col>
                <Button type='submit'>Login</Button>
                <p className='text-muted' style={{fontSize: '0.7rem'}}>Don't have an account? {LinkToRegister}</p>
                </Form>
            </Container> 
         );
    }
}
export default Login;