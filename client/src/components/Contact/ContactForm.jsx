
import React from 'react';
import ContactMenu from '../ContactMenu/ContactMenu';


import Intro from '../../Intro/Intro';
import ThisContactForm from './ThisContactForm';

const ContactForm = props => {
	return (
		<div className="contact">
			<Intro />
			<div className="row">
				<div className="col-md-3">
					<ContactMenu />
				</div>
				<div className="col-md-9">
					<div className="box box-body">
						<div className="box box-header">
							<h3 className="box-title"> <strong> <i className="fa fa-envelope-o"> </i> Contact Form </strong> </h3>
						</div>   

						<ThisContactForm></ThisContactForm>
					</div>    
				</div>
			</div>
		</div>
	);
};


export default ContactForm;