
// eslint-disable-next-line no-unused-vars
import React, { Fragment,useContext,useState,useEffect } from 'react';
import { UserAccountContext } from '../../context/UserAccount/userAccountContext';
import { routes } from '../../constants';
import {payment_init, payment_errors_init} from '../Market/market-constants';
import * as apiRequests from './dashboard-api';

import {extended_user, extended_user_error} from '../Auth/auth-constants';

import axios from 'axios';

import InlineMessage from '../Forms/InlineMessage';
import InlineError from '../Forms/InlineError';
import { Utils } from '../../utilities';

import {contact_form_details} from '../Contact/contact-constants';

import {Capitalize} from 'react-lodash';
import {banking_details_errors_init, banking_details_init} from '../Market/CheckOut/checkout_constants';

const ShowPayment = payment => {
	const [thispayment, setPayment] = useState(payment_init);

	const [inline,setInline] = useState({message:'',message_type:'inf'});

	const {user_account_state} = useContext(UserAccountContext);

	const approve = async e => {
		let processing = {...thispayment};
		processing = JSON.stringify(processing);
		let uid = user_account_state.user_account.uid;
		await apiRequests.approvePayment(processing,uid).then(results => {
			if(results.status){
				setPayment(results.payload);
				setInline({message:'successfully approved payment',message_type:'inf'});
			}else{
				setPayment(payment_init);
				setInline({message:results.error.message,message_type:'error'});
			}
		}).catch(error => {        
			setInline({message:error.message,message_type:'error'});
		});
		return true;
	};

	const reject = async e => {
    
		let processing = {...thispayment};
    
		processing = JSON.stringify(processing);
    
		let uid = user_account_state.user_account.uid;

		await apiRequests.rejectPayment(processing,uid).then(results => {
			if(results.status){
				setPayment(results.payload);
				setInline({message:'successfully rejected payment'});
			}else{        
				setInline({ message: results.error.message, message_type: 'error' });
			}
		}).catch(error => {
			setInline({ message: error.message, message_type: 'error' });
		});

		return true;
    
    
	};



	useEffect(() => {
		const apiCall = async () =>{
			let mypayment = payment.payment;
			await setPayment(mypayment);
			return true;
		};

		apiCall().then(result => console.log(result));

		return () => {setInline({message:'',message_type:'inf'});};

	}, [payment]);

	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">Payment</h3>
				</div>
				<form className="form-horizontal">
					<div className="form-group">
						<label>Date : </label>
						<input
							type="text"
							className="form-control"
							name="date"
							value={thispayment.date}
							onChange={e =>
								setPayment({ ...thispayment, [e.target.name]: e.target.value })
							}
						/>
					</div>
					<div className="form-group">
						<label>Amount</label>
						<input
							type="text"
							className="form-control"
							name="amount"
							value={thispayment.amount}
							onChange={e =>
								setPayment({ ...thispayment, [e.target.name]: e.target.value })
							}
						/>
					</div>

					<div className="form-group">
						<label>Processed</label>

						<select
							type="text"
							className="form-control"
							name="processed"
							value={thispayment.processed}
							onChange={e =>
								setPayment({ ...thispayment, [e.target.name]: e.target.value })
							}
						>
							<option value={true}>Yes</option>
							<option value={false}>No</option>
						</select>
					</div>

					<div className="form-group">
						<label>Transaction Type</label>

						<input
							type="text"
							className="form-control"
							name="transaction_type"
							value={thispayment.transaction_type}
							onChange={e =>
								setPayment({ ...thispayment, [e.target.name]: e.target.value })
							}
						/>
					</div>

					{thispayment.deposit_slip_url ? 
						<div className="form-group">
							<div className="polaroid">
								<img src={thispayment.deposit_slip_url} className="pola-image" />
								<div className="polatext">
									<label>Proof of Transaction</label>
								</div>
							</div>
						</div>:null
					}

					<div className='form-group'>
						<button
							type='button'
							className='btn btn-success btn-lg margin'
							name='approve'
							onClick={e => approve(e).then(result => {
								console.log(result);
							})}
						>
							<i className='fa fa-rocket'> </i>{' '}
              Approve
						</button>

						<button
							type='button'
							className='btn btn-warning btn-lg'
							name='reject'
							onClick={e => reject(e).then(result => {
								console.log(result);
							})}
						>
							<i className='fa fa-eraser'> </i>{' '}
              Reject
						</button>
					</div>
					<div className='form-group'>
						{inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type} /> : ''}  
					</div>
				</form>
			</div>
		</Fragment>
	);
};

