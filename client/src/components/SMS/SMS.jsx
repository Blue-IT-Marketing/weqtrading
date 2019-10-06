
// eslint-disable-next-line no-unused-vars
import React, {Fragment, createContext, useReducer, useContext, useState, useEffect} from 'react';
import {Utils} from '../../utilities';
import {
  default_bundles,
  payment_details_init,
  sms_balance_init,
  sms_bundle_init,
  sms_message_errors_init,
  sms_message_init,
  contacts_init,
  contacts_errors_init,
  contact_lists_init,
  contact_lists_errors_init
} from "./sms-constants";
import * as smsApiRequests from './sms-api';
import { UserAccountContext } from '../../context/UserAccount/userAccountContext';
import InlineError from '../Forms/InlineError';
import InlineMessage from '../Forms/InlineMessage';
import { Add } from 'react-lodash';

/**
 * function module to list balances and allowing balance top-up via
 * eft, direct deposit, and or paypal
 * @returns {*}
 * @constructor
 */

// eslint-disable-next-line no-unused-vars
export const SMSBalances = () => {
	const [bundles,setBundles] = useState([]);
	const [purchaseBundle,setPurchaseBundle] = useState(sms_bundle_init);


	const [balance,setBalance] = useState(sms_balance_init);
	const [inline,setInline] = useState({message:'',message_type:'info'});
	const {user_account_state} = useContext(UserAccountContext);

	const [payment,setPayment] = useState(payment_details_init);


	const handleSelectBundle = e => {
		setPurchaseBundle( bundles.find(bundle => bundle.id === e.target.value));
	};

	const processPayment = e => {
		console.log('processing paymet with the following condistions', purchaseBundle, payment);
	};

	useEffect( () => {

		const fetchBalancesAPI = async() => {
		    const results = {status : true, error:{}};

			const uid = user_account_state.user_account.uid;

			smsApiRequests.fetchBalancesAPI(uid).then(results => {
				if(results.status){
					setBalance(results.payload);
					setInline({message:'successfully loaded sms balances',message_type:'info'});
					results.status = true;
				}
			}).catch(error => {
				setInline({message:error.message,message_type:'error'});
				results.status = false;
				results.error = {...error};
			});

			return results;
		};

		fetchBalancesAPI().then(results => {
			if(results.status){
				console.log('successfully obtained balances',balance);
			}else{
				console.log('error loading balances',results.error);
			}
		}).catch(error => {
			console.log('error loading balances',error.message);
			setInline({message:error.message,message_type:'error'});
		});

		return(() => {
			setInline({message:'',message_type:'info'});
			setBalance(sms_balance_init);
		});

	},[]);

	/***
     * this effect check to see if bundle listing's are available from our sms server
     * if not then it loads the default bundle listings
     */
	useEffect( () => {
		const fetchBundlesFromBackEnd = async () => {
			const results = {status : true,error : {}};
			const uid = user_account_state.user_account.uid;

			await smsApiRequests.fetchSMSBundles(uid).then(response => {
				if(response.status){
					setBundles(response.payload);
					results.status = true;
				}else{
				    console.log(response.error.message);
				    results.status = false;
				}
			}).catch(error => {
			    console.log(error.message);
			    results.status = false;
			    results.error = {...error};
			});

			return results;
		};

		fetchBundlesFromBackEnd().then(response => {
		    if(!response.status){
		        setBundles(default_bundles);
			}
		});

		return(() => {
			setBundles([]);
		});
	},[]);
	return(
		<Fragment>
			<div className='box box-body'>
				<div className='box box-header'>
					<h3 className='box-title'>
						<i className='fa fa-credit-card-alt'> </i>{' '} Balances
					</h3>
				</div>
				<div className='my-flex-container'>
					<div className='box-footer'>
						<ul className='box box-footer'>
							<li className='list-group-item'>
								<strong>Total SMS : <em><a href={'#'}> {balance.total_sms} </a></em></strong>
							</li>

							<li className='list-group-item'>
								<strong>Free SMS : <em><a href={'#'}> {balance.free_sms} </a></em></strong>
							</li>
							<li className='list-group-item'>
								<strong>SMS Value: <em><a href={'#'}>R {balance.sms_value}.00 </a></em></strong>
							</li>
						</ul>
					</div>
					<div className='box-footer'>
						<div className='box-header'>
							<h3 className='box-title'><i className={'fa fa-money'}> </i>{' '} Buy Bundles</h3>
						</div>
						<form className='form-horizontal'>
							<div className='form-group'>
								<label className='label col-sm-3 pull-left'>Select Top Up Bundle</label>
								<select
									className='form-control'
									value={purchaseBundle.id}
									onChange={e => handleSelectBundle(e)}
								>
									{bundles.map(bundle => <option value={bundle.id}>{bundle.name} - {bundle.total_sms} sms's - R {bundle.purchase_price}.00</option> )}
								</select>
							</div>
							<div className='form-group'>
								<label className='label col-sm-3 pull-left'>Select Payment Method</label>
								<select
									className='form-control'
									name={'payment_method'}
									value={payment.payment_method}
									onChange={e => setPayment({...payment,[e.target.name]:e.target.value})}
								>
									<option value={'eft'}>EFT</option>
									<option value={'direct-deposit'}>Direct Deposit</option>
									<option value={'paypal'}> PayPal </option>
									<option value={'credit-card'}>Credit Card</option>
								</select>
							</div>

							<div className='form-group'>
								<button
									type='button'
									className='btn btn-primary btn-lg'
									name={'make-payment'}
									onClick={e => processPayment(e)}
								>
									<i className='fa fa-money'> </i>{' '}
                                    Process Payment
								</button>
							</div>
						</form>
					</div>
				</div>

			</div>
		</Fragment>
	);
};


/***
 * Used to create reports on sms deliveries made by such a user
 * @returns {*}
 * @constructor
 */
// eslint-disable-next-line no-unused-vars
const DeliveryReports = () => {
	return(
		<Fragment>
			<div className='box box-body'>
				<div className='box box-header'>
					<h3 className='box-title'>
						<i className='fa fa-file-excel-o'> </i>{' '}
                        Delivery Reports
					</h3>
				</div>
			</div>
		</Fragment>
	);
};


/***
 * Used to send bulk sms messages to your users contacts and customers
 * @returns {*}
 * @constructor
 */
// eslint-disable-next-line no-unused-vars
const SendBulkSMS = () => {

    const [listNames,setListNames] = useState([]);
	const [contacts,setContacts] = useState([]);
	const {user_account_state} = useContext(UserAccountContext);
	const [display, setDisplay] = useState("send-sms");
  	const [messagesMenu, setMenu] = useState({ menu: false });

	
	const showDropdownMenu = e => {
      e.preventDefault();
      setMenu({ menu: true });
      document.addEventListener("click", hideDropdownMenu);
    };

    const hideDropdownMenu = () => {
      setMenu({ menu: false });
      document.removeEventListener("click", hideDropdownMenu);
    };

	const loadContactsFromListName = async listname => {

		const uid = user_account_state.user_account.uid;
		
		await smsApiRequests.fetchContactsByListName(uid,listname).then(results => {
			if(results.status){
				setContacts(results.payload);
			}else{
				setContacts([]);
			}
		}).catch(error => {
			setContacts([]);
		});

		return true;
	};
	

	useEffect(() => {
		const fetchContactLists = async () => {
			const uid = user_account_state.user_account.uid;
			await smsApiRequests.fetchContactLists(uid).then(results => {
				if(results.status){
					setListNames(listNames);
				}else{
					setListNames([]);
					console.log("error fetching contact lists", results.error.message);
				}
			}).catch(error => {
				setListNames([]);
				console.log('error fetching contact lists',error.message);
			});

			return true;
		};

		fetchContactLists().then(result => console.log(result));

		return () => {
			
		};
	}, [])

	return(
		<Fragment>
			<div className='box box-body'>
				<div className='box box-header'>
					<h3 className='box-title'>
						<i className='fa fa-send-o'> </i>{' '}
                        Send Bulk SMS</h3>

					<div className="box-tools">
						<button
							type="button"
							className="btn btn-box-tool dropdown"
							onClick={e => showDropdownMenu(e)}
						>
							<i className='fa fa-bars'> </i>{' '}
						</button>
						{messagesMenu.menu ? (
							<ul className="dropmenu">
								<li
									className="btn btn-block droplink"
									name="send-sms"
									onClick={() => setDisplay('send-sms')}
								> <i className='fa fa-send'> </i>{' '}
									Send SMS
								</li>
							</ul>
						) : null }
					</div>

					</div>
				</div>			
		</Fragment>
	);
};


/***
 * Used to send single SMS Messages to your contacts and customers and users
 * @returns {*}
 * @constructor
 */
// eslint-disable-next-line no-unused-vars
const SendSMS = () => {
	const[sms,setSMS] = useState(sms_message_init);
	const[errors,setErrors] = useState(sms_message_errors_init);
	const[inline,setInline] = useState({message:'',message_type:'info'});
	const{user_account_state} = useContext(UserAccountContext);

	const checkErrors = async e => {
		let isError = false;

		const check_to_error = () => {
			if (!Utils.isCell(sms.to_cell)){
				setErrors({...errors,to_error: 'to field is not a valid cell phone number'});
				return true;
			}
			return false;
		};

		const check_from_error = () => {
			if (!Utils.isCell(sms.from_cell)){
				setErrors({...errors,from_error: 'from field is not a valid cell phone number'});
				return true;
			}
			return false;
		};

		const check_message_field = () => {
			if (Utils.isEmpty(sms.message)){
				setErrors({...errors,message_error: 'message field cannot be empty'});
				return true;
			}
			return  false;
		};

		check_to_error() ? isError = true : isError = isError;
		check_from_error() ? isError = true : isError = isError;
		check_message_field() ? isError = true : isError = isError;

		return isError;
	};

	const sendSMS = async e => {

		const results = {status:true,error:{}};
		const uid = user_account_state.user_account.uid;
		const sms_message = JSON.stringify(sms);

		await smsApiRequests.sendSMS(uid,sms_message).then(response => {
			if(response.status){
				results.status =true;
				setSMS(response.payload);
				setInline({message:'sms message sent successfully',message_type:'inf'});
			}else{
				setInline({message:response.error.message,message_type:'error'});
				results.status = false;
				results.error = {...response.error};
			}
		}).catch(error => {
			setInline({message:error.message,message_type:'error'});
			results.status = false;
			results.error = {...error.error};
		});

		return results;
	};

	useEffect(() =>{
        const prepareSMS = async () => {
            const uid = user_account_state.user_account.uid;
            const today = Date();
            today = today.now();

        };

    },[]);

	return(
		<Fragment>
			<div className='box box-body'>
				<div className='box box-header'>
					<h3 className='box-title'>
						<i className='fa fa-send'> </i>{' '}
                        Send SMS</h3>
				</div>

				<form className='form-horizontal'>
					<div className='form-group'>
						<label className='label col-sm-3'> From  </label>
						<input
							type='tel'
							className='form-control'
							name='from_cell'
							value={sms.from_cell}
							onChange={e => setSMS({...sms,[e.target.name]:e.target.value}) }
						/>
						{errors.from_error  ? <InlineError message={errors.from_error} /> : ''}
					</div>
					<div className='form-group'>
						<label className='label col-sm-3'> To  </label>
						<input
							type='tel'
							className='form-control'
							name={'to_cell'}
							value={sms.to_cell}
							onChange={e => setSMS({...sms,[e.target.name]:e.target.value}) }
						/>
						{errors.to_error ? <InlineError message={errors.to_error} /> : ''}
					</div>
					<div className='form-group'>
						<label className='label col-sm-3'> SMS </label>
						<textarea
							name='message'
							className='form-control'
							value={sms.message}
							onChange={e => setSMS({...sms,[e.target.name]:e.target.value}) }
						>
						</textarea>
						{errors.message_error ? <InlineError message={errors.message_error} /> : ''}
					</div>
					<div className='form-group'>
						<button
							id={'send'}
							type='button'
							className='btn btn-success btn-lg margin-r-5'
							onClick={e => checkErrors(e).then(isError => {
								isError ? setInline({message:'errors processing form',message_type : 'error'})
									: sendSMS(e).then(result => console.log('is sms sent', result));
							})}
						>
							<i className='fa fa-send-o'> </i>{' '}
                            Send
						</button>
						<button
							type='button'
							className='btn btn-warning btn-lg'
							onClick={e => {
								setInline({message:'',message_type:'info'});
								setErrors(sms_message_errors_init);
								setSMS(sms_message_init);
							}}
						>
							<i className='fa fa-eraser'> </i>{' '}
                            Reset
						</button>

					</div>

					<div className='form-group'>
						{inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type} /> : '' }
					</div>
				</form>
			</div>
		</Fragment>
	);
};


/**
 * Messages Module will allow user to view sms's they have sent,
 * sms's being delivered, sms delivery reports,
 * allow user to send sms, to an uploaded contact book or also to customers within
 * weq trading
 * @returns {*}
 * @constructor
 */

// eslint-disable-next-line no-unused-vars
export const SMSMessages = () => {
	const [display,setDisplay] = useState('send-sms');
	const [messagesMenu,setMenu] = useState({menu:false});

	const showDropdownMenu = e => {
		e.preventDefault();
		setMenu({ menu: true });
		document.addEventListener('click', hideDropdownMenu);
	};

	const hideDropdownMenu = () => {
		setMenu({ menu: false });
		document.removeEventListener('click', hideDropdownMenu);
	};

	return(
		<Fragment>
			<div className='box box-body'>
				<div className='box box-header'>
					<h3 className='box-title'>
						<i className='fa fa-envelope'> </i>{' '}
                        Messages
					</h3>

					<div className='box-tools mdl-textfield--align-left'>
						<div className="dropdown">
							<button
								type="button"
								className="btn btn-box-tool dropdown"
								onClick={e => showDropdownMenu(e)}
							>
								<i className='fa fa-bars'> </i>{' '}
							</button>
							{messagesMenu.menu ? (
								<ul className="dropmenu">
									<li
										className="btn btn-block droplink"
										name="send-sms"
										onClick={() => setDisplay('send-sms')}
									> <i className='fa fa-send'> </i>{' '}
                                        Send SMS
									</li>
									<li
										className="btn btn-block droplink"
										name="send-bulk-sms"
										onClick={() => setDisplay('send-bulk-sms')}
									> <i className='fa fa-send-o'> </i>{' '}
                                        Send Bulk SMS
									</li>

									<li
										className="btn btn-block droplink"
										name="delivery-reports"
										onClick={() => setDisplay('delivery-reports')}
									><i className='fa fa-file-excel-o'> </i>{' '}
                                        Delivery Reports
									</li>

								</ul>
							):null}
						</div>

					</div>

				</div>
				{
					display === 'send-sms' ?
						<SendSMS/> : null
				}
				{
					display === 'send-bulk-sms'?
						<SendBulkSMS /> : null
				}
				{
					display === 'delivery-reports' ?
						<DeliveryReports/> : null
				}

			</div>
		</Fragment>
	);
};

/**
 * 
 * 
 * 
 * 
 * 
 * @param {*} param0 
 */
const ContactListItem = ({ onOpenContact,contact }) => {
  return (
    <Fragment>
      <tr
        className="btn btn-outline-primary"
        onClick={e => {
          const id = contact.id;
          onOpenContact(id);
        }}
      >
        <td>{contact.name}</td>
        <td>{contact.surname}</td>
        <td>{contact.cell}</td>
        <td>{contact.tel}</td>
        <td>{contact.email}</td>
      </tr>
    </Fragment>
  );
};


const DisplayContactList = ({ onOpenContact,contacts_list }) => {
  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">
            <i className="fa fa-list"> </i> Contacts List
          </h3>
        </div>

        <table className="table table-responsive table-bordered">
          <thead>
            <tr>
              <td>Name</td>
              <td>Surname</td>
              <td>Cell</td>
              <td>Tel</td>
              <td>Email</td>
            </tr>
          </thead>
          <tbody>
            {contacts_list.map(contact => (
              <ContactListItem
                onOpenContact={onOpenContact}
                contact={contact}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Name</td>
              <td>Surname</td>
              <td>Cell</td>
              <td>Tel</td>
              <td>Email</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Fragment>
  );
};


/**
 * 
 * @param {*} param0 
 */
const EditContact = ({contact_detail}) => {
	const [contact, setContact] = useState(contacts_init);
	const [errors,setErrors] = useState(contacts_errors_init);
	const [inline,setInline] = useState({message:'',message_type:'error'});
	
	const {user_account_state} = useContext(UserAccountContext);

	const updateContact = async () => {
		const results = {status:false,payload:{},errors:{}};
		
		const uid = user_account_state.user_account.uid;

		const contact_details = JSON.stringify(contact)
		await smsApiRequests.updateContact(uid,contact_details).then(results => {
			if(results.status){
				return results.data;
			}else{

			}
		})
	};


	const checkErrors = async e => {
		let isError = false;
		const check_name = () => {
			if(Utils.isEmpty(contact.name)){
				setErrors({...errors,name_error : 'name field cannot be empty'});
				return true;
			}
			return false;
		};

		const check_surname = () => {
			if(Utils.isEmpty(contact.surname)){
				setErrors({...errors,surname_error : 'surname field cannot be empty'});
				return true;
			}
			return false;
		};

		const check_cell = () => {
		
			if(!Utils.isCell(contact.cell)){
				setErrors({...errors,cell_error : 'cell number is invalid'});
				return true;
			}
			return false;
		

		};

		const check_email = () => {
			if (contact.email){
			if(!Utils.validateEmail(contact.email)){
				setErrors({...errors,email_error : 'email is invalid'});
				return true;
			}
			return false;
			};
			return false;
		};

		const check_tel = () => {
			if(contact.tel){
				if(!Utils.isTel(contact.tel)){
					setErrors({...errors,tel_error:'telephone number is'});
					return true;
				}
				return false;
			}
			return false;
		};

		check_name() ? isError = true : isError = isError;
		check_surname() ? isError = true : isError = isError;
		check_cell() ? isError = true : isError = isError;
		check_email() ? isError = true : isError = isError;
		check_tel() ? isError = true : isError = isError;

		return isError;
	};
	
	useEffect(() => {
		setContact(contact_detail);
	  return () => {
		setContact(contacts_init);
	  };
	}, [contact_detail]);


	return(
		
		<Fragment>
			<div className='box box-body'>
				<div className='box box-header'>
					<h3 className='box-title'>Edit Contact</h3>
				</div>

				<form className='form-horizontal'>
					<div className='form-group'>
						<label>Name</label>
						<input 
							type="text" 
							className="form-control"
							name='name'
							value={contact.name}
							onChange={e => setContact({...contact,[e.target.name]:e.target.value})}
							/>
						{errors.name_error ? <InlineError message={errors.name_error} /> : null}
					</div>
					<div className='form-group'>
						<label>Surname</label>
						<input 
							type='text'
							className='form-control'
							name='surname'
							value={contact.surname}
							onChange={e => setContact({...contact,[e.target.name]:e.target.value})}
						/>
						{errors.surname_error ? <InlineError message={errors.surname_error} /> : null}
					</div>
					<div className='form-group'>
						<label>Cell</label>
						<input 
							type='tel'
							className='form-control'
							name='cell'
							value={contact.cell}
							onChange={e => setContact({...contact,[e.target.name]:e.target.value})}
						/>
						{errors.cell_error ? <InlineError message={errors.cell_error} /> : null}
					</div>

					<div className='form-group'>
						<label>Tel</label>
						<input 
							type='tel'
							className='form-control'
							name='tel'
							value={contact.tel}
							onChange={e => setContact({...contact,[e.target.name]:e.target.value})}
						/>
						{errors.tel_error ? <InlineError message={errors.tel_error} /> : null}
					</div>
					<div className='form-group'>
						<label>Email</label>
						<input 
							type='email'
							className='form-control'
							name='email'
							value={contact.email}
							onChange={e => setContact({...contact,[e.target.name]:e.target.value})}
						/>
						{errors.email_error ? <InlineError message={errors.email_error} /> : null}
					</div>

					<div className='form-group'>
						<label>Relationship</label>
						<select
							className='form-control'
							name='relationship'
							value={contact.relationship}
							onChange={e => setContact({...contact,[e.target.name]:e.target.value})}
						>
							<option value='business'>Business</option>
							<option value='customer'>Customer</option>
							<option value='marketing-clients'>Marketing Clients</option>
						</select>
					</div>
					<div className='form-group'>
						<button
							type='button'
							className='btn btn-success btn-lg'
							name='addContact'
							onClick={e => checkErrors(e).then(isError => {
								isError ? setInline({message:'there was an error processing form',message_type:'error'})
								: updateContact().then(result => {
									if (result.status){
										setInline({message:'successfully updated contacts',message_type:'info'});
									}else{
										setInline({message:'error adding new contact record please try again later',message_type:'error'});
									}
								}).catch(error => {
									setInline({message:error.message,message_type:'error'});
								});
							})}
						>
							<i className='fa fa-save'> </i>{' '}
							Add Contact
						</button>
						<button
							type='button'
							className='btn btn-warning btn-lg'
							name='reset'
							onClick={e => {
								setInline({message:'',message_type:'info'});
								setContact(contacts_init);
								setErrors(contacts_errors_init);
							}}
						>
							<i className='fa fa-eraser'> </i>{' '}
							Reset
						</button>
					</div>

					<div className='form-group'>
						{inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type} /> : null}
					</div>
					
				</form>	
			</div>
		</Fragment>
		
	)
}

/**
 * add contact to backend
 * then add contact to contact list via call-back function
 * 
 * @param {*} addContact
 */
const AddContact = ({addContact}) => {
	const [contact,setContact] = useState(contacts_init);
	const [errors,setErrors] = useState(contacts_errors_init);
	const [inline,setInline] = useState({message:'',message_type:'error'});

	const checkErrors = async e => {
		let isError = false;
		const check_name = () => {
			if(Utils.isEmpty(contact.name)){
				setErrors({...errors,name_error : 'name field cannot be empty'});
				return true;
			}
			return false;
		};

		const check_surname = () => {
			if(Utils.isEmpty(contact.surname)){
				setErrors({...errors,surname_error : 'surname field cannot be empty'});
				return true;
			}
			return false;
		};

		const check_cell = () => {
		
			if(!Utils.isCell(contact.cell)){
				setErrors({...errors,cell_error : 'cell number is invalid'});
				return true;
			}
			return false;
		

		};

		const check_email = () => {
			if (contact.email){
			if(!Utils.validateEmail(contact.email)){
				setErrors({...errors,email_error : 'email is invalid'});
				return true;
			}
			return false;
			};
			return false;
		};

		const check_tel = () => {
			if(contact.tel){
				if(!Utils.isTel(contact.tel)){
					setErrors({...errors,tel_error:'telephone number is'});
					return true;
				}
				return false;
			}
			return false;
		};

		check_name() ? isError = true : isError = isError;
		check_surname() ? isError = true : isError = isError;
		check_cell() ? isError = true : isError = isError;
		check_email() ? isError = true : isError = isError;
		check_tel() ? isError = true : isError = isError;

		return isError;
	};

	return(
		<Fragment>
			<div className='box box-body'>
				<div className='box box-header'>
					<h3 className='box-title'>Add Contact</h3>
				</div>

				<form className='form-horizontal'>
					<div className='form-group'>
						<label>Name</label>
						<input 
							type="text" 
							className="form-control"
							name='name'
							value={contact.name}
							onChange={e => setContact({...contact,[e.target.name]:e.target.value})}
							/>
						{errors.name_error ? <InlineError message={errors.name_error} /> : null}
					</div>
					<div className='form-group'>
						<label>Surname</label>
						<input 
							type='text'
							className='form-control'
							name='surname'
							value={contact.surname}
							onChange={e => setContact({...contact,[e.target.name]:e.target.value})}
						/>
						{errors.surname_error ? <InlineError message={errors.surname_error} /> : null}
					</div>
					<div className='form-group'>
						<label>Cell</label>
						<input 
							type='tel'
							className='form-control'
							name='cell'
							value={contact.cell}
							onChange={e => setContact({...contact,[e.target.name]:e.target.value})}
						/>
						{errors.cell_error ? <InlineError message={errors.cell_error} /> : null}
					</div>

					<div className='form-group'>
						<label>Tel</label>
						<input 
							type='tel'
							className='form-control'
							name='tel'
							value={contact.tel}
							onChange={e => setContact({...contact,[e.target.name]:e.target.value})}
						/>
						{errors.tel_error ? <InlineError message={errors.tel_error} /> : null}
					</div>
					<div className='form-group'>
						<label>Email</label>
						<input 
							type='email'
							className='form-control'
							name='email'
							value={contact.email}
							onChange={e => setContact({...contact,[e.target.name]:e.target.value})}
						/>
						{errors.email_error ? <InlineError message={errors.email_error} /> : null}
					</div>

					<div className='form-group'>
						<label>Relationship</label>
						<select
							className='form-control'
							name='relationship'
							value={contact.relationship}
							onChange={e => setContact({...contact,[e.target.name]:e.target.value})}
						>
							<option value='business'>Business</option>
							<option value='customer'>Customer</option>
							<option value='marketing-clients'>Marketing Clients</option>
						</select>
					</div>
					<div className='form-group'>
						<button
							type='button'
							className='btn btn-success btn-lg'
							name='addContact'
							onClick={e => checkErrors(e).then(isError => {

								isError ? 
								setInline(
									{
										message:'there was an error processing form',
										message_type:'error'
									})
								: addContact(contact).then(response => {
									if (response.status){
										setInline({message:'successfully updated contacts',message_type:'info'});
									}else{
										setInline({message:'error adding new contact record please try again later',message_type:'error'});
									}
								}).catch(error => {
									setInline({message:error.message,message_type:'error'});
								});

							})}
						>
							<i className='fa fa-save'> </i>{' '}
							Add Contact
						</button>
						<button
							type='button'
							className='btn btn-warning btn-lg'
							name='reset'
							onClick={e => {
								setInline({message:'',message_type:'info'});
								setContact(contacts_init);
								setErrors(contacts_errors_init);
							}}
						>
							<i className='fa fa-eraser'> </i>{' '}
							Reset
						</button>
					</div>

					<div className='form-group'>
						{inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type} /> : null}
					</div>
					
				</form>	
			</div>
		</Fragment>
	)
}

const ContactsManager = ({contacts,contact_list_details}) => {
	const [contacts_list,setContactsList] = useState([]);
	const [display, setDisplay] = useState("contact-lists");
	const [contactsManagerMenu,setMenu] = useState({menu:false});

	const [contact,setContact] = useState(contacts_init);

	const {user_account_state} = useContext(UserAccountContext);

	const showDropdownMenu = e => {
		e.preventDefault();
		setMenu({ menu: true });
		document.addEventListener('click', hideDropdownMenu);
	};

	const hideDropdownMenu = () => {
		setMenu({ menu: false });
		document.removeEventListener('click', hideDropdownMenu);
	};

	const onOpenContact = async id => {
		setContact(contacts_list.find(contact => contact.id === id));
		setDisplay('edit-contact');

	}

	/**
	 * contact details will be added to the backend and in turn the results will update contacts_list 
	 * @param {*} contact_details containst the details of the contact to be added
	 */
	const addContact = async (contact_details) =>{
		
		const results = {status : false,payload:{},error:{}};
		
		const uid = user_account_state.user_account.uid;
		
		contact_details.list_id = contact_list_details.id;
		contact_details.list_name = contact_list_details.name;
		const json_contact = JSON.stringify(contact_details)
		// add contact to contact list
		await smsApiRequests.saveContact(uid,json_contact).then(response => {
			
			if(response.status){
				setContactsList(response.payload);
				results = {...response};
			}

		}).catch(error => {
			results.status = false;
			results.payload = [];
			results.error = {...error};
		});

		return results;
	};

	// setting contacts to contacts_list
	useEffect(() => {
		setContactsList(contacts);
	  return () => {
		setContactsList([]);
	  };
	}, []);


	return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">
            <i className="fa fa-user"></i> Contacts Manager
          </h3>
          <div className="box-tools">
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-box-tool dropdown"
                onClick={e => showDropdownMenu(e)}
              >
                <i className="fa fa-bars"> </i>{" "}
              </button>
              {contactsManagerMenu.menu ? (
                <ul className="dropmenu">
                  <li
                    className="btn btn-block droplink"
                    name="contact-lists"
                    onClick={() => setDisplay("contact-lists")}
                  >
                    {" "}
                    <i className="fa fa-users"> </i> Contact Lists
                  </li>
                  <li
                    className="btn btn-block droplink"
                    name="add-contact"
                    onClick={() => setDisplay("add-contact")}
                  >
                    {" "}
                    <i className="fa fa-envelope"> </i> Add Contact
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </div>

        {display === "contact-lists" ? 
          <DisplayContactList
            onOpenContact={onOpenContact}
            contacts_list={contacts_list}
          />
        : null}
        {display === "add-contact" ? <AddContact addContact={addContact} />:null}
		
		{display === 'edit-contact' ? <EditContact contact_detail={contact} /> : null}
      </div>
    </Fragment>
  );
}

const AddContactList = () => {
	const [contacts_list, setContactsList] = useState(contact_lists_init);
	const [errors,setErrors] = useState(contact_lists_errors_init);
	const [inline,setInline] = useState({message:'',message_type:'errir'});
	const {user_account_state} = useContext(UserAccountContext);


	// function to check contacts list errors before we can add them

	const checkErrors = async e => {
		e.preventDefault();
		let isError = false;

		const check_name = () => {
			if(Utils.isEmpty(contacts_list.name)){
				setErrors({...errors,name_error:'name field cannot be empty'});
				return true;
			}
			return false;
		};

		const check_description = () => {		
		
			if(Utils.isEmpty(contacts_list.description)){
				setErrors({...errors,description_error:'description field cannot be empty'});
				return true;
			}
			return false;		
		};

		check_name() ? isError = true : isError =isError;
		check_description() ? isError = true : isError = isError;

		return isError;		
	};

	// function to add contact lists to the backend database
	const onAddContactsList = async e => {
		
		const uid = user_account_state.user_account.uid;
		const json_contacts_list = JSON.stringify(contacts_list)
		await smsApiRequests.saveContactsList(uid, json_contacts_list).then(response =>{
			if(response.status){
				setContactsList(response.payload);
			}else{
				setInline({message:response.error.message,message_type:'error'});
			}
		}).catch(error => {
			setInline({message:error.message,message_type:'error'});
		});

		return true;
	};
	
	// initialize contacts list
	useEffect(() => {		
		  setContactsList({...contacts_list,uid : user_account_state.user_account.uid});			  
		return () => {
			setContactsList(contact_lists_init);
		};
	}, [])
	return(
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						Create Contact List
					</h3>
				</div>

				<form className='form-horizontal'>
					<div className='form-group'>
						<label className='label'> List Name</label>
						<input 
							type="text" 
							className="form-control" 
							name='name'
							value={contacts_list.name} 
							onChange={e => setContactsList({...contacts_list,[e.target.name]:e.target.value})}
						/>
						{errors.name_error ? <InlineError message={errors.name_error} /> : null}
					</div>
					<div className='form-group'>
						<label className='label'> Description</label>
						<input 
							type="text" 
							className="form-control" 
							name='description'
							value={contacts_list.description} 
							onChange={e => setContactsList({...contacts_list,[e.target.name]:e.target.value})}
						/>
						{errors.description_error ? <InlineError message={errors.description_error} /> : null}
					</div>

					<div className='form-group'>
						<button
							type='button'
							className='btn btn-success btn-lg'
							name='save'
							onClick={e =>
								{
									checkErrors(e).then(isError => {
										isError ? setInline({message:'error processing form',message_type:'error'})
										: onAddContactsList(e).then(results => {
											console.log(results);
										});
									})

								}
							 }
						>
							<i className='fa fa-save'> </i>{' '}
								Add Contacts List
						</button>
						<button
							type='button'
							className='btn btn-warning btn-lg'
							name='reset'
							onClick={e => {
								setInline({message:'',message_type:'info'});
								setErrors(contact_lists_errors_init);
								setContactsList(contact_lists_init);
							}}
						>
							<i className='fa fa-eraser'></i>{' '}
							Reset
						</button>

					</div>

					<div className='form-group'>
						{inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type} /> : null}
					</div>

				</form>
			</div>
		</Fragment>
	)
}

const ContactsListItems = ({ onOpenContactList,contact_list }) => {
  return (
    <tr>
      <td
        className="btn btn-outline-primary"
        onClick={e => {
          const id = contact_list.id;
          onOpenContactList(id);
        }}
      >
        {contact_list.name}
      </td>
      <td>{contact_list.description}</td>
      <td>{contact_list.total_contacts}</td>
    </tr>
  );
};

const ContactsLists = ({ onOpenContactList,contact_lists }) => {
  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">Contact Lists</h3>
        </div>

        <table className="table table-responsive table-bordered">
          <thead>
            <tr>
              <td>Name</td>
              <td>Description</td>
              <td>Total Contacts</td>
            </tr>
          </thead>
          <tbody>
            {contact_lists.map(contact_list => (
              <ContactsListItems
                onOpenContactList={onOpenContactList}
                contact_list={contact_list}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Name</td>
              <td>Description</td>
              <td>Total Contacts</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Fragment>
  );
};

/**
 * ability to add and remove contacts, ability to
 * organize contacts by named contact lists
 * 
// 	export const contact_lists_init = {
// 		uid : '',
// 		id : '',
// 		name : '',
// 		description : '',
// 		total_contacts : '',	
// 	};
 * 
 * 
 * @returns {*}
 * @constructor
 */

// eslint-disable-next-line no-unused-vars
export const SMSContacts = () => {

	const [contactLists,setContactLists] = useState([]);
	const [contacts,setContacts] = useState([]);
	const [listDetail,setListDetail] = useState(contact_lists_init);

	const [display, setDisplay] = useState("contact-lists");
	const [smsContactsMenu,setMenu] = useState({menu:false});

	const {user_account_state} = useContext(UserAccountContext);

	const showDropdownMenu = e => {
		e.preventDefault();
		setMenu({ menu: true });
		document.addEventListener('click', hideDropdownMenu);
	};

	const hideDropdownMenu = () => {
		setMenu({ menu: false });
		document.removeEventListener('click', hideDropdownMenu);
	};

	/**
	 * 
	 * @param {*} id list id used to fetch contact list belonging to the list opened
	 */
	const onOpenContactList = id => {
		const contact_list_details = contactLists.find(contact_list => contact_list.id === id);
		const uid = user_account_state.user_account.uid;
		const listname = contact_list_details.list_name;
		setListDetail(contact_list_details);
		smsApiRequests.fetchContactsByListName(uid,listname).then(response => {
			if(response.status){
				setContacts(response.payload);
				setDisplay('contacts_manager');
			}else{
				setContacts([]);
			}
		}).catch(error => {
			setContacts([]);
		});

		return true;
	};


	useEffect(() => {
	  
		const fetchContactListsAPI = async () => {
			const uid = user_account_state.user_account.uid;

			await smsApiRequests.fetchContactLists(uid).then(results => {
				if(results.status){ 
					setContactLists(results.payload)
				}else{
					setContactLists([])
				}
			}).catch(error => {
				setContactLists([])
			});

			return true
	  };		

	  fetchContactListsAPI().then(results => console.log('contacts lists fetched',results));

	  return () => {
		setContactLists([]);	
	  };
	}, []);

	return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">
            <i className="fa fa-envelope-square"> </i> Contacts
          </h3>

          <div className="box-tools">
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-box-tool dropdown"
                onClick={e => showDropdownMenu(e)}
              >
                <i className="fa fa-bars"> </i>{" "}
              </button>
              {smsContactsMenu.menu ? (
                <ul className="dropmenu">
                  <li
                    className="btn btn-block droplink"
                    name="contact-lists"
                    onClick={() => setDisplay("contact-lists")}
                  >
                    {" "}
                    <i className="fa fa-envelope"> </i> Contact Lists
                  </li>
                  <li
                    className="btn btn-block droplink"
                    name="add-contacts"
                    onClick={() => setDisplay("add-contacts")}
                  >
                    {" "}
                    <i className="fa fa-envelope"> </i> Create Contact List
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </div>

        {display === "contact-lists" ? (
          <ContactsLists
            onOpenContactList={onOpenContactList}
            contact_lists={contactLists}
          />
        ) : null}
        {display === "add-contacts" ? <AddContactList /> : null}
        {display === "contacts_manager" ? (
          <ContactsManager
            contact_list_details={listDetail}
            contacts={contacts}
          />
        ) : null}
      </div>
    </Fragment>
  );
};



const SMS = () => {
	const [display,setDisplay] = useState('contact-details');
	const [displayMenu,setMenu] = useState({menu:false});
	const showDropdownMenu = e => {
		e.preventDefault();
		setMenu({ menu: true });
		document.addEventListener('click', hideDropdownMenu);
	};

	const hideDropdownMenu = () => {
		setMenu({ menu: false });
		document.removeEventListener('click', hideDropdownMenu);
	};

	return(
		<Fragment>
			<div className='box box-body'>
				<div className='box box-header'>
					<h3 className='box-title'>
						<i className='fa fa-send-o'> </i> {' '}
                        Bulk SMS
					</h3>

					<div className='box-tools'>
						<div className="dropdown">
							<button
								type="button"
								className="btn btn-box-tool dropdown"
								onClick={e => showDropdownMenu(e)}
							>
								<i className='fa fa-bars'> </i>
							</button>
							{displayMenu.menu ? (
								<ul className="dropmenu">
									<li
										className="btn btn-block droplink"
										name="contact-details"
										onClick={() => setDisplay('contact-details')}
									>
										<i className='fa fa-envelope-square'> </i> {' '}
                                        Contacts
									</li>

									<li
										className="btn btn-block droplink"
										name="messages"
										onClick={() => setDisplay('messages')}
									>
										<i className='fa fa-envelope'> </i> {' '}
                                        Messages
									</li>
									<li
										className="btn btn-block droplink"
										name="account"
										onClick={() => setDisplay('account')}
									>
										<i className='fa fa-credit-card'> </i> {' '}
                                        Balances
									</li>

								</ul>
							) : null
							}
						</div>

					</div>
				</div>


				{display === 'contact-details' ? <SMSContacts/> : ''}
				{display === 'messages' ? <SMSMessages/> : ''}
				{display === 'account' ? <SMSBalances /> : ''}

			</div>
		</Fragment>
	);
};

export default SMS;