import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import {setPusherClient} from 'react-pusher';
import {Label, Jumbotron, Button, InputGroup, InputGroupAddon, Input, Alert, Card, Container, Form, Tooltip} from 'reactstrap';
import Message from './Message';
import Navigation from './Navigation';

// key = '6865d3c825fc73daee61' ,cluster:'US2', forceTLS:true
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
        allPlayers: [],
        messages: '',
        allMessages: [],
        data: [],
        tooltipOpen: false
    }

    inputChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    componentDidMount() {
        let key = 'Token ' + localStorage.getItem('key');
        const header = { headers: {'Authorization': key} };

        axios.get(`${url}api/adv/init`, header)
        .then(response => {
            this.setState({
                title: response.data.title,
                description: response.data.description,
                players: response.data.players,
                data: response.data
            });
            const channel = pusherClient.subscribe('p-channel-' + response.data.uuid);
            channel.bind('broadcast', data => {
                const player = [...this.state.players];
                const test = data.message.split(' ');
                if (test[2] === 'entered'){
                    player.push(test[0])
                } else if (test[2] === 'walked'){
                    player.pop(player.indexOf(test[0]))
                }

                let newMessage = [...this.state.allMessages];
                newMessage.unshift({name: data.name, message: data.message});
                this.setState({
                    allMessages: newMessage,
                    players: player
                });
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

    tooltipToggle = () => {
        this.setState({tooltipOpen: !this.state.tooltipOpen});
    }
    
    render() {
        const allMessages = this.state.allMessages;
        const name = this.state.data.name;
        return (
            <Fragment>
            <Navigation name={name}/>
            <Jumbotron style={{marginTop: '10px', backgroundColor: 'rgba(255, 255, 255, 0.3)',}}>
                    
                    <Alert color='success'>
                    <Label style={{color: '#183e2c', textDecoration: 'underline'}}>Location:</Label>
                        <h2>{this.state.title}</h2>
                    </Alert>
                    <Alert color='info'>{this.state.description}</Alert>
                    <Alert style={{fontSize: '0.8rem'}} color='dark'>Players in a room: {this.state.players.join(', ')}</Alert>
                        <Form onSubmit={this.Input}>
                        <InputGroup >
                            <InputGroupAddon addonType='prepend' id='tooltip'>Actions</InputGroupAddon>
                            <Tooltip placement = 'top' isOpen = {this.state.tooltipOpen} target = 'tooltip' toggle={this.tooltipToggle}>
                            Directions: n, s, e, w or respective words.
                            Everything else will be sent as messages.
                            </Tooltip>
                                <Input
                                    type = 'text'
                                    name = 'messages'
                                    value = {this.state.messages}
                                    onChange = {this.inputChangeHandler}
                                />
                                <Button>Post</Button>
                        </InputGroup>
                        </Form>
                        <Container style={{marginTop: '15px'}}>
                            <p style={{color: 'black'}}>Messages & Chat history</p>
                            <Card style={{maxHeight:'200px', minHeight: '50px', overflow:'auto', padding: '5px'}}>
                                {allMessages? (
                                    
                                    allMessages.map((message, index) => (
                                        
                                        <Message key={index} message={message}/>
                                    ))
                                    
                                ) : null}
                            </Card>
                        </Container>
            </Jumbotron>
            </Fragment>
        );
    }
}

export default Mud;