const PaymentItem = ({payment,OpenPayment}) => {
	const[thispayment,setPayment] = useState(payment_init);

	useEffect(() => {
		setPayment(payment);
		return () => {

		};
	}, [payment]);

	return (
		<tr className="btn-outline-dark">
			<td
				className='btn'        
				onClick={e => {
					let { id } = thispayment;
					OpenPayment(id);
				}}
			>
				{<Capitalize string={thispayment.date} />}
			</td>
			<td>R {thispayment.amount}.00</td>
			<td>{thispayment.processed ? 'Yes' : 'No'}</td>
			<td>{<Capitalize string={thispayment.transaction_type} />}</td>
		</tr>
	);
};

const ManagePayments = () => {
	const[payments,setPayments] = useState([]);
	const[inline,setInline] = useState({message:'',message_type:'inf'});
	const[show_payment,setShowPayment] = useState(payment_init);
	const{user_account_state} = useContext(UserAccountContext);
  
	const OpenPayment = id =>{
		let item = payments.find(payment => payment.id === id);
		console.log('fetched item',item);

		setShowPayment({...item});
	};
  


	useEffect(() => {
		const fetchPaymentsAPI =async () => {
			let uid = user_account_state.user_account.uid;
			await apiRequests.fetchPayments(uid).then(results => {
				if(results.status){
					setPayments(results.payload);
				}else{
					setPayments([]);
				}
			}).catch(error => {
				setPayments([]);          
			});
			return true;
		};

		fetchPaymentsAPI().then(result => {
			console.log('fetch payment api : ', result);
		});

		return () => {
			setPayments([]);
			setInline({message:'',message_type:'inf'});
		};
	}, []);

	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<i className="fa fa-credit-card"> </i>
            Payments Manager{' '}
					</h3>

					<div className="box-tools">
						<div className="dropdown">
							<button
								type="button"
								className="btn btn-box-tool btn-success"
								name="transactions"
							>
								<i className="fa fa-bars"> </i>
                Transactions
							</button>
              
						</div>
					</div>
				</div>
				{show_payment.id ? (
					<ShowPayment payment={show_payment} />
				) : (
					<table className="table table-responsive">
						<thead>
							<tr>
								<td>Date</td>
								<td>Amount</td>
								<td>Processed</td>
								<td>Transaction Type</td>
							</tr>
						</thead>
						<tbody>
							{payments.map(payment => {
								return (
									<PaymentItem
										OpenPayment={OpenPayment}
										payment={payment}
										key={payment.id}
									/>
								);
							})}
						</tbody>
					</table>
				)}
			</div>
		</Fragment>
	);
};


