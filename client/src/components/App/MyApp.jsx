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
import SignUp from "../Auth/Signup/Signup";
import SideBar from '../Layout/SideBar/SideBar';
import Footer from '../Layout/Footer/Footer';
import Forget from '../Auth/Forget/Forget';
import Market from '../Market/Market';
import MyMarket from '../Market/MyMarket';


import UserAccountContextProvider from '../../context/UserAccount/userAccountContext';
import Dashboard from '../Dashboard/Dashboard';
import Blog from '../Blog/Blog';
import Account from '../Account/Account';

import CheckOut from '../Market/CheckOut/CheckOut';

export default function App () {
	
	
	return (
    <UserAccountContextProvider>
      
      <Fragment>
        <Router>
          {/* Header  Component*/}
          <Header />
          {/* Sidebar Component */}
          <SideBar />
          {/* Body and Main Page Routes */}
          <div className="content-wrapper">
            <section className="content-header">
              <section className="content">
                <Route exact path={routes.home_page} component={Home} />
                <Route exact path={routes.about_page} component={About} />
                <Route exact path={routes.contact_page} component={Contact} />
                <Route path={routes.login_page} component={Login} />
                <Route path={routes.logout_page} component={Logout} />
                <Route path={routes.signup_page} component={SignUp} />
                <Route
                  path={routes.forget_password_page}
                  component={Forget}
                />
                <Route path={routes.market_page} component={Market} />
                <Route path={routes.blog_page} component={Blog} />
                <Route path={routes.dashboard_page} component={Dashboard} />
                <Route exact path={routes.admin_page} component={Account} />

                <Route exact path={routes.check_out_page} component={CheckOut} />
                <Route
                  path={routes.my_market_products}
                  component={MyMarket}
                />
              </section>
            </section>
          </div>
          {/* Footer Component  */}
          <Footer />
        </Router>
      </Fragment>
    </UserAccountContextProvider>
  );
};
