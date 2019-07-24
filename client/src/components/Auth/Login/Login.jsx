import React, { Fragment,useRef,useReducer} from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../constants';

export default function Login() {

    function HandleSubmit(e){
        e.preventDefault();
        console.log('Handling Submit form');
    }
    
    return (
        <Fragment>
            <div className='box box-body'>
                <div className='box-header'>
                    <h3 className='box-title'>Login User</h3>    
                </div>

                <div className='box-footer'>                
                    <form className='form-horizontal' onSubmit={e => HandleSubmit(e)}>
                        <div className='form-group'>                            
                            <input type='text' className='form-control' name='loginName' placeholder='Login Name' />
                        </div>
                        <div className='form-group'>                            
                            <input type='password' className='form-control' name='password' placeholder='Password' />
                        </div>
                        <div className='form-group'>
                            <button type='submit' className='btn btn-success btn-lg'><strong> <i className='fa fa-sign-in'> </i> Login </strong></button>
                            <button type='reset' className='btn btn-primary btn-lg'><strong> <i className='fa fa-eraser'> </i> Cancel </strong></button>
                            <Link to={routes.forget_password_page}><button type='button' className='btn btn-warning btn-lg'><strong> <i className='fa fa-unlock'> </i> Forget Password </strong></button></Link>
                        </div>
                    </form>
                
                    
                </div>
                
            </div>
        </Fragment>
    )
}