// eslint-disable-next-line no-unused-vars
const ManageUser = ({user}) => {
	const[manageUser,setManageUser] = useState(extended_user);
	const[inline,setInline] = useState({message:'',message_type:'inf'});
	const[errors,setErrors] = useState(extended_user_error);
	const {user_account_state} = useContext(UserAccountContext);
	const {uid} = user_account_state.user_account;

	const checkErrors = async () => {
		let isError = false;
		const check_names = () => {
			if(Utils.isEmpty(manageUser.names)){
				setErrors({...errors,names_error:'names field cannot be empty'});
				return true;
			}
        
			return false;
		};

		const check_surname = () => {
			if(Utils.isEmpty(manageUser.surname)){
				setErrors({...errors,surname_error: 'surname field cannot be empty'});
				return true;
			}
			return false;
		};

		const check_cell = () => {
			if(!Utils.isCell(manageUser.cell)){
				setErrors({...errors,cell_error : 'cell field is invalid'});
				return true;
			}
			return false;
		};

		const check_email = () => {
			if(!Utils.validateEmail(manageUser.email)){
				setErrors({...errors,email_error:'email field is invalid'});
				return true;
			}
			return false;
		};

		check_names() ? isError = true : isError = isError;
		check_surname() ? isError = true : isError = isError;
		check_cell() ? isError = true : isError = isError;
		check_email() ? isError = true : isError = isError;

		return isError;
	};
  
	const onUpdateUser = async(e) => {
		apiRequests.onUpdateUser(manageUser,uid).then(results => {
			if(results.status){
				setInline({message:'successfully updated user details',message_type:'inf'});          
			}else{
				setInline({message:results.error.message,message_type:'error'});
			}
		}).catch(error => {
			setInline({message:error.message,message_type:'error'});
		});
		return true;
	};

	useEffect(() => {
		setManageUser(user);  
		return () => {
			setManageUser(extended_user);
		};
	}, [user]);
  
	return (
		<Fragment>
			<form className="form-horizontal">
				<div className="form-group">
					<label>Names</label>
					<input
						type="text"
						className="form-control"
						name="names"
						value={manageUser.names}
						onChange={e =>
							setManageUser({ ...manageUser, [e.target.name]: e.target.value })
						}
					/>
					{errors.names_error ? <InlineError message={errors.names_error} /> : null }
				</div>
				<div className="form-group">
					<label>Surname</label>
					<input
						type="text"
						className="form-control"
						name="surname"
						value={manageUser.surname}
						onChange={e =>
							setManageUser({ ...manageUser, [e.target.name]: e.target.value })
						}
					/>
					{errors.surname_error ? <InlineError message={errors.surname_error} /> : null}
				</div>
				<div className="form-group">
					<label>Cell</label>
					<input
						type="tel"
						className="form-control"
						name="cell"
						value={manageUser.cell}
						onChange={e =>
							setManageUser({ ...manageUser, [e.target.name]: e.target.value })
						}
					/>
					{errors.cell_error ? <InlineError message={errors.cell_error} /> : null}
				</div>
				<div className="form-group">
					<label>Email</label>
					<input
						type="email"
						className="form-control"
						name="email"
						value={manageUser.email}
						onChange={e =>
							setManageUser({ ...manageUser, [e.target.name]: e.target.value })
						}
					/>
					{errors.email_error ? <InlineError message={errors.email_error} /> : null}
				</div>
				<div className='form-group'>
					<label>is Admin</label>
					<select 
						className='form-control'
						name='is_admin'
						value={manageUser.is_admin}
						onChange={e =>
							setManageUser({ ...manageUser, [e.target.name]: e.target.value })
						}              
					>
						<option value={true} > True </option>
						<option value={false}> False </option>
					</select>
				</div>
				<div className="form-group">
					<button
						type="button"
						className="btn btn-success btn-lg"
						name="updateuser"
						onClick={e => checkErrors(e).then(isError => {
							isError ? 
								setInline({message:'there was an error processing form',message_type:'error'})
								: onUpdateUser(e).then( result => setInline({message:'user successfully updated'})
								);
              
						})}
					>
						<i className="fa fa-save"> </i> Save
					</button>
					<button 
						type="button" 
						className="btn btn-warning btn-lg" 
						name="reset"
						onClick={ () => {
							setInline({message:'',message_type:'inf'});
							setErrors(extended_user_error);
							setManageUser(user);                 
						}}
					>
						<i className="fa fa-eraser"> </i> Reset
					</button>
				</div>
				<div className='form-group'>
					{inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type} /> : null}
				</div>
			</form>
		</Fragment>
	);
};

// eslint-disable-next-line no-unused-vars
const UserItem = ({ user, onOpenUser }) => {
	return (
		<tr>
			<td
				className='btn'
				onClick={() => onOpenUser(user.uid)}
			>{user.names}</td>
			<td>{user.surname}</td>
			<td>{user.email}</td>
			<td>{user.cell}</td>
		</tr>
	);
};

// eslint-disable-next-line no-unused-vars
const ManageUsers = () => {
	const [users,setUsers] = useState([]);
	const [manageUser,setManageUser] = useState(extended_user);
	const [inline,setInline] = useState({message:'',message_type:'inf'});
  
	const {user_account_state} = useContext(UserAccountContext);
	const {uid} = user_account_state.user_account;

	function onOpenUser (uid) {    
		setManageUser(users.find(user => user.uid === uid));
	}

	useEffect(() => {
		const fetchUserlistAPI = async () => {
			apiRequests.fetchUsersAPI(uid).then(results => {
				if(results.status){
					setUsers(results.payload);
				}else{
					setInline({message:results.error.message,message_type:'error'});
				}
			}).catch(error => {
				setInline({message:error.message,message_type:'error'});
			});

			return true;
		};

		fetchUserlistAPI().then(result => {
			console.log(result);
		});

		return () => {
      
		};
	}, []);

  
	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<i className="fa fa-users"> </i> Manage Users
					</h3>
				</div>
				{manageUser.uid ? (
					<ManageUser user={manageUser} />
				) : (
					<table className="table table-responsive">
						<thead>
							<tr>
								<td>Names</td>
								<td>Surname</td>
								<td>Email</td>
								<td>Cell</td>
							</tr>
						</thead>
						<tbody>
							{users.map(user => {
								return (
									<UserItem
										onOpenUser={onOpenUser}
										user={user}
										key={user.uid}
									/>
								);
							})}
						</tbody>
					</table>
				)}
			</div>
		</Fragment>
	);
};


