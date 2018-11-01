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

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isOpen: false,
          authorized: false,
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
        let loggedIn =  <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink style={{color: 'white'}} disabled href='#' >{this.props.name}</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink style={{color: 'white'}} href='#' onClick={this.handleLogout} >Logout</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
        
        return (
            <div>
                <Navbar style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}} color="dark" dark expand="md">
                <NavbarBrand style={{color: 'white'}} href="/home">MUD-DY</NavbarBrand>                
                <NavbarToggler onClick={this.toggle} />
                {this.state.authorized ? loggedIn : null}
                </Navbar>
            </div>
        );
    }
}

export default Navigation;