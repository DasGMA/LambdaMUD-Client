import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import {setPusherClient} from 'react-pusher';
//, secret='811469b470f2e5482ac3'
Pusher.logToConsole = true;

const socket = new Pusher('6865d3c825fc73daee61', {
    cluster: 'US2',
    forceTLS: true
});

setPusherClient(socket);

const url = 'https://lambdamud-dasma.herokuapp.com/';

class Mud extends Component {
    state = {
        title: '',
        description: '',
        players: '',
        messages: '',
        allMessages: []
    }

    componentDidMount() {

        let key = 'Token ' + localStorage.getItem('key');
        const header = { headers: {'Authorization': key} };

        axios.get(`${url}api/adv/init`, header)
        .then(response => {
            this.setState({title: response.data.title, description: response.data.description});
            let channel = socket.subscribe('p-channel-' + response.data.uuid);
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

    inputChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    submitHandler = (event) => {
        event.preventDefault();
        let key = 'Token ' + localStorage.getItem('key');
        let header = { headers: {
            'Authorization': key,
            'Content-Type': 'application/json'
        }};
        
        if (this.state.messages.startsWith('move')){
            const direction = this.state.messages[5].toLocaleLowerCase();
            console.log(direction)
            axios.post(`${url}api/adv/move`, { 'direction': direction}, header)
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

        } else if (this.state.messages.startsWith('say')){
            let message = {
                message: this.state.messages
            }
            console.log(message)
            axios.post(`${url}api/adv/say`, { 'message': message}, header)
            .then(response => {
                let pastMessages = this.state.allMessages.slice();
                this.setState({
                    allMessages: pastMessages, messages: ''
                });
            })
            .catch(error => {
                console.log(error.response);
            });
        }
        else {
            console.log(this.state.message + ' is not a command.')
        }
    }

    handleLogout = () => {
        localStorage.clear();
        this.props.history.push('/login')
    }
    
    render() {
        return (
            <div>
                <div className = 'game'>
                    <div>{this.state.title}</div>
                    <div>{this.state.description}</div>
                        <form onSubmit = {this.submitHandler}>
                            <input 
                                type = 'text'
                                placeholder = 'Commands'
                                name = 'messages'
                                value = {this.state.messages}
                                onChange = {this.inputChangeHandler}
                            /><button type = 'submit'>Post</button>
                        </form>
                </div>
                <button onClick = {this.handleLogout}>Logout</button>
            </div>
        );
    }
}

export default Mud;