// eslint-disable-next-line no-unused-vars
const SendResponse = ({contact}) => {
	const[response,setResponse] = useState({
		contact_id : '',
		names : '',
		subject : '',
		response :'',
		email : '',
		cell : '',
		respond_by : 'email',

	});

	const [inline,setInline] = useState({message:'',message_type:'inf'});

	const {user_account_state} = useContext(UserAccountContext);
  

	const sendResponse = async e => {
		const {uid,email} = user_account_state.user_account;
		let response_message = JSON.stringify(response);
		apiRequests.sendResponse(uid, response_message).then(result => {

		}).catch(error => {
			setInline({message:error.message,message_type:'error'});
		});

    
	};

	useEffect(() => {
		setResponse({
			contact_id : contact.contact_id,
			names : contact.names,
			subject : 'response > ' + contact.subject,
			email : contact.email,
			cell : contact.cell,
			respond_by : 'email'
		});

		return () => {
      
		};
	}, [contact]);
	return (
		<Fragment>
			<div className="form-group">
				<label>Response </label>
				<textarea
					className="form-control"
					name="response"
					value={response.response}
					onChange={e =>
						setResponse({ ...response, [e.target.name]: e.target.value })
					}
				></textarea>
			</div>
			<div className="form-group">
				<label>Respond By </label>
				<select 
					className='form-control'
					name='respond_by'
					value={response.respond_by} 
					onChange={e => setResponse({...response, [e.target.name]:e.target.value})}
				>
					<option value="email">Email </option>
					<option value="cell">SMS </option>
				</select>
			</div>
			<div className='form-group'>
				<button
					type='button'
					className='btn btn-primary margin'
					name='send'
					onClick={e => sendResponse(e).then(result => console.log(result))}
				>
					<i className='fa fa-send-o'> </i> {' '}
            Send
				</button>
			</div>
		</Fragment>
	);
};


// eslint-disable-next-line no-unused-vars
const ManageContact = ({contact}) => {
	const [manageContact, setManageContact] = useState(contact_form_details);
	const [display,setDisplay] = useState('');

	useEffect(() => {
		setManageContact(contact);      
		return () => {
        
		};
	}, [contact]);
	return (
		<Fragment>
			<form className="form-horizontal">
				<div className="form-group">
					<label>Names</label>
					<input
						type="text"
						className="form-control"
						name="names"
						value={manageContact.names}
						onChange={e =>
							setManageContact({
								...manageContact,
								[e.target.name]: e.target.value
							})
						}
					/>
				</div>

				<div className="form-group">
					<label>Email</label>
					<input
						type="email"
						className="form-control"
						name="email"
						value={manageContact.email}
						onChange={e =>
							setManageContact({
								...manageContact,
								[e.target.name]: e.target.value
							})
						}
					/>
				</div>
				<div className="form-group">
					<label>Cell</label>
					<input
						type="tel"
						className="form-control"
						name="cell"
						value={manageContact.cell}
						onChange={e =>
							setManageContact({
								...manageContact,
								[e.target.name]: e.target.value
							})
						}
					/>
				</div>
				<div className="form-group">
					<label>Subject</label>
					<input
						type="text"
						className="form-control"
						name="subject"
						value={manageContact.subject}
						onChange={e =>
							setManageContact({
								...manageContact,
								[e.target.name]: e.target.value
							})
						}
					/>
				</div>

				<div className="form-group">
					<label>Message</label>
					<textarea
						className="form-control"
						name="message"
						value={manageContact.message}
						onChange={e =>
							setManageContact({
								...manageContact,
								[e.target.name]: e.target.value
							})
						}
					>
						{' '}
					</textarea>
				</div>

				{display === 'response' ? <SendResponse contact={manageContact} /> : null}

				<div className="form-group">
					<button
						type="button"
						className="btn btn-success margin btn-lg"
						name="send-response"
						onClick={e => setDisplay('response')}
					>
						<i className="fa fa-send"> </i> Send Response
					</button>
					<button
						type="button"
						className="btn btn-warning margin btn-lg"
						name="mark-read"
						onClick={e => setDisplay('read')}              
					>
						{' '}
						<i className="fa fa-reddit-square"> </i>
              Mark as Read
					</button>
					<button
						type="button"
						className="btn btn-danger margin btn-lg"
						name="delete-message"
						onClick={e => setDisplay('delete-message')}
					>
						{' '}
						<i className="fa fa-cut"> </i>
              Delete Message
					</button>
				</div>
			</form>
		</Fragment>
	);
};

