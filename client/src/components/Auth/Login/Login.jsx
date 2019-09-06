import React, { Fragment, useEffect, useContext, useRef,useState } from "react";
import { Link,Redirect ,navigate} from "react-router-dom";
import { routes } from "../../../constants";


import {UserAccountContext} from '../../../context/UserAccount/userAccountContext';

import Input from '../../Input/Input';

export default function Login() {

	const [values,setValues] = useState({username:'',password:''})

  	const usernameRef = useRef(null);
  	const passwordRef = useRef(null);
  	const submitRef = useRef(null);

  	let handleChange = e => {
		const {name,value} = e.target;	
		console.log('Name : ',name,' Value : ',value)  
	  	setValues({
		  ...values,
		  [name]:value
		  });
		  
		  console.log(values);
  	};

  useEffect(() => {
	usernameRef.current.focus();  
    console.log("Login page loaded");
  }, []);

  return (
    <UserAccountContext.Consumer>{(context) => {
      console.log("The big loggin context",context);
      const {
        doLogin,
        user_account_state
      } = context;
      const {
        username,password
      } = values;
      return (
        <Fragment>
          <div className="box box-body">
            <div className="box-header">
              <h3 className="box-title">
                <strong>
                  <i className="fa fa-sign-in"> </i> Login User
                </strong>
              </h3>

              <div className="box-tools">
                <Link to={routes.forget_password_page}>
                  <button type="button" className="btn btn-box-tool">
                    <strong>
                      <i className="fa fa-unlock"> </i> Forget Password
                    </strong>
                  </button>
                </Link>
              </div>
            </div>
            <div className="box-footer">
              <form
                className="form-horizontal"
                onSubmit={e => doLogin(username, password)}
              >
                <div className="form-group">
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Login Name"
                    ref={usernameRef}
                    value={values.username}
                    onChange={e => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    ref={passwordRef}
                    value={values.password}
                    onChange={e => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-success btn-lg"
                    ref={submitRef}
                    onClick={e => {
                      doLogin(username, password);
                      //navigate("/", true);
                    }}
                  >
                    <strong>
                      <i className="fa fa-sign-in"> </i> Login
                    </strong>
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-warning btn-lg"
                    onClick={e => {return setValues({username:'',password:''})}}
                    >
                    <strong>
                      <i className="fa fa-eraser"> </i> Reset
                    </strong>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      );
    }}
    </UserAccountContext.Consumer>
  );
}
