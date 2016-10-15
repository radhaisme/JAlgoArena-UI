import React from "react";
import {Navbar, Nav, NavItem} from "react-bootstrap";
import FontAwesome from './FontAwesome';
import {LinkContainer} from 'react-router-bootstrap';

const logoStyle = {
    display: "inline-block",
    height: 35,
    marginTop: -5
};

export default class Menu extends React.Component {

    render() {
        return (
            <Navbar fixedTop fluid>
                <Navbar.Header>
                    <Navbar.Toggle/>
                    <a className="navbar-brand" href="/"><img src="img/logo.png" style={logoStyle}/></a>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav role="navigation" pullRight id="menu">
                        <LinkContainer to="/">
                            <NavItem><FontAwesome name="home" lg={true}/> Home</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/problems">
                            <NavItem><FontAwesome name="lightbulb-o" lg={true}/> Problems</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/leaderboard">
                            <NavItem><FontAwesome name="trophy" lg={true}/> Rank</NavItem>
                        </LinkContainer>
                        {this.profileOrLoginMenuItem()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

    profileOrLoginMenuItem() {
        return this.props.store.getState().userAuthSession.user
            ? <LinkContainer to="/profile">
                <NavItem><FontAwesome name="user" lg={true}/> Profile</NavItem>
            </LinkContainer>
            : <LinkContainer to="/login">
                <NavItem><FontAwesome name="sign-in" lg={true}/> Login</NavItem>
            </LinkContainer>;
    }
}
