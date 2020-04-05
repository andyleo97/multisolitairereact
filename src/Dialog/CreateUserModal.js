import React, {Component} from 'react'
import {Modal, Button, Form, Col, Row} from 'react-bootstrap'
import PropTypes from 'prop-types';
import axios from 'axios';


class CreateUserModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confPassword: ''
        };
    }

    onChange = e => {
        console.log('this: ', this)
        console.log("e.targe.name: ", e.target.name)
        console.log("e.targe.value: ", e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault()

        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            confPassword: this.state.confPassword
        }


        // POST request using fetch with error handling
        var config = {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': ['Content-Type', 'Authorization']
            }
        };
        // axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://127.0.0.1:8080';
        // axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'POST'
        // axios.defaults.headers.post['Access-Control-Allow-Headers'] = ['Content-Type', 'Authorization']
        axios.post(`http://localhost:8080/createuser`, {user}, config)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            // check for error response


            .catch(error => {
                this.setState({errorMessage: error});
                console.error('There was an error!', error);
            });

    }


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
                                        controlId="main-login"
                            >
                                <Form.Label column sm="2">
                                    First Name
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control placeholder="First Name" name="firstName" value={this.state.firstName}
                                                  onChange={this.onChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                                <Form.Label column sm="2">
                                    Last Name
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control placeholder="Last Name" name="lastName" value={this.state.lastName}
                                                  onChange={this.onChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control placeholder="email@example.com" name="email" value={this.state.email}
                                                  onChange={this.onChange}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Password
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="password" placeholder="Password" name="password"
                                                  value={this.state.password} onChange={this.onChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Confirm Password
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="password" placeholder="Confirm Password" name="confPassword"
                                                  value={this.state.confPassword} onChange={this.onChange}/>
                                </Col>
                            </Form.Group>
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.onSubmit}>
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