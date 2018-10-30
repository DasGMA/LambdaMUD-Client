import React, { Component } from 'react';
import axios from 'axios';



const url = 'https://lambdamud-dasma.herokuapp.com/';

class Mud extends Component {
    state = {
        player: {
            name: '',
            title: '',
            description: '',
            uuid: ''
        },
        input: ''
    }

    componentDidMount() {
        let key = 'Token ' + localStorage.getItem('key');
        axios.get(`${url}api/adv/init`, { headers: {
            'Authorization': key
        }})
        .then(response => {
            this.setState({player: response.data})
        })
        .catch(error => {
            console.log(error.response);
        });
        console.log(key)
    }

    inputChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    submitHandler = (event) => {
        event.preventDefault();
        let key = 'Token ' + localStorage.getItem('key')
        
        if (this.state.input.startsWith('move')){
            const direction = this.state.input[5];
            console.log(direction)
            axios.post(`${url}api/adv/move`, { 'direction': direction}, 
            {headers: {
                'Authorization': key,
                'Content-Type': 'application/json'
            }})
            .then(response => {
                this.setState({player: response.data})
            })
        } else {
            console.log(this.state.input + ' is not a command.')
        }
        this.setState({input: ''})
    }

    handleLogout = () => {
        localStorage.clear();
        this.props.history.replace('/login');
    }
    
    render() {
        return (
            <div>
                <div className = 'game'>
                    <div>{this.state.player.name}</div>
                    <div>{this.state.player.title}</div>
                    <div>{this.state.player.description}</div>
                        <form onSubmit = {this.submitHandler}>
                            <input 
                                type = 'text'
                                placeholder = 'Commands'
                                name = 'input'
                                value = {this.state.input}
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