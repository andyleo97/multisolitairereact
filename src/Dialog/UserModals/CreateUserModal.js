import React, {Component} from 'react'
import {Modal, Button, Form, Col, Row} from 'react-bootstrap'
import PropTypes from 'prop-types';
import axios from 'axios';
import './CreateUserModal.css';


class CreateUserModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confPassword: '',
            buttonDisabled: true,
            errors: {
                firstNameCheck: false,
                lastNameCheck: false,
                emailCheck: false,
                passwordCheck: false
            }
        };
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
        this.setState(this.validate());
    };

    validate = () => {
        // true means invalid, so our conditions got reversed
        return { errors: {
                firstNameCheck: this.state.firstName.length === 0,
                lastNameCheck: this.state.lastName.length === 0,
                emailCheck: this.state.email.length === 0,
                passwordCheck: this.state.password === this.state.confPassword,
            }
        };
    };

    onSubmit = e => {
        e.preventDefault();
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            confPassword: this.state.confPassword
        };



        axios.post(`http://localhost:8080/createuser`, user)
    };


    render() {
        const {onHide, show} = this.props;
        return (
            <Modal
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton onClick={onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create a new User
                    </Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <p>
                            <Form.Group as={Row}
                                        controlId="main-login">
                                <Form.Label column sm="2">
                                    First Name
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control className={this.state.errors.firstNameCheck ? "error" : ""} placeholder="First Name" name="firstName" value={this.state.firstName}
                                                    onChange={this.onChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                                <Form.Label column sm="2">
                                    Last Name
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control className={this.state.errors.lastNameCheck ? "error" : ""} placeholder="Last Name" name="lastName" value={this.state.lastName}
                                                  onChange={this.onChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control className={this.state.errors.emailCheck ? "error" : ""} placeholder="email@example.com" name="email" value={this.state.email}
                                                  onChange={this.onChange}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Password
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control className={this.state.errors.passwordCheck ? "error" : ""} type="password" placeholder="Password" name="password"
                                                  value={this.state.password} onChange={this.onChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Confirm Password
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control className={this.state.errors.passwordCheck ? "error" : ""} type="password" placeholder="Confirm Password" name="confPassword"
                                                  value={this.state.confPassword} onChange={this.onChange}/>
                                </Col>
                            </Form.Group>
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.onSubmit} disabled={this.state.buttonDisabled}>
                            Submit
                        </Button>
                        <Button onClick={onHide}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

CreateUserModal.propTypes = {
    onHide: PropTypes.func,
    show: PropTypes.func
};

export default CreateUserModal;