// eslint-disable-next-line no-unused-vars
const ContactItem = ({contact,onOpenContact}) => {
	console.log(contact);

	return (
		<tr>
			<td className="btn" onClick={() =>{
				const contact_id = contact.contact_id;
				onOpenContact(contact_id);
			} }>
				{contact.names}
			</td>
			<td>{contact.email}</td>
			<td>{contact.subject}</td>
			<td>{contact.timestamp}</td>
		</tr>
	);
};

// eslint-disable-next-line no-unused-vars
const ManageContacts = () => {
	const[contacts,setContacts] = useState([]);
	const [manageContact, setManageContact] = useState(contact_form_details);
	const[inline,setInline] = useState({message:'',message_type:'inf'});
	const{user_account_state} = useContext(UserAccountContext);
	const{uid} = user_account_state.user_account;


	const onOpenContact = contact_id => {
		console.log(contact_id);
		setManageContact(
			contacts.find(contact => contact.contact_id === contact_id)
		);
	};

	useEffect(() => {
    
		const fetchContactsAPI = async () => {
			apiRequests.fetchUserContactForm(uid).then(response => {
				if(response.status){
					console.log(response.payload);
					setContacts(response.payload);
				}else{
					setInline({message:'error fetching user contact form details',message_type:'error'});
				}
			}).catch(error => {
				setInline({message:error.message,message_type:'error'});
			});

			return true;
		};

		fetchContactsAPI().then(result => {
			console.log('Contacts Fetched',result);
		});

		return () => {
			setInline({message:'',message_type:'inf'});
			setContacts([]);
		};
	}, []);


	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<i className="fa fa-envelope"> </i> Manage Contact
					</h3>
				</div>
  
				<div className="box-footer">
					{
						manageContact.contact_id ?
							<ManageContact contact={manageContact}  /> :

							<table className='table table-responsive'>
								<thead>
									<tr>
										<td>Names</td>
										<td>Email</td>
										<td>Subject</td>
										<td>Time</td>                  
									</tr>
								</thead>
								<tbody>            
									{contacts.map(contact => {
										return (
											<ContactItem
												onOpenContact={onOpenContact}
												contact={contact}
												key={contact.contact_id}
											/>
										);
									})}
								</tbody>
							</table>
					}
				</div>
			</div>
		</Fragment>
	);
};

// eslint-disable-next-line no-unused-vars
const NotAuthorized = () => {
	return(
		<Fragment>
			<div className="box box-danger">
				<div className="box box-header">
					<h3 className="box-title">
						<strong>
							{' '}
							<i className="fa fa-dashboard"> </i>{' '} Dashboard{' '}
						</strong>
						<hr />
					</h3>
					<div className="box box-warning">
						<span className="error-content">
							<em>you are not authorized to access our dashboard</em>
						</span>
					</div>
				</div>
			</div>
		</Fragment>

	);
};

