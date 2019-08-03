import React,{Fragment,useState,useEffect,useContext} from 'react';
import Switch from 'react-switch';


import { UserAccountContext } from "../../context/UserAccount/userAccountContext";

function Verifications({ user_account, doSendEmailVerification }) {
  const [verifications, setVerifications] = useState({
    use_onetime_pin: false,
    cell: user_account.phoneNumber,
    account_verified: user_account.emailVerified
  });

  let toggleVerifications = e => {
    setVerifications({
      use_onetime_pin: !verifications.use_onetime_pin,
      cell: verifications.cell,
      account_verified: verifications.account_verified
    });
  };

  let OnChangeHandler = e => {
    setVerifications({
      use_onetime_pin: verifications.use_onetime_pin,
      cell: e.target.value,
      account_verified: verifications.account_verified
    });
  };
  let UpdateVerifications = e => {
    console.log("Updating verifications");
    //TODO- this means that i have to actually send a verification
    //sms to the old number and then to the new number
  };

  let onAccountVerify = e => {
    console.log("on Account verifications");
    //Send verification email from firebase
    doSendEmailVerification();
  };
  return (
    <Fragment>
      <div className="box box-body">
        <div className="box-header">
          <h3 className="box-title">
            <strong>
              {" "}
              <small>
                <i className="fa fa-lock"> </i>
                Verifications &amp; Security Settings
              </small>
            </strong>
          </h3>
        </div>
        <div className="box-footer">
          <div className="row">
            <div className="col-lg-6">
              <div className="box box-body">
                <div className="box box-header">
                  <h3 className="box-title">Account Verification Status</h3>
                </div>
                <div className="box-footer">
                  <form>
                    <div className="form-group">
                      <label>
                        <Switch
                          name="account-verified"
                          checked={verifications.account_verified}
                          onChange={e => onAccountVerify(e)}
                        />
                        <span className="box-title">
                          {verifications.account_verified
                            ? "Account is Verified"
                            : "Account not verified"}
                        </span>
                      </label>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        name="verification-email"
                        value={user_account.email}
                      />
                    </div>
                    {verifications.account_verified ? (
                      ""
                    ) : (
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-google"
                          name="sendverificationEmail"
                          onClick={e => onAccountVerify(e)}
                        >
                          <strong>
                            <i className="fa fa-send"> </i> Send Verification
                            Email
                          </strong>
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box box-body">
                <div className="box box-header">
                  <h3 className="box-title">One Time Pin</h3>
                </div>
                <form className="form-horizontal">
                  <div className="form-group">
                    <label>
                      <Switch
                        name="verifications_active"
                        onChange={e => toggleVerifications(e)}
                        checked={verifications.use_onetime_pin}
                      />

                      <span> OTP SMS (ONE TIME PIN) </span>
                      {"  "}
                    </label>
                  </div>
                  <div className="form-group">
                    <div className="input-group-addon">
                      <div className="input-group" />
                      <i className="fa fa-mobile-phone"> </i> Cell
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      name="cell"
                      onChange={e => OnChangeHandler(e)}
                      value={verifications.cell}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-google btn-lg"
                      name="update-verifications"
                      onClick={e => UpdateVerifications(e)}
                    >
                      <strong>
                        <i className="fa fa-mobile-phone"> </i> Update
                        Verifications
                      </strong>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}


function AccountSettings(){

    const[accountSettings,setAccountSettings] = useState({
        account_active: true,
        receive_job_offers:true,
        receive_sms:true,        
        receive_email:true
    });

    let onToggleSettings = target => {
      console.log(target);
      switch(target){
        case  'account_active':{ 
          console.log('Setting account active');
          setAccountSettings(
                {
                  ...accountSettings,
                  account_active: !accountSettings.account_active
                }
              );break;
        }
        
        case 'receive_job_offers':{ 
          console.log("Setting receive job offers");
          setAccountSettings({
          ...accountSettings,
          receive_job_offers: !accountSettings.receive_job_offers,
        });break;
        }
        
        case 'receive_sms':{
          console.log('setting receive sms');
          setAccountSettings({
            ...accountSettings,
            receive_sms: !accountSettings.receive_sms
          });break;
        }
        
        case 'receive_email':{ console.log('setting receive email');
          setAccountSettings({
            ...accountSettings,
            receive_email: !accountSettings.receive_email
          });break;
        }
    }
    }

    let UpdateAccountSettings = e => {
      console.log('Updating account settings');
      // store settings in locaStorage
      // save settings in the backend
    }

    let onLoadAccountSettings = e => {
      console.log('Loading account settings');
      // load settings from backend  -> then
        // save in store
      // if backend load failed the load from store
    }

    return (
      <Fragment>
        <div className="box box-body">
          <div className="box-header">
            <h3 className="box-title">
              <strong>
                <small>
                  <i className="fa fa-cogs"> </i> Account Settings{" "}
                </small>{" "}
              </strong>
            </h3>
          </div>
          <div className="box-footer">
            <form className="form-horizontal">
              <div className="form-group">
                <label>
                  <Switch
                    name='account_active'
                    onChange={e => onToggleSettings("account_active")}
                    checked={accountSettings.account_active}
                  />

                  <span title={"Close Account"}>
                    {"  "}
                    <em> Account Status</em>{" "}
                  </span>
                </label>
              </div>

              <div className="form-group">
                <label>
                  <Switch
                    name="receive_job_offers"
                    onChange={e => onToggleSettings("receive_job_offers")}
                    checked={accountSettings.receive_job_offers}
                  />
                  <span>Receive Job Offers </span>
                  {"  "}
                </label>
              </div>

              <div className="form-group">
                <label>
                  <Switch
                    name="receive_sms"
                    onChange={e => onToggleSettings("receive_sms")}
                    checked={accountSettings.receive_sms}
                  />
                  <span>Receive SMS Notifications </span>
                  {"  "}
                </label>
              </div>
              <div className="form-group">
                <label>
                  <Switch
                    name="receive_email"
                    onChange={e => onToggleSettings("receive_email")}
                    checked={accountSettings.receive_email}
                  />
                  <span>Receive Email Notifications </span>
                  {"  "}
                </label>
              </div>
              <div className="form-group">
                <button
                  type="button"
                  className="btn btn-success btn-lg"
                  name="update-account-settings"
                  onClick={e => UpdateAccountSettings(e)}
                >
                  <strong>
                    <i className="fa fa-save"> </i> Update Account Settings
                  </strong>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
}


	// uid : '',
	// displayName : '',
	// photoURL : '',
	// email : '',
	// password : '',
	// emailVerified : false,
	// phoneNumber : '',
	// isAnonymous : false,
	// providerId : 'password',

function PersonalDetails({user_account}){
    const [personalDetails, setPersonalDetails] = useState({
      userid: user_account.uid,
      names: "",
      surname: "",
      cell: user_account.phoneNumber,
      email: user_account.email
    });

    const{
      userid,
      names,
      surname,
      cell,
      email
    } = personalDetails;

    let onChangeHandler = e => {
      setPersonalDetails({
        ...personalDetails,
        [e.target.name]:e.target.value
      });
    };

    let onUpdatePersonalDetails = e => {
        console.log('Updating personal details');
        // check for errors if found indicate the errors and exit
        // save personal details on localStorage. then save on backend
    };

    console.log('USER ACCOUNT',userid);

    return (
      <div className="box box-body">
        <div className="box-header">
          <h3 className="box-title">
            <strong>
              <small>
                {" "}
                <i className="fa fa-user"> </i> Personal Details{" "}
              </small>
            </strong>
          </h3>
        </div>

        <div className="box-footer col-lg-8">
          <form className="form-horizontal">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="names"
                placeholder="Names..."
                value={names}
                onChange={e => onChangeHandler(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="surname"
                placeholder="Surname..."
                value={surname}
                onChange={e => onChangeHandler(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="cell"
                placeholder="Cell..."
                value={cell}
                onChange={e => onChangeHandler(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Email..."
                value={email}
                onChange={e => onChangeHandler(e)}
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-success btn-lg"
                name="update"
                onClick={e => onUpdatePersonalDetails(e)}
              >
                <strong>
                  <i className="fa fa-cloud-upload"> </i> Update
                </strong>
              </button>
              <button
                type="button"
                className="btn btn-warning btn-lg"
                name="cancel"
              >
                <strong>
                  <i className="fa fa-cut"> </i> Cancel
                </strong>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default function Account (){
    const [display, setDisplay] = useState("personaldetails");
    
    let onSwitchScreen = (e) => {
        setDisplay(e.target.name);
        console.log(display);        
    }

    
    useEffect(() => {
      console.log(display);
    }, [])
    

  return (
    <UserAccountContext.Consumer>{(context) => {
      const { doSendEmailVerification, user_account_state } = context;
      return (
        <Fragment>
          <div className="box box-body">
            <div className="box-header">
              <h3 className="box-title">
                <strong>
                  <i className="fa fa-sign-in"> </i> Account
                </strong>
              </h3>
              <div className="box-tools">
                <button
                  type="button"
                  className="btn btn-box-tool"
                  name="personaldetails"
                  onClick={e => onSwitchScreen(e)}
                >
                  <i className="fa fa-user"> </i> Personal Details
                </button>
                <button
                  type="button"
                  className="btn btn-box-tool"
                  name="verifications"
                  onClick={e => onSwitchScreen(e)}
                >
                  <i className="fa fa-lock"> </i> Verifications
                </button>

                <button
                  type="button"
                  className="btn btn-box-tool"
                  name="accountsettings"
                  onClick={e => onSwitchScreen(e)}
                >
                  <i className="fa fa-cogs"> </i> Account Settings
                </button>
              </div>
            </div>

            {display === "personaldetails" ? (
              <PersonalDetails
                user_account={user_account_state.user_account}
              />
            ) : (
              ""
            )}
            {display === "accountsettings" ? <AccountSettings /> : ""}
            {display === "verifications" ? (
              <Verifications
                user_account={user_account_state.user_account}
                doSendEmailVerification={doSendEmailVerification}
              />
            ) : (
              ""
            )}
          </div>
        </Fragment>
      );
    }}
    </UserAccountContext.Consumer>
  );
}
