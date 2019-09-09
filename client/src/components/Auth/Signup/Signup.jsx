
import React, {Fragment,useState,useContext,useEffect} from 'react';
import { NavLink, Link } from 'react-router-dom';
import * as routes from '../../../constants/routes';
import { auth } from '../../../firebase';
import {UserAccountContext} from '../../../context/UserAccount/userAccountContext';
import { extended_user, extended_user_error, inline_init, user_init, user_errors_init } from '../auth-constants';
import InlineError from '../../Forms/InlineError';
import InlineMessage from '../../Forms/InlineMessage';
import { Utils } from '../../../utilities';

    // onSubmit = event => {
    //   const { username, email, passwordOne } = this.state;

    //   const { history } = this.props;

    //   auth
    //     .doCreateUserWithEmailAndPassword(email, passwordOne)
    //     .then(authUser => {
    //       this.setState({ ...Initial_State });
    //       //history.push(routes.home_page);
    //     })
    //     .catch(error => {
    //       this.setState(byPropKey("error", error));
    //     });

    //   event.preventDefault();
    // };



const SignUp = () => {
    const [user,setUser] = useState(extended_user);
    const [errors,setErrors] = useState(extended_user_error);
    const [inline,setInline] = useState(inline_init);
    const { doLogin, user_account_state} = useContext(UserAccountContext);

    const createUser = async e => {
            await auth.doCreateUserWithEmailAndPassword(user.email,user.password).then(authUser => {
                console.log(authUser);
                setInline({message:'user successfully created', message_type:'info'});
            }).catch(error => {
                setInline({message:error.message,message_type:'error'});
            });

            return true;
    };

    // names: "",
    // surname: "",
    // cell: "",
    // email: "",
    // password: "",
    // repeatpassword: ""


    const checkErrors = async e => {
        let isError = false;

        const check_names = () => {
            if(Utils.isEmpty(user.names)){
                setErrors({...errors,names_error : 'names field cannot be empty'});
                return true;
            };
            return false;
        }
        const check_surname = () => {
            if(Utils.isEmpty(user.surname)){
                setErrors({...errors,surname_error: 'surname field cannot be empty'})
                return true;
            }
            return false;
        }
        const check_cell = () => {
            if(Utils.isCell(user.cell) === false){
                setErrors({...errors,cell_error:'cell field is invalid'});
                return true;
            }
            return false;
        }
        const check_email = () => {
            if(Utils.validateEmail(user.email) === false){
                setErrors({...errors,email_error:'email address is invalid'});
                return true;
            }
            return false;
        }
        const check_password = () => {
            if(Utils.isEmpty(user.password)){
                setErrors({...errors, password_error : 'password field cannot be empty'});
                return true;
            }
            return false;
        }
        const check_password_two = () => {
            if (user.password !== user.repeatpassword){
                setErrors({...errors, repeatpassword_error:'passwords do not match'});
                return true;
            }
            return false;
        }

        const do_check = () => {
            check_names() ? isError = true : isError = isError;
            check_surname() ? isError = true : isError = isError;
            check_cell() ? isError = true : isError = isError;
            check_email() ? isError = true : isError = isError;
            check_password() ? isError = true : isError = isError;
            check_password_two() ? isError = true : isError = isError;

            return isError
        };

        return await do_check();
    }

    return (
      <Fragment>
        <div className="box box-warning">
          <div className="box box-header">
            <h3 className="box-title">
              <strong>
                {" "}
                <i className="fa fa-sign-out"> </i> Sign Up
              </strong>
            </h3>

            <div className="box-tools">
              <Link to={routes.login_page}>
                <button type="button" className="btn btn-box-tool btn-lg">
                  <strong>
                    <i className="fa fa-sign-in"> </i> Login{" "}
                  </strong>
                </button>
              </Link>
            </div>
          </div>
        
        
            <form className='form-horizontal col-md-6'>
                <div className='form-group'>
                    <input
                        type='text'
                        className='form-control'
                        name='names'
                        placeholder='Names...'
                        value={user.names}
                        onChange={e => setUser({...user,[e.target.name]:e.target.value})}

                    />
                    {errors.names_error ? <InlineError message={errors.names_error} /> : ''}
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        className='form-control'
                        name='surname'
                        placeholder='Surname...'
                        value={user.surname}
                        onChange={e => setUser({...user,[e.target.name]:e.target.value})}

                    />
                    {errors.surname_error ? <InlineError message={errors.surname_error} /> : ''}
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        className='form-control'
                        name='cell'
                        placeholder='Cell...'
                        value={user.cell}
                        onChange={e => setUser({...user,[e.target.name]:e.target.value})}

                    />
                    {errors.cell_error ? <InlineError message={errors.cell_error} /> : ''}
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        className='form-control'
                        name='email'
                        placeholder='Email...'
                        value={user.email}
                        onChange={e => setUser({...user,[e.target.name]:e.target.value})}

                    />
                    {errors.email_error ? <InlineError message={errors.email_error} /> : ''}
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        className='form-control'
                        name='password'
                        placeholder='Password...'
                        value={user.password}
                        onChange={e => setUser({...user,[e.target.name]:e.target.value})}
                    />
                    {errors.password_error ? <InlineError message={errors.password_error} /> : ''}
                </div>

                <div className='form-group'>
                    <input
                        type='text'
                        className='form-control'
                        name='repeatpassword'
                        placeholder='Repeat Password...'
                        value={user.repeatpassword}
                        onChange={e => setUser({...user,[e.target.name]:e.target.value})}
                    />
                    {errors.repeatpassword_error ? <InlineError message={errors.repeatpassword_error} /> : ''}
                </div>
                <div className='form-group'>
                    <button
                        type='button'
                        className='btn btn-success btn-lg'
                        name='signup'
                        onClick={e => checkErrors(e).then(isError => {
                            isError ?
                                setInline({message: 'error processing form',message_type:'error'})
                            :   createUser(e).then(result => {

                            });
                        })}
                    >
                        <i className='fa fa-sign-in'> </i>{' '}
                        Sign Up
                    </button>
                    <button
                        type='button'
                        className='btn btn-warning btn-lg'
                        name='reset'
                        onClick={e => {
                            setUser(extended_user);
                            setErrors(extended_user_error);
                            setInline(inline_init);
                        }}
                    >
                        <i className='fa fa-eraser'> </i>{' '}
                        Reset
                    </button>

                </div>
                <div className='form-group'>
                    {inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type} /> : ''}
                </div>

            </form>
        </div>
      </Fragment>
    );
};



export default SignUp