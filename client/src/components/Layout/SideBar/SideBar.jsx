import React, { Fragment,useContext } from 'react';
import { Link } from 'react-router-dom';
import MenuItems from '../MenuItems/MenuItems';
import { routes } from '../../../constants';

import { UserAccountContext } from "../../../context/UserAccount/userAccountContext";

export default function SideBar (){
	
	let onSearch = e => {    
		e.preventDefault();
		console.log('Searching site...');
		// Remember to clear search field      
	};
	
	return (
    <UserAccountContext.Consumer>{(context) => {
      const {
        doLogin,
        user_account_state
      } = context;
      const userSignedInText = user_account_state.user_account
        .uid
        ? `<p id="strSideUserNameID"><Link to={routes.logout_page}> Logout</Link></p>`
        : `<p id="strSideUserNameID"><Link to={routes.login_page}> Login</Link></p>`;

    
      return (
        <Fragment>
          <aside className="main-sidebar">
            <section className="sidebar">
              <div className="user-panel">
                <div className="pull-left image">
                  <img
                    src="/static/dist/img/sms.jpeg"
                    id="strSideUserImageID"
                    className="img-circle"
                    alt="Weq-Trading"
                  />
                </div>
                <div className="pull-left info">
                  {user_account_state.user_account.uid ? (
                    <p id="strSideUserNameID">
                      <Link to={routes.logout_page}> Logout</Link>
                    </p>
                  ) : (
                    <p id="strSideUserNameID">
                      <Link to={routes.login_page}> Login</Link>
                    </p>
                  )
                  }
                </div>
              </div>

              <form
                onSubmit={e => onSearch(e)}
                method="get"
                className="sidebar-form"
              >
                <div className="input-group">
                  <input
                    type="text"
                    name="q"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <span className="input-group-btn">
                    <button
                      type="submit"
                      name="search"
                      id="search-btn"
                      className="btn btn-flat"
                    >
                      <i className="fa fa-search" />
                    </button>
                  </span>
                </div>
              </form>

              <ul className="sidebar-menu">
                <MenuItems />
              </ul>
            </section>
          </aside>
        </Fragment>
      );
    }}
    </UserAccountContext.Consumer>
  );
}
