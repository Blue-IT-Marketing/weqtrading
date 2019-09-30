import React, {Component, useState,useContext,useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {routes} from '../../../constants';
import {firebase,auth} from '../../../firebase';
import { UserAccountContext } from '../../../context/UserAccount/userAccountContext';
import { extended_user } from '../../Auth/auth-constants';
import * as apiRequests from '../../Auth/auth-api';

const SideBarMenuAuth = () => {
	const[user,setUser] = useState(extended_user);
	const {user_account_state} = useContext(UserAccountContext);

	const openClientMenu = (e,id) => {    
		e.preventDefault();      

		let thisNode = document.getElementById(id);
		if ((thisNode.className === 'treeview')) {
			thisNode.className = 'active treeview';
		}else{
			thisNode.className = 'treeview';
		} 

	};

	function closeStoreMenu(thisNode) {
		thisNode.className = 'treeview';
		document.removeEventListener('click',closeStoreMenu);
	}

	const openStoreMenu = (e, id) => {
		e.preventDefault();
		let thisNode = document.getElementById(id);
		if ((thisNode.className === 'treeview')) {
			thisNode.className = 'active treeview';
		} else {
			thisNode.className = 'treeview';
		} 
	};

	const openMarketMenu = (e, id) => {
		e.preventDefault();

		let thisNode = document.getElementById(id);
		if ((thisNode.className === 'treeview')) {
			thisNode.className = 'active treeview';
		} else {
			thisNode.className = 'treeview';
		} 
	};

	const openMessagingMenu = (e,id) => {
		e.preventDefault();
		let thisNode = document.getElementById(id);
		if ((thisNode.className === 'treeview')) {
			thisNode.className = 'active treeview';
		} else {
			thisNode.className = 'treeview';
		}
	};


	useEffect(() => {
		const fetchAPI = async () => {
			let uid = user_account_state.user_account.uid;
			await apiRequests.fetchUser(uid).then(results => {
				if(results.status){
					setUser(results.payload);
				}
			}).catch(error => {
				console.log(error.message);
			});
			return true;
		};

		fetchAPI().then(result => {
			console.log(result);
		});

		return () => {
			setUser(extended_user);
			try{
				document.removeEventListener('click', closeStoreMenu);
			}catch(error){

			}
		};
	}, []);
  
	return (
		<ul className="sidebar-menu">
			<li className="header">W-Trading</li>
			<li>
				<Link to={routes.home_page} title="weqtrading online store">
					<i className="fa fa-home" /> <strong>Home</strong>
				</Link>
			</li>
			<li>
				<Link to={routes.about_page} title="About">
					<i className="fa fa-info" /> <strong>About</strong>
				</Link>
			</li>
			<li>
				<Link to={routes.contact_page} title="Contact Us">
					<i className="fa fa-envelope" /> <strong>Contact</strong>
				</Link>
			</li>
			<li
				id="clientarea"
				className="treeview"
				onClick={e => {
					let id = 'clientarea';
					return openClientMenu(e, id);
				}}
			>
				<Link to="#">
					<i className="fa fa-user-md" /> <span>Client Area</span>
					<span className="pull-right-container">
						<i className="fa fa-angle-left pull-right" />
					</span>
				</Link>
				<ul className="treeview-menu" onClick={e => e.stopPropagation()}>
					<li>
						<Link to={routes.admin_page} title="manage your Account">
							<i className="fa fa-sign-in"> </i> <strong> Account</strong>{' '}
						</Link>{' '}
					</li>
					<li
						id="store"
						className="treeview"
						onClick={e => {
							let id = 'store';
							return openStoreMenu(e, id);
						}}
					>
						<Link to="#">
							<i className="fa fa-user-md" /> <span>Store</span>
							<span className="pull-right-container">
								<i
									className="fa fa-angle-left pull-right"
									onClick={e => {
										if (e.target.className === 'fa fa-angle-left pull-right') {
											e.target.className = 'fa fa-angle-right pull-right';
										} else {
											e.target.className = 'fa fa-angle-left pull-right';
										}
									}}
								/>
							</span>
						</Link>
						<ul className="treeview-menu" onClick={e => e.stopPropagation()}>
							<li>
								<Link to={routes.manage_my_shop} title="manage my shop">
									<i className="fa fa-dashboard"> </i>{' '}
									<strong>Store Manager</strong>{' '}
								</Link>{' '}
							</li>
							<li>
								<Link to={routes.my_market_products} title="Shopping Basket">
									<i className="fa fa-shopping-basket"> </i>{' '}
									<strong> Add to Store </strong>{' '}
								</Link>{' '}
							</li>
							<li>
								<Link to={routes.store_manager_products} title="transactions">
									<i className="fa fa-shopping-cart"> </i>{' '}
									<strong>Products</strong>{' '}
								</Link>{' '}
							</li>
							<li>
								<Link to={routes.store_manager_services} title="transactions">
									<i className="fa fa-shopping-basket"> </i>{' '}
									<strong>Services</strong>{' '}
								</Link>{' '}
							</li>
							<li>
								<Link to={routes.transactions_page} title="transactions">
									<i className="fa fa-credit-card"> </i>{' '}
									<strong>Transactions</strong>{' '}
								</Link>{' '}
							</li>
						</ul>
					</li>
				</ul>
			</li>
			<li
				id="marketplace"
				className="treeview"
				onClick={e => {
					let id = 'marketplace';
					openMarketMenu(e, id);
				}}
			>
				<Link to="#">
					<i className="fa fa-shopping-bag" /> <span>Market Place</span>
					<span className="pull-right-container">
						<i
							className="fa fa-angle-left pull-right"
							onClick={e => {
								if (e.target.className === 'fa fa-angle-left pull-right') {
									e.target.className = 'fa fa-angle-right pull-right';
								} else {
									e.target.className = 'fa fa-angle-left pull-right';
								}
							}}
						/>
					</span>
				</Link>
				<ul className="treeview-menu" onClick={e => e.stopPropagation()}>
					<li>
						<Link to={routes.check_out_page} title="Check Out">
							<i className="fa fa-shopping-cart"> </i>{' '}
							<strong> CheckOut</strong>{' '}
						</Link>{' '}
					</li>
					<li>
						<Link to={routes.market_products_page} title="Market">
							<i className="fa fa-shopping-basket" /> Products
						</Link>
					</li>
					<li>
						<Link to={routes.market_services_page} title="Market">
							<i className="fa fa-shopping-basket" /> Services
						</Link>
					</li>
				</ul>
			</li>

			<li
				id="messaging"
				className="treeview"
				onClick={e => {
					let id = 'messaging';
					openMessagingMenu(e, id);
				}}
			>

				<Link to="#">
					<i className="fa fa-send-o" /> <span>Messaging</span>
					<span className="pull-right-container">
						<i
							className="fa fa-angle-left pull-right"
							onClick={e => {
								if (e.target.className === 'fa fa-angle-left pull-right') {
									e.target.className = 'fa fa-angle-right pull-right';
								} else {
									e.target.className = 'fa fa-angle-left pull-right';
								}
							}}
						/>
					</span>
				</Link>


				<ul className="treeview-menu" onClick={e => e.stopPropagation()}>


					<li
						id="sms"
						className="treeview"
						onClick={e => {
							let id = 'sms';
							openMessagingMenu(e, id);
						}}
					>

						<Link to="#">
							<i className="fa fa-send" /> <span>SMS</span>
							<span className="pull-right-container">
								<i
									className="fa fa-angle-left pull-right"
									onClick={e => {
										if (e.target.className === 'fa fa-angle-left pull-right') {
											e.target.className = 'fa fa-angle-right pull-right';
										} else {
											e.target.className = 'fa fa-angle-left pull-right';
										}
									}}
								/>
							</span>
						</Link>

						<ul className="treeview-menu" onClick={e => e.stopPropagation()}>
							<li>
								<Link to={routes.sms_account} title='Realtime Messaging Module'>
									<strong>
										<i className='fa fa-user'> </i>{' '} Account
									</strong>
								</Link>
							</li>
							<li>
								<Link to={routes.sms_settings} title='Realtime Messaging Module'>
									<strong>
										<i className='fa fa-cogs'> </i>{' '} Settings
									</strong>
								</Link>
							</li>
							<li>
								<Link to={routes.sms_contacts} title='Realtime Messaging Module'>
									<strong>
										<i className='fa fa-user-md'> </i>{' '} Contacts
									</strong>
								</Link>
							</li>

							<li>
								<Link to={routes.sms_messages} title='Realtime Messaging Module'>
									<strong>
										<i className='fa fa-send-o'> </i>{' '} Messages
									</strong>
								</Link>
							</li>
						</ul>

					</li>

					<li
						id="email"
						className="treeview"
						onClick={e => {
							let id = 'email';
							openMessagingMenu(e, id);
						}}
					>
						<Link to="#">
							<i className="fa fa-envelope" /> <span>Email</span>
							<span className="pull-right-container">
								<i
									className="fa fa-angle-left pull-right"
									onClick={e => {
										if (e.target.className === 'fa fa-angle-left pull-right') {
											e.target.className = 'fa fa-angle-right pull-right';
										} else {
											e.target.className = 'fa fa-angle-left pull-right';
										}
									}}
								/>
							</span>
						</Link>
						<ul className="treeview-menu" onClick={e => e.stopPropagation()}>
							<li>
								<Link to={routes.email_account} title='Realtime Messaging Module'>
									<strong>
										<i className='fa fa-cogs'> </i> Account
									</strong>
								</Link>
							</li>

							<li>
								<Link to={routes.email_settings} title='Realtime Messaging Module'>
									<strong>
										<i className='fa fa-cogs'> </i> Settings
									</strong>
								</Link>
							</li>

							<li>
								<Link to={routes.send_email} title='Realtime Messaging Module'>
									<strong>
										<i className='fa fa-inbox'> </i> Send Email
									</strong>
								</Link>
							</li>
							<li>
								<Link to={routes.inbox_email} title='Realtime Messaging Module'>
									<strong>
										<i className='fa fa-inbox'> </i> Inbox
									</strong>
								</Link>
							</li>
							<li>
								<Link to={routes.email_sent} title='Realtime Messaging Module'>
									<strong>
										<i className='fa fa-send-o'> </i> Sent Box
									</strong>
								</Link>
							</li>

							<li>
								<Link to={routes.email_drafts} title='Realtime Messaging Module'>
									<strong>
										<i className='fa fa-file'> </i> Drafts
									</strong>
								</Link>
							</li>
						</ul>
					</li>

				</ul>


			</li>

			<li>
				<Link to={routes.chat_page} title="Online Realtime Chat">
					<strong>
						<i className="fa fa-comments"> </i>{' '} Chat
					</strong>
				</Link>
			</li>

			<li>
				<Link to={routes.blog_page} title="Weq Trading Blog">
					<i className="fa fa-book"> </i> <strong>Blog</strong>
				</Link>
			</li>


			{user.is_admin ? (
				<li>
					<Link to={routes.dashboard_page} title="Dashboard">
						<i className="fa fa-dashboard"> </i> <strong>Dashboard</strong>
					</Link>
				</li>
			) : (
				''
			)}
			<li>
				<Link to={routes.logout_page} title="Logout">
					<i className="fa fa-sign-out"> </i> <strong> Logout </strong>
				</Link>
			</li>
		</ul>
	);
};

const SideBarMenuNonAuth = () => {
	return (
		<ul className="sidebar-menu">
			<li className="header">W-Trading</li>
			<li className="active treeview">
				<ul className="treeview-menu">
					<li><Link to={routes.home_page} title="weqtrading online store"><i className="fa fa-home"></i> Home</Link></li>
					<li><Link to={routes.about_page} title="Contact Us"><i className="fa fa-info"></i> About</Link></li>
					<li><Link to={routes.contact_page} title="Contact Us"><i className="fa fa-envelope"></i> Contact</Link></li>
					<li><Link to={routes.market_page} title="Market"><i className="fa fa-shopping-basket"></i> Market Place</Link></li>
					<li><Link to={routes.blog_page} title="Blog"><i className="fa fa-book"> </i> <strong>Blog</strong></Link></li>
					<li><Link to={routes.login_page} title="Login"><i className="fa fa-sign-in"> </i> Login </Link></li>
				</ul>
			</li>
		</ul>   
	); 
};



export default class MenuItems extends Component {
	constructor(props){
		super(props);
		this.state = {
			user_logged_in : false
		};
	}

	componentDidMount(){
		let isUserLoggedIN = () => {					
			return auth.currentUser ? true:false;
		};
		if (isUserLoggedIN()){
			this.setState({user_logged_in : true});
		}

	}
	render() {
		
		return (
			<UserAccountContext.Consumer>{(context) => {
			  const { doLogin, user_account_state } = context;
			  console.log('SIDEBAR',user_account_state.user_account);
				return (
					<div>
						{user_account_state.user_account.uid ? (
							<SideBarMenuAuth />
						) : (
							<SideBarMenuNonAuth />
						)}
					</div>
				);
	  }}
			</UserAccountContext.Consumer>
		);
	}
}


