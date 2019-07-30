import React, { Fragment,createContext,useReducer,useContext } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import {routes} from '../../constants';
import Header from '../Layout/Header/Header';
import Home from '../Home/Home';
import About from '../About/About';
import Contact from '../Contact/Contact';
import Profile from '../Profile/Profile';
import Login from '../Auth/Login/Login';
import Logout from '../Auth/Logout/Logout';
import Signup from '../Auth/Signup/Signup';
import SideBar from '../Layout/SideBar/SideBar';
import Footer from '../Layout/Footer/Footer';
import Forget from '../Auth/Forget/Forget';
import Market from '../Market/Market';


import UserAccountContextProvider from '../../context/UserAccount/userAccountContext';

export default function App () {
	
	
	return (
		<UserAccountContextProvider>
			console.log(value.)
			<Fragment>
				<Router>
					{/* Header  Component*/}
					<Header/>
					{/* Sidebar Component */}
					<SideBar />
					{/* Body and Main Page Routes */}
					<div className="content-wrapper">            
						<section className="content-header">              
							<section className="content">
								<Route exact path={routes.home_page} component={Home} />
								<Route exact path={routes.about_page} component={About} />
								<Route exact path={routes.contact_page} component={Contact} />
								<Route path={routes.profile_page} component={Profile} />
								<Route path ={routes.login_page} component={Login} />
								<Route path={routes.logout_page} component={Logout} />
								<Route path={routes.signup_page} component={Signup} />
								<Route path={routes.forget_password_page} component={Forget} />
								<Route path={routes.market_page} component={Market} />

							</section>
						</section>
					</div>
					{/* Footer Component  */}
					<Footer/>  
				</Router>       
			</Fragment>
		</UserAccountContextProvider>
	)
};
