import React, {Component} from 'react'
import {Modal, Button, Form, Col, Row} from 'react-bootstrap'
import PropTypes from 'prop-types';

class CreateUserModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = { description: '' };
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        fetch(this.props.formAction, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description: this.state.description})
        });

        this.setState({description: ''});
    }

    render() {
        const {onHide, show} = this.props;
        return (
            <Modal
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create a new User
                    </Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <p>
                            <Form.Group as={Row}
                                        controlId="main-login"
                                        action={this.props.action}
                                        method={this.props.method}
                                        onSubmit={this.onSubmit}
                                        >
                                <Form.Label column sm="2">
                                   First Name
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control placeholder="First Name" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                                <Form.Label column sm="2">
                                    Last Name
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control placeholder="Last Name" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control placeholder="email@example.com" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Password
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="password" placeholder="Password" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Confirm Password
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="password" placeholder="Confirm Password" />
                                </Col>
                            </Form.Group>
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
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