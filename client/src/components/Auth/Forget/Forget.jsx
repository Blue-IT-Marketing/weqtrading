import React, { Fragment } from 'react';


export default function Forget(){


  function sendRecoveryEmail  (e) {
      e.preventDefault();
      console.log('Sending Recovery Email');
      

  }

  return (
    <Fragment>
      <div className='box box-body'>
        <div className='box-header'>
          <h3 className='box-title'> <strong> <i className='fa fa-key'> </i> Forget Password</strong> </h3>        
        </div>

        <div className='box box-footer'>

          <form className='form-horizontal' onSubmit={e => sendRecoveryEmail(e)}>
              <div className='form-group'>
                <span>Enter your username so what we can send you a password recovery message</span>
              </div>
              <div className='form-group'>                                    
                  <input type='email' className='form-control' name='username'/>
              </div>
              <div className='form-group'>
                  <button type='submit' className='btn btn-success btn-lg' onClick={e => sendRecoveryEmail(e)}><strong> <i className='fa fa-unlock-alt'> </i> Send Recovery Email</strong></button>
                  <button type='reset' className='btn btn-warning btn-lg'><strong> <i className='fa fa-eraser'> </i> Cancel </strong></button>
              </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}
