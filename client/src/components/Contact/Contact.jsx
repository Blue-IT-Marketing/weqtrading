import React, { Fragment,useState } from 'react';
import ThisContactForm from './ThisContactForm';
import ContactDetails from './ContactDetails';

export default function Contact() {
	const [display, setDisplay] = useState("contact-form");
  const [displayMenu, setMenu] = useState({ menu: false });

  const showDropdownMenu = e => {
    e.preventDefault();
    setMenu({ menu: true });
    document.addEventListener("click", hideDropdownMenu);
  };

  const hideDropdownMenu = () => {
    setMenu({ menu: false });
    document.removeEventListener("click", hideDropdownMenu);
  };

	


	const ResetDefault = e => {
		if (e.target.value === 'Message...') {
			e.target.value = ''
		}
	};

	const SubmitHandler = e => {
		e.preventDefault();
		console.log('Submitting Contact Form')
  };
  
	return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">
            <i className="fa fa-mobile-phone"> </i> Contact Details
          </h3>
          <div className="box-tools">
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-box-tool dropdown-toggle"
                onClick={e => showDropdownMenu(e)}
              >
                <i className="fa fa-bars"> </i>{" "}
              </button>
              {displayMenu.menu ? (
                <ul className="dropmenu">
                  <li
                    type="button"
                    className="btn btn-box-tool droplink"
                    name="contactform"
                    onClick={e => setDisplay("contact-form")}
                  >
                    <i className="fa fa-envelope"> </i>
                    Contact Form
                  </li>
                  <li
                    type="button"
                    className="btn btn-box-tool droplink"
                    name="contactdetails"
                    onClick={e => setDisplay("contact-details")}
                  >
                    <i className="fa fa-info"> </i>
                    Contact Details
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </div>
        {display === "contact-form" ? <ThisContactForm /> : ""}
        {display === "contact-details" ? <ContactDetails /> : ""}
      </div>
    </Fragment>
  );
}