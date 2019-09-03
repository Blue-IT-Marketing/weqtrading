
import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

import * as routes from '../../../constants/routes';

import { auth } from '../../../firebase';



const SignUpPage = (props) => {
    return (
        <div className="sign-up">
            <div className="box box-header">
                <h3 className="box-title"> <strong> <i className='fa fa-sign-out'> </i> Sign Up</strong></h3>
                <div className='box-tools'>
                    <Link to={routes.login_page}>
                        <button
                            type='button'
                            className='btn btn-box-tool btn-lg'                            
                        ><strong><i className='fa fa-sign-in'> </i> Login </strong>
                        </button>    
                    </Link>

                </div>
            </div>

            <SignUpForm ShowLogin={props.ShowLogin}  />
        </div>
    );
};


const Initial_State = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};


const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});



class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...Initial_State };
    };

    onSubmit = (event) => {

        const {
            username,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...Initial_State });
                //history.push(routes.home_page);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();

    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <div className="col-md-6">
                <form className="form-horizontal" onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <input className="form-control"
                            value={username}
                            onChange={event => this.setState(byPropKey('username', event.target.value))}
                            type="text"
                            placeholder="Full Name"
                        />
                    </div>

                    <div className="form-group">
                        <input className="form-control"
                            value={email}
                            onChange={event => this.setState(byPropKey('email', event.target.value))}
                            type="text"
                            placeholder="Email Address"
                        />
                    </div>

                    <div className="form-group">
                        <input className="form-control"
                            value={passwordOne}
                            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="form-group">

                        <input className="form-control"
                            value={passwordTwo}
                            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                            type="password"
                            placeholder="Confirm Password"
                        />2
                    </div>
                    <div className="form-group">

                        <button 
                            disabled={isInvalid} 
                            type="submit" 
                            className="btn btn-success btn-lg">
                            <strong> <i className="fa fa-sign-in"> </i> Sign Up </strong>
                        </button>
                        <button
                            type='reset'
                            className='btn btn-warning btn-lg'
                        >
                            <strong> <i className='fa fa-eraser'> </i> Cancel  </strong>
                        </button>
                    </div>
                    {error && <p>{error.message}</p>}

                </form>

            </div>
        )
    };
}




export default SignUpPage;
export {
    SignUpForm
};