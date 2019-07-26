import React, {Component, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {routes} from '../../../constants';

const SideBarMenuAuth = () => {
	return (
		<ul className="sidebar-menu">
			<li className="header">W-Trading</li>
			<li><Link to={routes.home_page} title="weqtrading online store"><i className="fa fa-home"></i> <strong>Home</strong></Link></li>
			<li><Link to={routes.about_page} title="About"><i className="fa fa-info"></i> <strong>About</strong></Link></li>
			<li><Link to={routes.contact_page} title="Contact Us"><i className="fa fa-envelope"></i> <strong>Contact</strong></Link></li>
			<li className="active treeview">
				<Link to="#">
					<i className="fa fa-user-md"></i> <span>Client Area</span>
					<span className="pull-right-container">
						<i className="fa fa-angle-left pull-right"></i>
					</span>
				</Link>
				<ul className="treeview-menu">
					<li><Link to={routes.admin_page} title="manage your Account"><i className="fa fa-sign-in"> </i> <strong> Account</strong> </Link> </li>                    
				</ul>
			</li>
			<li><Link to={routes.blog_page} title="Bulk Messaging &amp; Contact Management Blog"><i className="fa fa-book"> </i> <strong>Blog</strong></Link></li>
			<li><Link to={routes.dashboard_page} title="Dashboard"><i className="fa fa-dashboard"> </i> <strong>Dashboard</strong></Link></li>
		</ul>        
	)
}

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
	) 
}



export default class MenuItems extends Component {

	isUserLoggedIN(){
		return true
	}
	render() {
		console.log('THIS PROPS',this.props);
		return (
			<div>
				{
					this.isUserLoggedIN() ? <SideBarMenuAuth /> : <SideBarMenuNonAuth />
				}

			</div>
		)
	}
}


MenuItems.propTypes = {
	user: PropTypes.shape({
		uid: PropTypes.string.isRequired,
		displayName: PropTypes.string,
		photoURL: PropTypes.string,
		email: PropTypes.string,
		password: PropTypes.string,
		emailVerified: PropTypes.bool,
		phoneNumber: PropTypes.string,
		isAnonymous: PropTypes.bool,
		providerId: PropTypes.string,

		signing_in: PropTypes.bool.isRequired,
		user_signed_in: PropTypes.bool.isRequired,
		user_deleted: PropTypes.bool.isRequired,
		password_changed: PropTypes.bool.isRequired,
		email_verification_sent: PropTypes.bool.isRequired,
		onetime_pin_sent: PropTypes.bool.isRequired,

	}),

}


const mapStateToProps = (state) => {
	return {
		user: state.profile.account_details.user_account,
		
	}
};
