import React, { Fragment,useContext,useState,useEffect } from 'react'
import { UserAccountContext } from "../../context/UserAccount/userAccountContext";
import { routes } from "../../constants";
import axios from 'axios';
import InlineMessage from '../Forms/InlineMessage';
import InlineError from '../Forms/InlineError';




const Dashboard = () => {
  
    const[admins,setAdmins] = useState([]);
    const[present_user,setPresentUser] = useState({
      uid : '',
      is_admin: false
    })
    const [inline,setInline] = useState({message:'',message_type:'info'});

    const{user_account_state} = useContext(UserAccountContext);

    useEffect(() => {
      const fetchPresentUser = async () => {
        let uid = user_account_state.user_account.uid;
        await axios.get(routes.api_user_endpoint + `/${uid}`).then(response => {
          if (response.status === 200){
            return response.data
          }
        }).then(present_user => {
          setPresentUser(present_user);          
        }).catch(error => {
          setInline({message:'you are not authorized to access our dashboard'});
        });
      }
      return () => {
        setPresentUser({uid:'',is_admin:false });
      };
    }, [])

  return (
    <Fragment>
      {present_user.is_admin ? (
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
      ) : (
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
                  <em>you are not authorized to access our dashboard</em>
                </span>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}


export default Dashboard;


