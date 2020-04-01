import React, {Component} from 'react'
import {Modal, Button, Form, Col, Row} from 'react-bootstrap'
import PropTypes from 'prop-types';

class LoginModal extends Component {
    constructor(props) {
        super(props)
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
                        Login
                    </Modal.Title>
                </Modal.Header>
                <Form>
                <Modal.Body>

                    <p>

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

LoginModal.propTypes = {
    onHide: PropTypes.func,
    show: PropTypes.func
};

export default LoginModal;