import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import  LoginModal from './Dialog/UserModals/LoginModal'
import CreateUserModal from "./Dialog/UserModals/CreateUserModal";

const AppNavBar = () => {

    const [ modalShow, setModalShow ] = React.useState(false);
    const [ createModalShow, setCreateModalShow ] = React.useState(false);

        return (<Navbar bg="primary" variant="dark">
            <Navbar.Brand>MultiSolitare</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#features">Play Now</Nav.Link>
                    <NavDropdown title="Leaderboards" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Personal</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2"></NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <CreateUserModal show={createModalShow} onHide={() => setCreateModalShow(false)}/>
                    <Nav.Link onClick={() => setCreateModalShow(true)}>
                        Create A New Account
                    </Nav.Link>
                    <LoginModal show={modalShow} onHide={() => setModalShow(false)}/>
                    <Nav.Link onClick={() => setModalShow(true)}>
                        Login
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>)

}

export default AppNavBar;