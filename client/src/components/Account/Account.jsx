import React,{Fragment,useState,useEffect} from 'react'


function PersonalDetails(){
    return (
      <div className="box box-body">
        <div className="box-header">
          <h3 className="box-title">
            <strong> <i className='fa fa-user'> </i> {" "} Personal Details</strong>
          </h3>
        </div>

        <div className="box-footer">
          <form className="form-horizontal">
            <div className="form-group">
              <input
                type="text"
                className="from-control"
                name="names"
                placeholder="Names..."
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="from-control"
                name="surname"
                placeholder="Surname..."
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="from-control"
                name="cell"
                placeholder="Cell..."
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="from-control"
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
    const[display,setDisplay] = useState({display:''});
    
    let onChangeHandler = (e) => {
        setDisplay(e.target.name);
    }

    useEffect(() => {      
        setDisplay('personal-details');      
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
              name="personal-details"
              onClick={e => onChangeHandler(e)}
            >
              <strong>
                <i className="fa fa-user"> </i> Personal Details
              </strong>
            </button>
            <button
              type="button"
              className="btn btn-box-tool"
              name="account-settings"
              onClick={e => onChangeHandler(e)}
            >
              <strong>
                <i className="fa fa-cogs"> </i> Account Settings
              </strong>
            </button>
            <button
              type="button"
              className="btn btn-box-tool"
              name="verifications"
              onClick={e => onChangeHandler(e)}
            >
              <strong>
                <i className="fa fa-lock"> </i> Verifications
              </strong>
            </button>
          </div>
        </div>

        {display === "personal-details" ? <PersonalDetails /> : ""}
      </div>
    </Fragment>
  );
}