// eslint-disable-next-line no-unused-vars
const BankAccountForm = ({onCancel,account}) => {
	const[bankAccount,setAccount] = useState(banking_details_init);
	const[errors,setErrors] = useState(banking_details_errors_init);
	const[inline,setInline] = useState({message:'',message_type:'inf'});

	const{user_account_state} = useContext(UserAccountContext);

	const onSaveBankAccount = async e => {
		const uid = user_account_state.user_account.uid;
		const account = JSON.stringify(bankAccount);

		const saveBankAccount = async () => {
			await apiRequests.saveBankAccount(uid,account).then(results => {
				if(results.status){
					setAccount(results.payload);
					setInline({message:'successfully saved bank account',message_type:'error'});
				}else{
					setInline({message:results.error.message,message_type:'error'});
				}
			}).catch(error => {
				setInline({message:error.message,message_type:'error'});
			});

			return true;
		};

		await saveBankAccount().then(result => console.log(result));

		return true;
	};


	const checkErrors = async e => {
		let isError = false;

		const check_account_holder = () => {
			if(Utils.isEmpty(bankAccount.account_holder)){
				setErrors({...errors,account_holder_error : 'account holder field cannot be empty'});
				return true;
			}
			return false;
		};

		const check_bank_name = () => {
			if(Utils.isEmpty(bankAccount.bank_name)){
				setErrors({...errors,bank_name_error : 'bank name field cannot be empty'});
				return true;
			}
			return false;
		};

		const check_account_number = () => {
			if(Utils.isEmpty(bankAccount.account_number)){
				setErrors({...errors,account_number_error:'account number field cannot be empty'});
				return true;
			}
			return  false;
		};

		const check_branch_code = () => {
			if(Utils.isEmpty(bankAccount.branch_code)){
				setErrors({...errors,branch_code_error:'branch code field cannot be empty'});
				return true;
			}
			return false;
		};

		check_account_holder() ? isError = true : isError = isError;
		check_bank_name() ? isError = true : isError = isError;
		check_account_number() ? isError = true : isError = isError;
		check_branch_code() ? isError = true : isError = isError;

		return isError;
	};

	useEffect( () => {
		if (account){setAccount(account);}
		setErrors(banking_details_errors_init);
		setInline({message:'',message_type:'inf'});

		return( () => {
			setAccount(banking_details_init);
			setErrors(banking_details_errors_init);
			setInline({message:'',message_type:'inf'});
		});

	},[account]);

	return(
		<Fragment>
			<div className='box box-body'>
				<div className='box box-header'>
					<h3 className='box-title'> Bank Account</h3>
				</div>

				<form className='form-horizontal'>
					<div className='form-group'>
						<label>Account Holder </label>
						<input
							type='text'
							name='account_holder'
							className='form-control'
							value={bankAccount.account_holder}
							onChange={e => setAccount({...bankAccount,[e.target.name]:e.target.value})}
						/>
						{errors.account_holder_error ? <InlineError message={errors.account_holder_error} /> : null}
					</div>
					<div className='form-group'>
						<label>Bank Name</label>
						<input
							type='text'
							name='bank_name'
							className='form-control'
							value={bankAccount.bank_name}
							onChange={e => setAccount({...bankAccount,[e.target.name]:e.target.value})}
						/>
						{errors.bank_name_error ? <InlineError message={errors.bank_name_error} /> : null}
					</div>

					<div className='form-group'>
						<label>Account Number</label>
						<input
							type='text'
							name='account_number'
							className='form-control'
							value={bankAccount.account_number}
							onChange={e => setAccount({...bankAccount,[e.target.name]:e.target.value})}
						/>
						{errors.account_number_error ? <InlineError message={errors.account_number_error} /> : null}
					</div>

					<div className='form-group'>
						<label>Branch Code</label>
						<input
							type='text'
							name='branch_code'
							className='form-control'
							value={bankAccount.branch_code}
							onChange={e => setAccount({...bankAccount,[e.target.name]:e.target.value})}
						/>
						{errors.branch_code_error ? <InlineError message={errors.branch_code_error} /> : null}
					</div>

					<div className='form-group'>
						<button
							type='button'
							className='btn btn-success btn-lg'
							name='add-account'
							onClick={e => checkErrors(e).then(isError =>{
								isError ? setInline({message:'error processing form',message_type:'error'})
									: onSaveBankAccount(e).then(result => console.log(result));
							})}

						>
							<i className='fa fa-save'> </i> {' '} Save
						</button>
						<button
							type='button'
							className='btn btn-warning  btn-lg'
							name='add-account'
							onClick={e => {
								setAccount(banking_details_init);
								setErrors(banking_details_errors_init);
								setInline({message:'',message_type:'inf'});
							}}
						>
							<strong> <i className='fa fa-eraser'> </i> Reset </strong>
						</button>
						<button
							type='button'
							className='btn btn-danger  btn-lg'
							name='cancel'
							onClick={e => onCancel(e)}
						>
							<i className='fa fa-close'> </i>{' '}
                            Cancel
						</button>
					</div>

					<div className='form-group'>
						{inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type} /> : null }
					</div>

				</form>
			</div>
		</Fragment>
	);
};


/***
 * Function to return bank account list items
 * @param editAccount
 * @param account
 * @returns {*}
 * @constructor
 */
// eslint-disable-next-line no-unused-vars
const BankAccountItem = ({editAccount,deleteAccount,account}) => {
	const banking_id = account.banking_id;
	return(
		<tr>
			<td
				className='btn'
				onClick={() => editAccount(banking_id)}
            ><em>{account.account_holder}</em></td>
            <td><em>{account.bank_name}</em></td>
            <td><em>{account.account_number}</em></td>
            <td><em>{account.branch_code}</em></td>
			<td
				className={'btn btn-danger btn-sm'}
				onClick={() => deleteAccount(banking_id)}
			>
				<i className={'fa fa-close'}> </i> {' '}
			</td>
		</tr>
	);};


