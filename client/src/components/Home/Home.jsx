import React, { Fragment } from 'react';
import {Link } from 'react-router-dom';
import { routes } from '../../constants';
import { UserAccountContext } from "../../context/UserAccount/userAccountContext";

export default function Home (){
  
	return (
    <UserAccountContext.Consumer>{(context) =>{
		const { user_account_state } = context;
		return (
      <Fragment>
        <div className="box box-body">
          <div className="box-header">
            <h3 className="box-title">
              <strong>
                {" "}
                <i className="fa fa-home"> </i> Weq Trading{" "}
              </strong>{" "}
            </h3>

            <div className="box-tools">
              <Link to={routes.market_services_page}>
                <button className="btn btn-box-tool">
                  <strong>
                    {" "}
                    <i className="fa fa-shopping-bag"> </i> Market Services{" "}
                  </strong>{" "}
                </button>
              </Link>
              <Link to={routes.market_products_page}>
                <button className="btn btn-box-tool">
                  <strong>
                    {" "}
                    <i className="fa fa-shopping-bag"> </i> Market Products{" "}
                  </strong>{" "}
                </button>
              </Link>
              {user_account_state.user_account.uid ? (
                <Link to={routes.logout_page}>
                  <button className="btn btn-box-tool">
                    <strong>
                      {" "}
                      <i className="fa fa-sign-in"> </i> Log out{" "}
                    </strong>{" "}
                  </button>
                </Link>
              ) : (
                <Link to={routes.login_page}>
                <button className="btn btn-box-tool">
                  
                    <strong>
                      {" "}
                      <i className="fa fa-sign-in"> </i> Log in to Weq Trading{" "}
                    </strong>{" "}
                  
                </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
	}}
    </UserAccountContext.Consumer>
  );
}
