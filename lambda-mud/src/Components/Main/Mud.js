import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import {setPusherClient} from 'react-pusher';
import {Jumbotron, Button, InputGroup, InputGroupAddon, Input, Alert} from 'reactstrap';
import Message from './Message';

//, secret='811469b470f2e5482ac3'
// '6865d3c825fc73daee61'
Pusher.logToConsole = true;

const pusherClient = new Pusher('6865d3c825fc73daee61', {cluster:'US2', forceTLS:true});

setPusherClient(pusherClient);

const url = 'https://lambdamud-dasma.herokuapp.com/';

class Mud extends Component {
    state = {
        title: '',
        description: '',
        players: '',
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
            this.setState({title: response.data.title, description: response.data.description});
            const channel = pusherClient.subscribe('p-channel-' + response.data.uuid);
            channel.bind('broadcast', data => {
                let newMessage = this.state.allMessages.slice();
                newMessage.push({name: data.name, message: data.message});
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
            console.log(direction)
            axios.post(`${url}api/adv/move`, direction, header)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    description: response.data.description,
                    messages: ''
                });
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
            console.log(message)
            axios.post(`${url}api/adv/say`, message, header)
            .then(response => {
                let pastMessages = this.state.allMessages.slice();
                pastMessages.push(response.data);
                console.log("response.data is:", response.data);
                this.setState({
                    allMessages: pastMessages, messages: ''
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
        return (
            <Jumbotron>
                <div className = 'game'>
                    <Alert color='success'><h2>{this.state.title}</h2></Alert>
                    <Alert color='info'><h3>{this.state.description}</h3></Alert>
                        <InputGroup  >
                            <InputGroupAddon addonType='prepend'>Action</InputGroupAddon>
                                <Input
                                    type = 'text'
                                    placeholder = 'Commands'
                                    name = 'messages'
                                    value = {this.state.messages}
                                    onChange = {this.inputChangeHandler}
                                />
                                <Button color = 'primary' onClick = {this.Input} >Post</Button>
                        </InputGroup>
                        <div className='messages'>
                            <h1>Messages</h1>
                            <div>
                                {this.state.allMessages ? (
                                    <div>
                                    {this.state.allMessages.map((message, index) => (
                                        <Message key={index} message={message}/>
                                    ))}
                                    </div>
                                ) : null}
                            </div>

                    </div>
                </div>
            </Jumbotron>
        );
    }
}

export default Mud;