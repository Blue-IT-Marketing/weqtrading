import React, { Fragment } from 'react';


export default function Logout() {
    return (
        <Fragment>
            <div className='box box-body'>
                <div className='box box-header'>
                    <h3 className='box-title'>Logout</h3>
                </div>
                
                <form className='form-horizontal'>
                    <div className='form-group'>
                        <button className='btn btn-danger' name='logout'><strong> Logout </strong></button> 
                    </div>
                </form>
            </div>
        </Fragment>
    )
}
