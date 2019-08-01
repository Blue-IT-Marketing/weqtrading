import React,{Fragment,useState,useEffect} from 'react';
import Switch from 'react-switch';

function Verifications(){
    const[verifications,setVerifications] = useState(
          {        
            active : true,
            cell : '0790471559'});

    let toggleVerifications = (e) => {
      setVerifications({
        active: !verifications.active,
        cell: verifications.cell          
      })
    }

    let OnChangeHandler = e => {
        setVerifications({
          active: verifications.active,
          cell: e.target.value
        });
    }
    let UpdateVerifications = e => {

    }

    return (
      <Fragment>
        <div className="box box-body">
          <div className="box-header">
            <h3 className="box-title">
              <strong>
                {" "}
                <small>
                  <i className="fa fa-lock"> </i>
                  Verifications{" "}
                </small>
              </strong>
            </h3>
          </div>
          <div className="box-footer">
            <form className="form-horizontal">
              <div className="form-group">
                <label>
                  <Switch
                    onChange={e => toggleVerifications(e)}
                    checked={verifications.active}
                  />

                  <span>Activate SMS Verifications </span>
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
                  className="btn btn-success btn-lg"
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
      </Fragment>
    );
}


function AccountSettings(){
    const[accountSettings,setAccountSettings] = useState({
        account_active: true,
        receive_job_offers:true,
        receive_sms:true        
    });

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
                <div className="input-group">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked
                    name="account_active"
                  />
                  <label className='layout layout-boxed'> Account Active </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
}

function PersonalDetails(){
    // use context here
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
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="surname"
                placeholder="Surname..."
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="cell"
                placeholder="Cell..."
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Email..."
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-success btn-lg"
                name="update"
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
              name="accountsettings"
              onClick={e => onSwitchScreen(e)}
            >
              
                <i className="fa fa-cogs"> </i> Account Settings
              
            </button>
            <button
              type="button"
              className="btn btn-box-tool"
              name="verifications"
              onClick={e => onSwitchScreen(e)}
            >
              
                <i className="fa fa-lock"> </i> Verifications
              
            </button>
          </div>
        </div>

        {display === "personaldetails" ? <PersonalDetails /> : ""}
        {display === "accountsettings" ? <AccountSettings /> : ""}
        {display === "verifications" ? <Verifications /> : ""}
      </div>
    </Fragment>
  );
}
