import React, { Fragment, useEffect, useContext, useRef,useState } from "react";
import { Link,Redirect ,navigate} from "react-router-dom";
import { routes } from "../../../constants";
import {user_init,user_errors_init, inline_init} from '../auth-constants';

import {UserAccountContext} from '../../../context/UserAccount/userAccountContext';

import Input from '../../Input/Input';
import InlineError from "../../Forms/InlineError";
import { Utils } from "../../../utilities";
import InlineMessage from "../../Forms/InlineMessage";

export default function Login() {

  const [values,setValues] = useState(user_init);
  const [errors,setErrors] = useState(user_errors_init);
  const [inline,setInline] = useState(inline_init);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const submitRef = useRef(null);

  const [displayMenu, setMenu] = useState({ menu: false });

  const showDropdownMenu = e => {
    e.preventDefault();
    setMenu({ menu: true });
    document.addEventListener("click", hideDropdownMenu);
  };

  const hideDropdownMenu = () => {
    setMenu({ menu: false });
    document.removeEventListener("click", hideDropdownMenu);
  };

	  

  	const handleChange = e => {
        setValues({...values,[e.target.name]:e.target.value})
    };
    
    const checkErrors = async e => {
      let isError = false;
      const check_username = () => {
        if(Utils.validateEmail(values.username) === false){
            setErrors({...errors, username_error: 'invalid username'});
            return true;
        }
          return false;      
      };

      const check_password = () => {
        if(Utils.isEmpty(values.password)){
          setErrors({...errors,password_error:'password field cannot be empty'});
          return true;
        }
        return false;
      };

      const do_check = () => {
        check_username() ? isError = true : isError = isError;
        check_password() ? isError = true : isError = isError;

        return isError
      };
      return await do_check()
    };

  useEffect(() => {
	  usernameRef.current.focus();  
      
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
                <div className="dropdown">
                  <button
                    type="button"
                    className="btn btn-box-tool dropdown-toggle"
                    onClick={e => showDropdownMenu(e)}
                  >
                    <i className='fa fa-bars'> </i>{" "}
                  </button>
                  {displayMenu.menu ? (
                    <ul className="dropmenu">
                      <li
                        className="btn btn-block droplink"
                      >
                      <Link to={routes.forget_password_page}>
                            <i className="fa fa-unlock"> </i> Forget Password
                      </Link>
                      </li>
                      <li
                        className="btn btn-block droplink"
                      ><Link to={routes.signup_page}>
                            <i className="fa fa-sign-in"> </i> Subscribe
                      </Link>
                      </li>
                    </ul>
                  ):null
                  }

                </div>

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
                  {errors.username_error ? (
                    <InlineError message={errors.username_error} />
                  ) : (
                    ""
                  )}
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
                  {errors.password_error ? (
                    <InlineError message={errors.password_error} />
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-success btn-lg"
                    ref={submitRef}
                    onClick={e =>
                      checkErrors(e).then(isError => {
                        isError
                          ? setInline({
                              message: "error processing login ",
                              message_type: "error"
                            })
                          : doLogin(username, password);
                      })
                    }
                  >
                    <strong>
                      <i className="fa fa-sign-in"> </i> Login
                    </strong>
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning btn-lg"
                    onClick={e => {
                      setValues(user_init);
                      setErrors(user_errors_init);
                      setInline(inline_init);
                    }}
                  >
                    <strong>
                      <i className="fa fa-eraser"> </i> Reset
                    </strong>
                  </button>
                </div>
                <div className="form-group">
                  {inline.message ? (
                    <InlineMessage
                      message={inline.message}
                      message_type={inline.message_type}
                    />
                  ) : (
                    ""
                  )}
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
