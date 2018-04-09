import React from 'react';
import {Navbar, MenuItem, Nav} from 'react-bootstrap';

const MyNavbar = (props) => {
    return (
    <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
            <a href="/dashboard">Forex-Portfolio</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight>
            <MenuItem href="/dashboard">Dashboard</MenuItem>
            <MenuItem href="/watchlist">Portfolio</MenuItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    );
};

export default MyNavbar;
