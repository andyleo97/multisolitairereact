import React, {Component} from 'react'
import { Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button} from "@material-ui/core"
import {Alert, AlertTitle} from "@material-ui/lab"
import axios from "axios";

class LoginModal extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            email: '',
            password: '',
            emailCheck: false,
            passwordCheck: false
        };
    }

    validatePassword = e => {
        const {password} = this.state
        const cleanPassword = (e.target.name === 'password' ? e.target.value : password) || ''
        let errorMessage = (cleanPassword.length < 0) ? 'You must enter a password '  : ''
        this.setState({
            password: cleanPassword,
            passwordCheck: errorMessage,
        })
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

    hideDialog = () => {
        const { onHide } = this.props
        this.clearState()
        onHide()
    }

    isValid = () => {
        const {
            emailCheck, passwordCheck, email, password
        } = this.state;
        return (!emailCheck) && (!passwordCheck) && email && password

    };

    onSubmit = e => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        };

        axios.post(`http://localhost:8080/login`, user).then((response) => {
            const newResponse = { response };
            this.setState(newResponse);
            console.log(response)
        }, (error) => {
            console.log(error);
        });
        // add response to Redux
        this.hideDialog()
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
            passwordCheck: false
        })
    }




    render() {
        const { emailCheck, passwordCheck} = this.state;
        const { show } = this.props;
        return (
            <Dialog
                maxWidth="xs"
                fullWidth
                open={show}
                aria-labelledby="contained-modal-title-vcenter">
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    This is an error alert — <strong>check it out!</strong>
                </Alert>
                <DialogContent>
                    <form autoComplete="off">
                        <Row>
                            <TextField error={!!emailCheck} helperText={emailCheck} required label="Email"
                                       placeholder="email@example.com"
                                       name="email"
                                       fullWidth
                                       onChange={this.validateEmail}/>

                        </Row>
                        <Row>
                            <TextField error={!!passwordCheck} required type="Password" label="Password" name="password"
                                       onChange={this.validatePassword} fullWidth/>
                        </Row>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button disabled={!this.isValid()} variant="contained" color="primary" onClick={this.onSubmit}>
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" onClick={this.hideDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

LoginModal.propTypes = {
    onHide: PropTypes.func,
    show: PropTypes.bool
};

export default LoginModal;