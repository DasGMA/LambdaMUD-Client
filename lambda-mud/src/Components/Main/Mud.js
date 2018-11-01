import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import {setPusherClient} from 'react-pusher';
import {Jumbotron, Button, InputGroup, InputGroupAddon, Input, Alert, Card, Container, Form} from 'reactstrap';
import Message from './Message';

// secret = '811469b470f2e5482ac3'
// key = '6865d3c825fc73daee61'
Pusher.logToConsole = true;

const pusherClient = new Pusher('6865d3c825fc73daee61',
                                {cluster:'US2', forceTLS:true}
                                );

setPusherClient(pusherClient);

const url = 'https://lambdamud-dasma.herokuapp.com/';

class Mud extends Component {
    state = {
        title: '',
        description: '',
        players: [],
        messages: '',
        allMessages: []
    }

    inputChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    componentDidMount() {

        let key = 'Token ' + localStorage.getItem('key');
        const header = { headers: {'Authorization': key} };

        axios.get(`${url}api/adv/init`, header)
        .then(response => {
            this.setState({title: response.data.title, description: response.data.description, players: response.data.players});
            const channel = pusherClient.subscribe('p-channel-' + response.data.uuid);
            channel.bind('broadcast', data => {
                let newMessage = [...this.state.allMessages];
                newMessage.unshift({name: data.name, message: data.message});
                this.setState({allMessages: newMessage});
            });
        })
        .catch(error => {
            console.log(error.response);
        });
    }

    Go = (event) => {
        event.preventDefault();
        let key = 'Token ' + localStorage.getItem('key');
        let header = { headers: {
            'Authorization': key,
            'Content-Type': 'application/json'
        }};
        
        let moving = this.state.messages[0].toLowerCase();
        const direction = {direction: moving};
        axios.post(`${url}api/adv/move`, direction, header)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    description: response.data.description,
                    players: response.data.players,
                    messages: ''
                });
                console.log(response.data.players)
            })
            .catch(error => {
                console.log(error.response);
            });
        }

    Messaging = (event) => {
        event.preventDefault();
        let key = 'Token ' + localStorage.getItem('key');
        let header = { headers: {
            'Authorization': key,
            'Content-Type': 'application/json'
        }};
        let message = {
            message: this.state.messages
        }
        axios.post(`${url}api/adv/say`, message, header)
            .then(response => {
                const allMessages = [...this.state.allMessages];
                allMessages.unshift(response.data);
                console.log(response.data)
                this.setState({
                    allMessages: allMessages, messages: ''
                });
            })
            .catch(error => {
                console.log(error.response);
            });
        }

    Input = (event) => {
        let move = this.state.messages;
            if (
                move === 'north' ||
                move === 'east' ||
                move === 'south' ||
                move === 'west' ||
                move === 'n' ||
                move === 'e' ||
                move === 's' ||
                move === 'w'

            ) {
                this.Go(event)
            } else {
                this.Messaging(event)
            }
    };
    
    render() {
        const allMessages = this.state.allMessages;
        return (
            <Jumbotron style={{marginTop: '10px'}}>
                
                    <Alert color='success'><h2>{this.state.title}</h2></Alert>
                    <Alert color='info'><h3>{this.state.description}</h3></Alert>

                        <Form onSubmit={this.Input}>
                        <InputGroup >
                            <InputGroupAddon addonType='prepend'>Actions</InputGroupAddon>
                                <Input
                                    type = 'text'
                                    placeholder = 'Commands'
                                    name = 'messages'
                                    value = {this.state.messages}
                                    onChange = {this.inputChangeHandler}
                                />
                                <Button color='primary'>Post</Button>
                        </InputGroup>
                        </Form>
                        <Container style={{marginTop: '15px'}}>
                            <h4>Messages</h4>
                            <Card style={{maxHeight:'200px', minHeight: '50px', overflow:'auto', padding: '5px'}}>
                                {allMessages? (
                                    <div>
                                    {allMessages.map((message, index) => (
                                        
                                        <Message key={index} message={message}/>
                                    ))}
                                    </div>
                                ) : null}
                            </Card>
                        </Container>
            </Jumbotron>
        );
    }
}

export default Mud;