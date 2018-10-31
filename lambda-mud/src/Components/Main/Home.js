import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
 } from 'reactstrap';
import Mud from './Mud';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isOpen: false,
          authorized: false
        };
    }

    toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    handleLogout = () => {
        localStorage.clear();
        window.location.replace('/')
    }

    componentDidMount(){
        let token = localStorage.getItem('key');
        if (token){
            this.setState({authorized: true});
        };
    }



    render() {
        let loggedOut = <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/register">Register</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
        let loggedIn =  <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href='#' onClick={this.handleLogout} >Logout</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
        
        return (
            <div>
                <Navbar color="light" light expand="md">
                <NavbarBrand href="/home">MUD-DY</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                {this.state.authorized ? loggedIn : loggedOut}
                </Navbar>
                {this.state.authorized ? <Mud /> : null}
            </div>
        );
    }
}

export default Home;