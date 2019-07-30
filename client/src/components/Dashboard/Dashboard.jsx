import React, { Component, Fragment } from 'react'
import { UserAccountContext } from "../../context/UserAccount/userAccountContext";
import { routes } from "../../constants";


export default class Dashboard extends Component {
	state = {
		dashboard_user : {}
	}

	componentWillMount = e => {
		console.log('Console log ', e);
		// request from backend the uid of user allowed to access dashboard
		// if user uid is the same as the loggedin user please proceed otherwise 
		// display message indicating that the user is not authorized to access dashboard

	}
	render() {
		return (
      <UserAccountContext.Consumer>{(context) => {
		  const {
			  user_account_state
		  } = context;

		  if (user_account_state.user_account.uid === this.state.dashboard_user.uid){
		  return (
        <Fragment>
          <div className="box box-body">
            <div className="box box-header">
              <h3 className="box-title">
                <strong>
                  {" "}
                  <i className="fa fa-dashboard"> </i> Dashboard{" "}
                </strong>
              </h3>

              <div className="box-tools">
                <button className="btn btn-box-tool">
                  {" "}
                  <strong>
                    {" "}
                    <i className="fa fa-callout-info"> </i> Add Folder{" "}
                  </strong>{" "}
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}else{
			  return (
          <Fragment>
            <div className="box box-danger">
              <div className="box box-header">
                <h3 className="box-title">
                  <strong>
                    {" "}
                    <i className="fa fa-dashboard"> </i> Dashboard{" "}
                  </strong>
                  <hr />
                </h3>
                <div className="box box-warning">
                  <span className="error-content">
                    <em>
                      Unfortunately you are not authorized to access
                      dashboard page
                    </em>
                  </span>
                </div>
              </div>
            </div>
          </Fragment>
        );}
	  }}
      </UserAccountContext.Consumer>
    );
	}
}
