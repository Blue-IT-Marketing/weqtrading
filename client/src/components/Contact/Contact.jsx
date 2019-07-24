import React, { Fragment } from 'react';


export default function Contact() {


    let ResetDefault = e => {
        if (e.target.value === 'Message...') {
            e.target.value = ''
        }
    }

    let SubmitHandler = e => {
        e.preventDefault();
        console.log('Submitting Contact Form')
    }
    return (
        <Fragment>            
            <div className='box box-body'>

                <div className='box-header'>
                    <h3 className='box-title'>Contact</h3>
                </div>


                <div className='box-footer'>
                    <form className='form-horizontal' onSubmit={e => SubmitHandler(e)}>
                        <div className='form-group'>

                            <input
                                type='text'
                                className='form-control' 
                                name='names' 
                                placeholder='Names' 
                            />
                        </div>

                        <div className='form-group'>

                            <input 
                                type='text' 
                                className='form-control' 
                                name='surname'
                                placeholder='Surname' 
                            />
                        </div>

                        <div className='form-group'>
                            <input
                                type='text'
                                className='form-control'
                                name='cell'
                                placeholder='Cell'

                            />
                        </div>

                        <div className='form-group'>
                            <input 
                                type='email'
                                className='form-control'
                                name='email'
                                placeholder='Email'
                            />                        
                        </div>

                        <div className='form-group'>
                            <input
                                type='text'
                                className='form-control'
                                name='subject'
                                placeholder='Subject'
                            />
                        </div>

                        <div className='form-group'>

                            <textarea
                                name='message'
                                placeholder='Message...'
                                className='form-control'
                            ></textarea>
                        </div>

                        <div className='form-group'>
                            <button className='btn btn-success btn-block btn-lg'><strong> Send Message</strong></button>
                        </div>

                    </form>

                </div>

            </div>

        </Fragment>

    )
}