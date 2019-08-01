import React, { Fragment,useState } from 'react';
import ThisContactForm from './ThisContactForm';
import ContactDetails from './ContactDetails';

export default function Contact() {
	const[display,setDisplay] = useState('contact-details');

	


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
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">
            <i className="fa fa-mobile-phone"> </i> Contact Details
          </h3>
          <div className="box-tools">
            <button
              type="button"
              className="btn btn-box-tool"
              name="contactform"
              onClick={e => setDisplay("contact-form")}
            >
              <i className="fa fa-envelope"> </i>
              Contact Form
            </button>
            <button
              type="button"
              className="btn btn-box-tool"
              name="contactdetails"
              onClick={e => setDisplay("contact-details")}
            >
              <i className="fa fa-info"> </i>
              Contact Details
            </button>
          </div>
        </div>
        {display === "contact-form" ? <ThisContactForm /> : ""}
        {display === "contact-details" ? <ContactDetails /> : ""}
      </div>
    </Fragment>
  );
}