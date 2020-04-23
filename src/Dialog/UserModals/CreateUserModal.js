import React, {Component} from 'react'
import { Form, Col, Row} from 'react-bootstrap'
import PropTypes from 'prop-types';
import axios from 'axios';
import './CreateUserModal.css';
import { Dialog, DialogActions, DialogTitle, DialogContent, TextField, Button, Typography} from "@material-ui/core";

class CreateUserModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confPassword: '',
            errors: {
                firstNameCheck: true,
                lastNameCheck: true,
                emailCheck: true,
                passwordCheck: true
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
        const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return { errors: {
                firstNameCheck: this.state.firstName.length === 0,
                lastNameCheck: this.state.lastName.length === 0,
                emailCheck: !(expression.test(String(this.state.email).toLowerCase())),
                passwordCheck: !((this.state.password === this.state.confPassword) && (this.state.password.length !== 0 && this.state.confPassword.length !== 0)),
            }
            };

    };

    isValid = () => {
        this.setState(this.validate());
       return (!this.state.errors.firstNameCheck) && (!this.state.errors.lastNameCheck) && (!this.state.errors.emailCheck) && (!this.state.errors.passwordCheck)
    };

    onSubmit = e => {
        e.preventDefault();
        console.log(!this.isValid())
        if (!this.isValid()){
            console.log("Validation Error");

        } else {
            //console.log(!this.state.errors.firstNameCheck && !this.state.errors.lastNameCheck && this.state.errors.emailCheck && this.state.errors.passwordCheck)
            console.log(this.state);
            const user = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                confPassword: this.state.confPassword
            };

            axios.post(`http://localhost:8080/createuser`, user).then((response) => {
                const newResponse = {
                    response
                };
                this.setState(newResponse);
            }, (error) => {
                console.log(error);
            });
        }


    };


    render() {
        const {onHide, show} = this.props;
        return (
            <Dialog
                maxWidth="xs"
                fullWidth
                open={show}
                aria-labelledby="contained-modal-title-vcenter">
                <DialogTitle id="form-dialog-title">Create an account</DialogTitle>
                <DialogContent>
                    <form autoComplete="off">
                        <Row>
                                <TextField error={this.state.errors.firstNameCheck} label="First Name" name="firstName"
                                           onChange={this.onChange}/>
                        </Row>
                        <Row>
                                <TextField  error={this.state.errors.lastNameCheck} required name="lastName" label="Last Name"
                                           onChange={this.onChange}/>
                        </Row>
                        <Row>
                                <TextField error={this.state.errors.emailCheck} required label="Email" placeholder="email@example.com" name="email"
                                           onChange={this.onChange}/>
                        </Row>
                        <Row>
                                <TextField error={this.state.errors.passwordCheck} required type="Password" label="Password" name="password"
                                           onChange={this.onChange}/>
                        </Row>
                        <Row>
                                <TextField  id="filled-error-helper-text" error={this.state.errors.passwordCheck} required helperText={this.state.errors.passwordCheck ? "Passwords Don't Match or Is Empty" : ""} type="Password" label="Confirm Password" name="confPassword"
                                           onChange={this.onChange}/>
                        </Row>
                    </form>
                </DialogContent>
                <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.onSubmit}>
                            Submit
                        </Button>
                        <Button variant="contained" color="secondary" onClick={onHide} >Close</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

CreateUserModal.propTypes = {
    onHide: PropTypes.func,
    show: PropTypes.func
};

export default CreateUserModal;