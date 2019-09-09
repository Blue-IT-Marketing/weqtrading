import React, { Fragment,useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import * as routes from '../../../constants/routes';
import { inline_init } from '../auth-constants';
import InlineMessage from '../../Forms/InlineMessage';

export default function Forget(){
  const [email,setEmail] = useState({email:''});
  const [errors,setErrors] = useState({email_error : ''});
  const [inline,setInline] = useState(inline_init);


	function sendRecoveryEmail  (e) {
		e.preventDefault();
    console.log('Sending Recovery Email');      
    setInline({message:'sending recovery email',message_type:'info'});
    // TODO create a backend firebase function to send recovery email and trigger through https
    // actually call a firebase function that sends a recovery email from firebase
	}

	return (
    <Fragment>
      <div className="box box-body">
        <div className="box-header">
          <h3 className="box-title">
            {" "}
            <strong>
              {" "}
              <i className="fa fa-key"> </i> Forget Password
            </strong>{" "}
          </h3>

          <div className="box-tools">
            <Link to={routes.login_page}>
              <button type="button" className="btn btn-box-tool">
                <strong>
                  <i className="fa fa-sign-in"> </i> Login
                </strong>
              </button>
            </Link>
          </div>
        </div>

        <div className="box box-footer">
          <form
            className="form-horizontal"
            onSubmit={e => sendRecoveryEmail(e)}
          >
            <div className="form-group">
              <span>
                Enter your username so what we can send you a password recovery
                message
              </span>
            </div>
            <div className="form-group">
			  <input 
				  type="email" 
				  className="form-control" 
				  name="email" 
				  value={email.email}
				  onChange={e => setEmail({[e.target.name]:e.target.value})}				  
				  />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-success btn-lg"
                onClick={e => sendRecoveryEmail(e)}
              >
                <strong>
                  {" "}
                  <i className="fa fa-unlock-alt"> </i> Recover
                </strong>
              </button>
				<button 
					type="button" 
					className="btn btn-warning btn-lg"
					onClick={e =>{
            setErrors({email_error : ''});
            setEmail({ email: "" });
            setInline(inline_init);
          }  }
				>
                  <strong>
                    {" "}
                    <i className="fa fa-eraser"> </i> Reset{" "}
                  </strong>
                </button>              
            </div>
            <div className='form-group'>
              {inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type} /> : ''}
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