/**
 * Function to return a list of bank accounts
 * @param editAccount
 * @param bankAccounts
 * @returns {*}
 * @constructor
 */
// eslint-disable-next-line no-unused-vars
const BankAccountsList = ({editAccount,deleteAccount,bankAccounts}) => {
	return(
		<Fragment>
			<table className='table table-responsive table-bordered'>
				<thead>
					<tr>
						<td>Account Holder</td>
						<td>Bank Name</td>
						<td>Account Number</td>
						<td>Branch Code</td>
						<td>{' '}</td>
					</tr>
				</thead>
				<tbody>
					{bankAccounts.map(account => <BankAccountItem editAccount={editAccount} deleteAccount={deleteAccount} account={account} key={account.banking_id} />)}
				</tbody>
				<tfoot>
					<tr>
						<td>Account Holder</td>
						<td>Bank Name</td>
						<td>Account Number</td>
						<td>Branch Code</td>
						<td>{' '}</td>
					</tr>
				</tfoot>
			</table>
		</Fragment>
	);
};


/**
 * Manage Company Bank Accounts
 * @returns {*}
 * @constructor
 */
// eslint-disable-next-line no-unused-vars
const ManageCompanyBankAccounts = () => {
	const[bankAccounts, setBankAccounts] = useState([]);
	const[bankAccount,setBankAccount] = useState(banking_details_init);
	const[inline,setInline] = useState({message:'',message_type:'inf'});
	const [display,setDisplay] = useState('bank-accounts');
	const [displayMenu, setMenu] = useState({ menu: false });
	const { user_account_state } = useContext(UserAccountContext);


	const showDropdownMenu = e => {
		e.preventDefault();
		setMenu({ menu: true });
		document.addEventListener('click', hideDropdownMenu);
	};

	const hideDropdownMenu = () => {
		setMenu({ menu: false });
		document.removeEventListener('click', hideDropdownMenu);
	};

	const onCancel = e => {
	  setBankAccount(banking_details_init);
	};

	const editAccount = banking_id  => {
	    console.log('we will be editing this account',banking_id);
		setBankAccount(bankAccounts.find(account => account.banking_id === banking_id));
	};


	const deleteAccount = banking_id => {
	    console.log('we will be deleting this account',banking_id);

	    const uid = user_account_state.user_account.uid;
	    const doDeleteAccount = async () => {
			await apiRequests.deleteBankingDetails(uid,banking_id).then(results => {
				if(results.status){
					setBankAccounts(results.payload);
					setInline({message:'successfully deleted account',message_type:'inf'});
					return true;
				}else{
					setInline({message:'failed to delete account please contact the administrator',message_type:'inf'});
					return false;
				}
			}).catch(error => {
				setInline({message:error.message,message_type:'error'});
				return false;
			});
		};

	    doDeleteAccount().then(result => {
			console.log(result);
		});

	};

	useEffect( () =>{

	    const fetchBankingDetails = async () => {
	        let uid = user_account_state.user_account.uid;

			apiRequests.fetchBankingDetails(uid).then(results => {
				if(results.status){
					setBankAccounts(results.payload);
				}else{
					setInline({message:results.error.message,message_type:'error'});
				}
			}).catch(error => {
				setInline({message:error.message,message_type:'error'});
			});

			return true;
		};

	    fetchBankingDetails().then(result => console.log(result));
	    return () => {
			setBankAccounts([]);
		};
	},[]);

	return(
		<Fragment>
			<div className='box box-body'>
				<div className='box box-header'>
					<h3 className='box-title'>
						<i className='fa fa-bank'> </i> {' '}
                        Company Bank Accounts
					</h3>

					<div className='box-tools'>
						<div className='dropdown'>
							<button
								type='button'
								className='btn btn-box-tool droplink'
								name='dropdown-menu'
								onClick={e => showDropdownMenu(e)}
							>
								<i className='fa fa-bars'> </i>
							</button>

							{
								displayMenu.menu ? (
									<ul className="dropmenu">
										<li
											className="btn btn-block droplink"
											name="bank-accounts"
											onClick={() => setDisplay('bank-accounts')}
										>
											<i className="fa fa-bank"> </i> Bank Accounts{' '}
										</li>
										<li
											className="btn btn-block droplink"
											name="bank-accounts"
											onClick={() => setDisplay('add-account')}
										>
											<i className="fa fa-bank"> </i> Add Bank Account{' '}
										</li>

									</ul>
								): null
							}

						</div>
					</div>
				</div>
				{
					bankAccount.banking_id ?
					// editing bank account details
						<BankAccountForm onCancel={onCancel} account={bankAccount} /> :
					// listing bank account details and also enabling
						<div className='box-footer'>
							{display === 'bank-accounts' ? <BankAccountsList editAccount={editAccount} deleteAccount={deleteAccount} bankAccounts={bankAccounts} /> : null}
							{display === 'add-account' ? <BankAccountForm onCancel={onCancel} account={null} /> : null}
						</div>
				}

				{inline.message ?
					<Fragment>
						<div className='box box-footer'>

							<button
								type='button'
								className='btn btn-danger'
								onClick={() => setInline({message:'',message_type:'inf'})}
							>
								<i className='fa fa-close'> </i> {' '}
							</button>
							<InlineMessage message={inline.message} message_type={inline.message_type} />
						</div>

					</Fragment>
					: null }

			</div>
		</Fragment>
	);
};


