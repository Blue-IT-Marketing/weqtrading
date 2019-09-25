import React,{Fragment,useState,useEffect,useContext} from 'react';
import Switch from 'react-switch';
import {Utils} from '../../utilities';
import {extended_user, extended_user_error} from '../Auth/auth-constants';
import * as apiRequests from '../Auth/auth-api';
import { UserAccountContext } from "../../context/UserAccount/userAccountContext";
import InlineError from '../Forms/InlineError';
import InlineMessage from '../Forms/InlineMessage';

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

function PersonalDetails({user_account}){
    const [user, setUser] = useState(extended_user);
    const [errors,setErrors] = useState(extended_user_error);
    const [inline,setInline] = useState({message:'',message_type:'info'});
    const {user_account_state} = useContext(UserAccountContext);

    const onChangeHandler = e => setUser({...user,[e.target.name]:e.target.value});    

    const onUpdatePersonalDetails = async e => {
        let sent_user = {...user};
        sent_user.uid = user_account_state.user_account.uid;
        sent_user = JSON.stringify(sent_user)
        console.log('Updating User with ', sent_user);

        await apiRequests.updateUser(sent_user).then(results => {
          if (results.status){
            setUser(results.payload);
            setInline({message:'successfully update personal details'});
          }else{
            setInline({message:'there was an error updating personal details',message_type:'error'});
          }
        }).catch(error => {
          setInline({message:error.message,message_type:'error'});
        });
        return true;
    };

    const checkErrors = async e => {
      let isError = false;

      const check_names = () => {
        if (Utils.isEmpty(user.names)) {
          setErrors({ ...errors, names_error: "names field cannot be empty" });
          return true;
        }
        return false;
      };
      const check_surname = () => {
        if (Utils.isEmpty(user.surname)) {
          setErrors({
            ...errors,
            surname_error: "surname field cannot be empty"
          });
          return true;
        }
        return false;
      };
      const check_cell = () => {
        if (Utils.isCell(user.cell) === false) {
          setErrors({ ...errors, cell_error: "cell field is invalid" });
          return true;
        }
        return false;
      };
      const check_email = () => {
        if (Utils.validateEmail(user.email) === false) {
          setErrors({ ...errors, email_error: "email address is invalid" });
          return true;
        }
        return false;
      };
      const check_password = () => {
        if (Utils.isEmpty(user.password)) {
          setErrors({
            ...errors,
            password_error: "password field cannot be empty"
          });
          return true;
        }
        return false;
      };
      const check_password_two = () => {
        if (user.password !== user.repeatpassword) {
          setErrors({
            ...errors,
            repeatpassword_error: "passwords do not match"
          });
          return true;
        }
        return false;
      };

      const do_check = () => {
        check_names() ? (isError = true) : (isError = isError);
        check_surname() ? (isError = true) : (isError = isError);
        check_cell() ? (isError = true) : (isError = isError);
        check_email() ? (isError = true) : (isError = isError);
        return isError;
      };

      return await do_check();
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

        fetchAPI().then(results => {
          console.log('Fetch API exected')
        });


      return () => {
        setUser(extended_user);
        setInline({message:'',message_type:'info'});
        setErrors(extended_user_error);
      };
    }, [user_account_state])
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
                value={user.names}
                onChange={e => onChangeHandler(e)}
              />
              {errors.names_error ? <InlineError message={errors.names_error} /> : ''}
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="surname"
                placeholder="Surname..."
                value={user.surname}
                onChange={e => onChangeHandler(e)}
              />
              {errors.surname_error ? <InlineError message={errors.surname_error} /> : ''}
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="cell"
                placeholder="Cell..."
                value={user.cell}
                onChange={e => onChangeHandler(e)}
              />
              {errors.cell_error ? <InlineError message={errors.cell_error} /> : ''}
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Email..."
                value={user.email}
                onChange={e => onChangeHandler(e)}
              />
              {errors.email_error ? <InlineError message={errors.email_error} /> : ''}
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-success btn-lg"
                name="update"
                onClick={e => checkErrors(e).then(isError => {
                  isError
                    ? setInline({
                        message: "there was an error processing form",
                        message_type: "error"
                      })
                    : onUpdatePersonalDetails(e).then(result => {
                      console.log(result);
                    })
                }) }
              >
                <strong>
                  <i className="fa fa-cloud-upload"> </i> Update
                </strong>
              </button>
              <button
                type="button"
                className="btn btn-warning btn-lg"
                name="cancel"
                onClick={e => {
                  setUser(extended_user);
                  setErrors(extended_user_error);
                  setInline({message:'',message_type:'info'});
                }}
              >
                <strong>
                  <i className="fa fa-eraser"> </i> Reset
                </strong>
              </button>
            </div>
            <div className='form-group'>
                {inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type} /> : ''}
            </div>
          </form>
        </div>
      </div>
    );
}

export default function Account (){
    const [display, setDisplay] = useState("personaldetails");
    const [displayMenu, setMenu] = useState({ menu: false });
    const showDropdownMenu = e => {
      e.preventDefault();
      setMenu({ menu: true });
      document.addEventListener("click", hideDropdownMenu);
    };

    const hideDropdownMenu = () => {
      setMenu({ menu: false });
      document.removeEventListener("click", hideDropdownMenu);
    };
    
    let onSwitchScreen = (e) => {
        setDisplay(e);
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
                <div className="dropdown">
                  <button
                    type="button"
                    className="btn btn-box-tool dropdown-toggle"
                    onClick={e => showDropdownMenu(e)}
                  >
                    <i className="fa fa-bars"> </i>
                  </button>
                  {displayMenu.menu ? (
                    <ul className="dropmenu">
                      <li
                        type="button"
                        className="btn btn-box-tool droplink"
                        name="personaldetails"
                        onClick={e => onSwitchScreen("personaldetails")}
                      >
                        <i className="fa fa-user"> </i> Personal Details
                      </li>
                      <li
                        type="button"
                        className="btn btn-box-tool droplink"
                        name="verifications"
                        onClick={e => onSwitchScreen("verifications")}
                      >
                        <i className="fa fa-lock"> </i> Verifications
                      </li>

                      <li
                        type="button"
                        className="btn btn-box-tool droplink"
                        name="accountsettings"
                        onClick={e => onSwitchScreen("accountsettings")}
                      >
                        <i className="fa fa-cogs"> </i> Account Settings
                      </li>
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>

            {display === "personaldetails" ? (
              <PersonalDetails user_account={user_account_state.user_account} />
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
