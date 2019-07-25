import React, { Fragment } from 'react';
import ThisContactForm from './ThisContactForm';

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
            <ThisContactForm></ThisContactForm>
		</Fragment>

	)
}