const Dashboard = () => {
  
	const[admins,setAdmins] = useState([]);
	const[present_user,setPresentUser] = useState({
		uid : '',
		is_admin: false
	});
	const [inline,setInline] = useState({message:'',message_type:'info'});
	const [display,setDisplay] = useState('manage-users');
	const [displayMenu, setMenu] = useState({ menu: false });
	const { user_account_state } = useContext(UserAccountContext);

	const showDropdownMenu = e => {
		e.preventDefault();
		setMenu({ menu: true });
		document.addEventListener('click', hideDropdownMenu);
	};

	const hideDropdownMenu = () => {
		setMenu({ menu: false });
		document.removeEventListener('click', hideDropdownMenu);
	};


    

	useEffect(() => {
		const fetchPresentUser = async () => {
			let uid = user_account_state.user_account.uid;
			await axios.get(routes.api_user_endpoint + `/${uid}`).then(response => {
				if (response.status === 200){
					return response.data;
				}
			}).then(present_user => {
				setPresentUser(present_user);          
			}).catch(error => {
				setInline({message:'you are not authorized to access our dashboard'});
			});
		};

		fetchPresentUser().then(result => {
			console.log(result);
		});

		return () => {
			setPresentUser({uid:'',is_admin:false });
		};
	}, []);

	return (
		<Fragment>
			{present_user.is_admin ? (
				<Fragment>
					<div className="box box-body">
						<div className="box box-header">
							<h3 className="box-title">
								<strong>
									{' '}
									<i className="fa fa-dashboard"> </i>{' '} Dashboard{' '}
								</strong>
							</h3>

							<div className="box-tools">
								<div className="dropdown">
									<button
										type="button"
										className="btn btn-box-tool dropdown-toggle"
										onClick={e => showDropdownMenu(e)}
									>
										<i className="fa fa-bars"> </i>{' '}
									</button>
									{displayMenu.menu ? (
										<ul className="dropmenu">
											<li
												className="btn btn-block droplink"
												name="manage-payments"
												onClick={() => setDisplay('manage-payments')}
											>
												<i className="fa fa-credit-card"> </i> Manage Payments{' '}
											</li>
											<li
												className="btn btn-block droplink"
												name="manage-users"
												onClick={() => setDisplay('manage-users')}
											>
												<i className="fa fa-users"> </i> Manage Users{' '}
											</li>

											<li
												className="btn btn-block droplink"
												name="manage-contacts"
												onClick={() => setDisplay('manage-contacts')}
											>
												<i className="fa fa-envelope"> </i> Manage Contact{' '}
											</li>
											<li
												className="btn btn-block droplink"
												name="manage-bank-accounts"
												onClick={() => setDisplay('manage-bank-accounts')}
											>
												<i className="fa fa-bank"> </i> Bank Accounts{' '}
											</li>

										</ul>
									) : null}
								</div>
							</div>
						</div>

						{display === 'manage-payments' ? <ManagePayments /> : null}

						{display === 'manage-users' ? <ManageUsers /> : null}

						{display === 'manage-contacts' ? <ManageContacts /> : null}

						{display === 'manage-bank-accounts' ? <ManageCompanyBankAccounts/> : null}
					</div>
				</Fragment>
			) : (
				<NotAuthorized />
			)}
		</Fragment>
	);
};


export default Dashboard;


