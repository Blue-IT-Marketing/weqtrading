import React, { Fragment } from 'react'
import './Profile.css';

export default function Profile (){
  return (
      <Fragment>
          <div className='Profile'>
                <h3>Profile</h3>

                <div className='box-footer'>

                  <form className='form-horizontal'>
                    <div className='form-group'>
                      <label>Names </label>
                      <input type='text' className='form-control' name='names' value={''} />
                    </div>

                    <div className='form-group'>
                      <label>Surname </label>
                      <input type='text' className='form-control' name='surname' value={''} />
                    </div>

                    <div className='form-group'>
                      <label>Cell </label>
                      <input type='text' className='form-control' name='cell' value={''} />
                    </div>

                    <div className='form-group'>
                      <label>Email </label>
                      <input type='email' className='form-control' name='email' value={''} />
                    </div>

                    <div className='form-group'>
                      <button className='btn btn-success btn-lg' name='update'><strong>Update</strong></button>
                    </div>
                  </form>
                </div>

          </div>

      </Fragment>
  )
}
