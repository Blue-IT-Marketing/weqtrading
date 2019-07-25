import React, { Component } from 'react';


import Signup  from '../Signup/Signup';
import * as routes from '../../../constants/routes';
import PropTypes from "prop-types";
import {
    doDispatchChangePassword,
    doDispatchCreateUser,
    doDispatchLoginUser, doDispatchLogOutUser,
    doDispatchUserSignedIn,
    doDispatchUserSignedOut
} from "../../../actions/userAccountActions";
import { connect } from "react-redux";
import InlineError from "../../Forms/InlineError";
import InlineMessage from "../../Forms/InlineMessage";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showsignIn: true,
            signupText: 'SignUp',
            showsideScreen: true,

        };

        this.showSignUp = this.showSignUp.bind(this);

    };

    showSignUp = (e) => {

        let prevState = this.state.showsignIn;
        switch (prevState) {
            case true: this.setState({
                showsignIn: !prevState,
                signupText: 'Login',
            }); break;
            case false: this.setState({
                showsignIn: !prevState,
                signupText: 'Sign-Up',
            }); break;
            default: break;
        }
    };

    render() {
        return (

            <div className="sign-in">
                <div className="row">
                    <div className="col-md-3">
                        <div className="box box-header">
                            <h3 className="box-title"> <strong> <i className="fa fa-sign-in"> </i> Login </strong></h3>
                        </div>
                        <button className="btn btn-success btn-lg"
                            onClick={e => this.showSignUp(e)}>
                            <strong> <i className="fa fa-arrow-right"> </i> {this.state.signupText}</strong>
                        </button>
                    </div>
                    <div className="col-md-9">
                        {
                            (this.state.showsignIn) ?
                                <div>
                                    <SignInForm
                                        user={this.props.user}
                                        user_errors={this.props.user_errors}
                                        form_response={this.props.form_response}
                                        response_code={this.props.response_code}
                                    />
                                </div>
                                : <Signup />
                        }
                    </div>
                </div>

            </div>
        )
    }
};


const Initial_State = {
    email: '',
    password: ''
};

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...Initial_State };
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit = (event) => {
        event.preventDefault();
        const {
            email,
            password,
        } = this.state;


        // TODO- dispatch signin action here

        this.props.onLogin(email, password);
    };

    render() {
        const {
            user,
            user_errors,
            form_response,
            response_code
        } = this.props;

        return (
            <div className="box box-primary col-lg-6">

                <div className="box box-header">
                    <h3 className="box-title">
                        <strong> <i className="fa fa-sign-in"> </i> SignIn</strong>
                    </h3>
                </div>

                <div className={'box-body'}>
                    <form className="form-horizontal" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input className="form-control"
                                name={'email'}
                                value={user.email}
                                onChange={e => this.onChangeHandler(e)}
                                type="text"
                                placeholder="Email Address"
                            />
                            {(user_errors.email_error) ? <InlineError message={user_errors.email_error} /> : ''}
                        </div>

                        <div className="form-group">
                            <input className="form-control"
                                name={'password'}
                                value={user.password}
                                onChange={e => this.onChangeHandler(e)}
                                type="password"
                                placeholder="Password"
                            />
                            {(user_errors.password_error) ? <InlineError message={user_errors.password_error} /> : ''}
                        </div>
                        <div className="form-group">
                            <button
                                // disabled={isInvalid}
                                type="submit"
                                className="btn btn-success btn-lg"
                            >
                                <strong> <i className="fa fa-sign-in"> </i> Sign In</strong>
                            </button>
                            <button
                                //disabled={isInvalid}
                                type="signup"
                                className="btn btn-primary btn-lg"
                            >
                                <strong> <i className="fa fa-sign-out"> </i> Sign Up</strong>
                            </button>
                        </div>
                        <div className={'form-group'}>
                            {(form_response) ? <InlineMessage message={form_response} /> : ''}
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

export {
    SignInForm,
};

Login.propTypes = {
    user: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        displayName: PropTypes.string,
        photoURL: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        emailVerified: PropTypes.bool,
        phoneNumber: PropTypes.string,
        isAnonymous: PropTypes.bool,
        providerId: PropTypes.string,

        signing_in: PropTypes.bool.isRequired,
        user_signed_in: PropTypes.bool.isRequired,
        user_deleted: PropTypes.bool.isRequired,
        password_changed: PropTypes.bool.isRequired,
        email_verification_sent: PropTypes.bool.isRequired,
        onetime_pin_sent: PropTypes.bool.isRequired,

    }),
    user_errors: PropTypes.shape({
        displayName_error: PropTypes.string,
        photoURL_error: PropTypes.string,
        email_error: PropTypes.string,
        password_error: PropTypes.string,
        phoneNumber_error: PropTypes.string
    }),
    form_response: PropTypes.string,
    response_code: PropTypes.number

};

const mapStateToProps = (state) => {
    return {
        user: state.profile.account_details.user_account,
        form_response: state.profile.account_details.form_response,
        response_code: state.profile.account_details.response_code,
        user_errors: state.profile.account_details.user_account_errors,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        onUserSignedIN: (user) => {
            return dispatch(doDispatchUserSignedIn(user))
        },
        onUserSignedOut: (user) => {
            return dispatch(doDispatchUserSignedOut(user))
        },
        onLogin: (username, password) => {
            return dispatch(doDispatchLoginUser(username, password))
        },
        onLogout: (user) => {
            return dispatch(doDispatchLogOutUser(user))
        },
        onSignUp: (username, password) => {
            return dispatch(doDispatchCreateUser(username, password))
        },
        onChangePassword: (user) => {
            return dispatch(doDispatchChangePassword(user))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

