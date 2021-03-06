import React, {Component} from 'react'
import {Row} from 'react-bootstrap'
import PropTypes from 'prop-types';
import axios from 'axios';
import './CreateUserModal.css';
import {Alert} from "@material-ui/lab"
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar} from "@material-ui/core";

class CreateUserModal extends Component {
    MINIMUM_PASSWORD_LENGTH = 4

    constructor(props, context) {
        super(props, context);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confPassword: '',
            firstNameCheck: false,
            lastNameCheck: false,
            emailCheck: false,
            passwordCheck: false
        };
    }

    validateFirstName = e => {
        const val = e.target.value || ''
        this.setState({firstName: val, firstNameCheck: val.length === 0 ? 'Cannot be empty' : ''})
    }
    validateLastName = e => {
        const val = e.target.value || ''
        this.setState({lastName: val, lastNameCheck: val.length === 0 ? 'Cannot be empty' : ''})
    }
    validateEmail = e => {
        const val = e.target.value || ''
        // eslint-disable-next-line no-useless-escape
        const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.setState({
            email: val,
            emailCheck: !(expression.test(String(val).toLowerCase())) ? 'Invalid email format' : ''
        })
    }

    validatePassword = e => {
        const {password, confPassword} = this.state
        const cleanPassword = (e.target.name === 'password' ? e.target.value : password) || ''
        const cleanConfPassword = (e.target.name === 'confPassword' ? e.target.value : confPassword) || ''
        let errorMessage = cleanPassword !== cleanConfPassword ? 'Passwords don\'t match' : ''
        if (!errorMessage) {
            errorMessage = (cleanPassword.length < this.MINIMUM_PASSWORD_LENGTH) ? 'Password must have ' + this.MINIMUM_PASSWORD_LENGTH + ' characters' : ''
        }
        this.setState({
            password: cleanPassword,
            confPassword: cleanConfPassword,
            passwordCheck: errorMessage,
        })
    }

    isValid = () => {
        const {
            firstNameCheck, lastNameCheck, emailCheck, passwordCheck,
            firstName, lastName, email, password, confPassword
        } = this.state;
        return (!firstNameCheck) && (!lastNameCheck) && (!emailCheck) && (!passwordCheck) && firstName &&
            lastName && email && password && confPassword

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

        axios.post(`http://localhost:8080/createuser`, user).then((response) => {
            if (response.status === 208){
                this.setState({emailError : true, emailCheck : "Email already exists"})
                this.openError()
            }
            if (response.status === 200){
                this.hideDialog()
            }
            else {
                console.log(response)
            }
        }, (error) => {
            console.log(error);
        });
        // add response to Redux

    };


    clearState = () => {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confPassword: '',
            firstNameCheck: false,
            lastNameCheck: false,
            emailCheck: false,
            passwordCheck: false,
            emailError : false
        })
    }

    hideDialog = () => {
        const { onHide } = this.props
        this.clearState()
        onHide()
    }

    openError = () => {
        this.setState({openEmailError : true})
    }

    closeError = () => {
        this.setState({openEmailError : false})
    }



    render() {
        const {show} = this.props;
        const {firstNameCheck, lastNameCheck, emailCheck, passwordCheck} = this.state;
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
                            <TextField error={!!firstNameCheck} helperText={firstNameCheck} label="First Name"
                                       name="firstName"
                                       onChange={this.validateFirstName}/>
                        </Row>
                        <Row>
                            <TextField error={!!lastNameCheck} helperText={lastNameCheck} required name="lastName"
                                       label="Last Name"
                                       onChange={this.validateLastName}/>
                        </Row>
                        <Row>
                            <TextField error={!!emailCheck} helperText={emailCheck} required label="Email"
                                       placeholder="email@example.com"
                                       name="email"
                                       onChange={this.validateEmail}/>
                        </Row>
                        <Snackbar open={this.state.openEmailError} onClose={this.closeError}>
                            <Alert onClose={this.closeError} variant="filled" severity="error">
                                Email already exists
                            </Alert>
                        </Snackbar>
                        <Row>
                            <TextField error={!!passwordCheck} required type="Password" label="Password" name="password"
                                       onChange={this.validatePassword}/>
                        </Row>
                        <Row>
                            <TextField id="filled-error-helper-text" error={!!passwordCheck} required
                                       helperText={passwordCheck}
                                       type="Password" label="Confirm Password" name="confPassword"
                                       onChange={this.validatePassword}/>
                        </Row>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button disabled={!this.isValid()} variant="contained" color="primary" onClick={this.onSubmit}>
                        Submit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={this.hideDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

CreateUserModal.propTypes = {
    onHide: PropTypes.func,
    show: PropTypes.bool
};

export default CreateUserModal;