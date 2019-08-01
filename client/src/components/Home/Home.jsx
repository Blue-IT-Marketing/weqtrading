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
              <button className="btn btn-box-tool">
                <Link to={routes.market_page}>
                  <strong>
                    {" "}
                    <i className="fa fa-shopping-bag"> </i> Market Place{" "}
                  </strong>{" "}
                </Link>
              </button>
              {user_account_state.user_account.uid === "" ? (
                <button className="btn btn-box-tool">
                  <Link to={routes.login_page}>
                    <strong>
                      {" "}
                      <i className="fa fa-sign-in"> </i> Log in to Weq Trading{" "}
                    </strong>{" "}
                  </Link>
                </button>
              ) : (
                <button className="btn btn-box-tool">
                  <Link to={routes.logout_page}>
                    <strong>
                      {" "}
                      <i className="fa fa-sign-in"> </i> Log out{" "}
                    </strong>{" "}
                  </Link>
                </button>
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
