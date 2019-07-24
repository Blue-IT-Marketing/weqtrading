import React, { Fragment } from 'react'

export default function Signup() {
    return (
        <Fragment>
            <div className='box box-body'>
                <div className='box box-header'>
                    <h3 className='box-title'>Signup</h3>   
                </div>
                
                 <form className='form-horizontal' >
                    <div className='form-group'>
                        <label>First Name</label>
                        <input type='text' className='form-control' name='name' value={''}/>
                    </div>
                    <div className='form-group'>
                        <label>Surname</label>
                        <input type='text' className='form-control' name='surname' value={''}/>
                    </div>
                    <div className='form-group'>
                        <label>Cell</label>
                        <input type='text' className='form-control' name='cell' value={''}/>
                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input type='email' className='form-control' name='email' value={''}/>
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type='text' className='form-control' name='password' value={''}/>
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-success btn-lg' name='singup'><strong> Subscribe</strong></button>
                    </div>
                 </form>
                 
            </div>
        </Fragment>
    )
}
