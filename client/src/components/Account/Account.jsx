import React,{Fragment,useState,useEffect} from 'react'


function Verifications(){
    const[verifications,setVerifications] = useState({        
            active : true,
            cell : '',
            lastVerified : ''})

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
          <div className='box-footer'>
            <form className='form-horizontal'>
              <div className='form-group'>
                
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
