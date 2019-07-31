import React, { Fragment } from 'react';
import { Link, Redirect,navigate } from "react-router-dom";
import {UserAccountContext} from '../../../context/UserAccount/userAccountContext';
import { routes } from '../../../constants';

export default function Logout() {
    return (
      <UserAccountContext.Consumer>{(context) => {
          const {
              doLogout
          } = context;
          return (
            <Fragment>
              <div className="box box-body">
                <div className="box box-header">
                  <h3 className="box-title">
                    <i className="fa fa-sign-out"> </i> Logout
                  </h3>
                </div>

                <form className="form-horizontal">
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-danger"
                      name="logout"
                      onClick={e => {
                        doLogout();
                        //navigate("/", true);
                      }}
                    >
                      <i className="fa fa-sign-out"> </i>{" "}
                      <strong> Logout </strong>
                    </button>
                  </div>
                </form>
              </div>
            </Fragment>
          );
      }}
      </UserAccountContext.Consumer>
    );
}
