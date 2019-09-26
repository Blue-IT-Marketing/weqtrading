import React, { Fragment,useContext,useState,useEffect } from 'react'
import { UserAccountContext } from "../../context/UserAccount/userAccountContext";
import { routes } from "../../constants";
import {payment_init, payment_errors_init} from '../Market/market-constants';
import * as apiRequests from './dashboard-api';

import {extended_user, extended_user_error} from '../Auth/auth-constants';

import axios from 'axios';

import InlineMessage from '../Forms/InlineMessage';
import InlineError from '../Forms/InlineError';
import { Utils } from '../../utilities';

import {Capitalize} from 'react-lodash';

const ShowPayment = payment => {
  const [thispayment, setPayment] = useState(payment_init);

  const [inline,setInline] = useState({message:'',message_type:'inf'});

  const {user_account_state} = useContext(UserAccountContext);

  const Approve = async e => {
      let processing = {...thispayment};
      processing = JSON.stringify(processing);
      let uid = user_account_state.user_account.uid;
     await apiRequests.approvePayment(processing,uid).then(results => {
        if(results.status){
          setPayment(results.payload);
          setInline({message:'successfully approved payment',message_type:'inf'});
        }else{
          setPayment(payment_init);
          setInline({message:results.error.message,message_type:'error'});
        }
      }).catch(error => {        
         setInline({message:error.message,message_type:'error'});
      });
      return true;
  };

  const Reject = async e => {
    
    let processing = {...thispayment};
    
    processing = JSON.stringify(processing);
    
    let uid = user_account_state.user_account.uid;

    await apiRequests.rejectPayment(processing,uid).then(results => {
      if(results.status){
        setPayment(results.payload);
        setInline({message:'successfully rejected payment'})
      }else{        
        setInline({ message: results.error.message, message_type: "error" });
      }
    }).catch(error => {
         setInline({ message: error.message, message_type: "error" });
    });

    return true;
    
    
  };



  useEffect(() => {
    const apiCall = async () =>{
      let mypayment = payment.payment;
      await setPayment(mypayment);
      return true;
    };

    apiCall().then(result => console.log(result))

    return () => {setInline({message:'',message_type:'inf'})};

  }, [payment]);

  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">Payment</h3>
        </div>
        <form className="form-horizontal">
          <div className="form-group">
            <label>Date : </label>
            <input
              type="text"
              className="form-control"
              name="date"
              value={thispayment.date}
              onChange={e =>
                setPayment({ ...thispayment, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              type="text"
              className="form-control"
              name="amount"
              value={thispayment.amount}
              onChange={e =>
                setPayment({ ...thispayment, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Processed</label>

            <select
              type="text"
              className="form-control"
              name="processed"
              value={thispayment.processed}
              onChange={e =>
                setPayment({ ...thispayment, [e.target.name]: e.target.value })
              }
            >
              <option value={true} selected={thispayment.processed}>Yes</option>
              <option value={false} selected={!thispayment.processed} >No</option>
            </select>
          </div>

          <div className="form-group">
            <label>Transaction Type</label>

            <input
              type="text"
              className="form-control"
              name="transaction_type"
              value={thispayment.transaction_type}
              onChange={e =>
                setPayment({ ...thispayment, [e.target.name]: e.target.value })
              }
            />
          </div>

          {thispayment.deposit_slip_url ? 
                  <div className="form-group">
            <div className="polaroid">
              <img src={thispayment.deposit_slip_url} className="pola-image" />
              <div className="polatext">
                <label>Proof of Transaction</label>
              </div>
            </div>
          </div>:null
        }

        <div className='form-group'>
            <button
              type='button'
              className='btn btn-success btn-lg margin'
              name='approve'
              onClick={e => Approve(e).then(result => {
                console.log(result);
              })}
            >
              <i className='fa fa-rocket'> </i>{' '}
              Approve
            </button>

            <button
              type='button'
              className='btn btn-warning btn-lg'
              name='reject'
              onClick={e => Reject(e).then(result => {
                console.log(result);
              })}
            >
              <i className='fa fa-eraser'> </i>{' '}
              Reject
            </button>
        </div>
        <div className='form-group'>
          {inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type} /> : ''}  
        </div>
        </form>
      </div>
    </Fragment>
  );
};

const PaymentItem = ({payment,OpenPayment}) => {
  const[thispayment,setPayment] = useState(payment_init);

  useEffect(() => {
    setPayment(payment);
    return () => {

    };
  }, [payment])

  return (
    <tr className="btn-outline-dark">
      <td
        className='btn'        
        onClick={e => {
          let { id } = thispayment;
          OpenPayment(id);
        }}
      >
        {<Capitalize string={thispayment.date} />}
      </td>
      <td>R {thispayment.amount}.00</td>
      <td>{thispayment.processed ? "Yes" : "No"}</td>
      <td>{<Capitalize string={thispayment.transaction_type} />}</td>
    </tr>
  );
};

const ManagePayments = () => {
  const[payments,setPayments] = useState([]);
  const[inline,setInline] = useState({message:'',message_type:'inf'});
  const[show_payment,setShowPayment] = useState(payment_init);
  const{user_account_state} = useContext(UserAccountContext);
  
  const OpenPayment = id =>{
    let item = payments.find(payment => payment.id === id);
    console.log('fetched item',item);

    setShowPayment({...item});
  };
  


  useEffect(() => {
    const fetchPaymentsAPI =async () => {
        let uid = user_account_state.user_account.uid
        await apiRequests.fetchPayments(uid).then(results => {
          if(results.status){
            setPayments(results.payload);
          }else{
            setPayments([]);
          }
        }).catch(error => {
          setPayments([]);          
        });
        return true;
    };

    fetchPaymentsAPI().then(result => {
        console.log('fetch payment api : ', result);
    });

    return () => {
      setPayments([]);
      setInline({message:'',message_type:'inf'});
    };
  }, []);

  return(
    <Fragment>
      <div className='box box-body'>
          <div className='box box-header'>
              <h3 className='box-title'>
                <i className='fa fa-credit-card'> </i>
                Payments Manager </h3>
          </div>
              { show_payment.id ?
                  <ShowPayment payment={show_payment} />  :

                  <table className='table table-responsive'>
                    <thead>
                        <tr>
                          <td>Date</td>
                          <td>Amount</td>
                          <td>Processed</td>
                          <td>Transaction Type</td>                
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map(payment => {
                              return (
                                <PaymentItem
                                  OpenPayment={OpenPayment}
                                  payment={payment}
                                  key={payment.id}
                                />
                              );
                            })
                        }
                    </tbody>
                  </table>
              }                            
 
      </div>
    </Fragment>
  )
};


const ManageUser = ({user}) => {
  const[manageUser,setManageUser] = useState(extended_user);
  const[inline,setInline] = useState({message:'',message_type:'inf'});
  const[errors,setErrors] = useState(extended_user_error);
  const {user_account_state} = useContext(UserAccountContext);
  const {uid} = user_account_state.user_account;

  const checkErrors = async () => {
    let isError = false;
    const check_names = () => {
      if(Utils.isEmpty(manageUser.names)){
        setErrors({...errors,names_error:'names field cannot be empty'});
        return true;
      };
        
      return false;
    };

    const check_surname = () => {
      if(Utils.isEmpty(manageUser.surname)){
        setErrors({...errors,surname_error: 'surname field cannot be empty'});
        return true;
      }
      return false;
    };

    const check_cell = () => {
      if(!Utils.isCell(manageUser.cell)){
        setErrors({...errors,cell_error : 'cell field is invalid'});
        return true;
      }
      return false;
    };

    const check_email = () => {
      if(!Utils.validateEmail(manageUser.email)){
        setErrors({...errors,email_error:'email field is invalid'});
        return true;
      }
      return false;
    };

    check_names() ? isError = true : isError = isError;
    check_surname() ? isError = true : isError = isError;
    check_cell() ? isError = true : isError = isError;
    check_email() ? isError = true : isError = isError;

    return isError;
  };
  
  const onUpdateUser = async(e) => {
      apiRequests.onUpdateUser(manageUser,uid).then(results => {
        if(results.status){
          setInline({message:'successfully updated user details',message_type:'inf'});          
        }else{
          setInline({message:results.error.message,message_type:'error'});
        }
      }).catch(error => {
        setInline({message:error.message,message_type:'error'});
      });
      return true;
  };

  useEffect(() => {
    setManageUser(user);  
    return () => {
      setManageUser(extended_user);
    };
  }, [user])
  
  return (
    <Fragment>
      <form className="form-horizontal">
        <div className="form-group">
          <label>Names</label>
          <input
            type="text"
            className="form-control"
            name="names"
            value={manageUser.names}
            onChange={e =>
              setManageUser({ ...manageUser, [e.target.name]: e.target.value })
            }
          />
          {errors.names_error ? <InlineError message={errors.names_error} /> : null }
        </div>
        <div className="form-group">
          <label>Surname</label>
          <input
            type="text"
            className="form-control"
            name="surname"
            value={manageUser.surname}
            onChange={e =>
              setManageUser({ ...manageUser, [e.target.name]: e.target.value })
            }
          />
          {errors.surname_error ? <InlineError message={errors.surname_error} /> : null}
        </div>
        <div className="form-group">
          <label>Cell</label>
          <input
            type="tel"
            className="form-control"
            name="cell"
            value={manageUser.cell}
            onChange={e =>
              setManageUser({ ...manageUser, [e.target.name]: e.target.value })
            }
          />
          {errors.cell_error ? <InlineError message={errors.cell_error} /> : null}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={manageUser.email}
            onChange={e =>
              setManageUser({ ...manageUser, [e.target.name]: e.target.value })
            }
          />
          {errors.email_error ? <InlineError message={errors.email_error} /> : null}
        </div>
        <div className="form-group">
          <button
            type="button"
            className="btn btn-success btn-lg"
            name="updateuser"
            onClick={e => checkErrors(e).then(isError => {
              isError ? 
                setInline({message:'there was an error processing form',message_type:'error'})
              : onUpdateUser(e).then( result => setInline({message:'user successfully updated'})
              )
              
            })}
          >
            <i className="fa fa-save"> </i> Save
          </button>
          <button 
            type="button" 
            className="btn btn-warning btn-lg" 
            name="reset"
              onClick={ () => {
                  setInline({message:'',message_type:'inf'});
                  setErrors(extended_user_error);
                  setManageUser(user);                 
              }}
            >
            <i className="fa fa-eraser"> </i> Reset
          </button>
        </div>
      </form>
    </Fragment>
  );
};

const UserItem = ({ user, onOpenUser }) => {
  return (
    <tr>
      <td
        className='btn'
        onClick={() => onOpenUser(user.uid)}
      >{user.names}</td>
      <td>{user.surname}</td>
      <td>{user.email}</td>
      <td>{user.cell}</td>
    </tr>
  );
};

const ManageUsers = () => {
  const [users,setUsers] = useState([]);
  const [manageUser,setManageUser] = useState(extended_user);
  const [inline,setInline] = useState({message:'',message_type:'inf'});
  
  const {user_account_state} = useContext(UserAccountContext);
  const {uid} = user_account_state.user_account;

  function onOpenUser (uid) {    
    setManageUser(users.find(user => user.uid === uid));
  };

  useEffect(() => {
    const fetchUserlistAPI = async () => {
      apiRequests.fetchUsersAPI(uid).then(results => {
        if(results.status){
          setUsers(results.payload);
        }else{
          setInline({message:results.error.message,message_type:'error'});
        }
      }).catch(error => {
          setInline({message:error.message,message_type:'error'});
      });

      return true;
    };

    fetchUserlistAPI().then(result => {
      console.log(result);
    });

    return () => {
      
    };
  }, [])

  
  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">
            <i className="fa fa-users"> </i> Manage Users
          </h3>
        </div>
        {manageUser.uid ? (
          <ManageUser user={manageUser} />
        ) : (
          <table className="table table-responsive">
            <thead>
              <tr>
                <td>Names</td>
                <td>Surname</td>
                <td>Email</td>
                <td>Cell</td>
              </tr>
            </thead>
            <tbody>
              {users.map(user => {
                return (
                  <UserItem
                    onOpenUser={onOpenUser}
                    user={user}
                    key={user.uid}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </Fragment>
  );
}


const ContactItem = ({contact}) => {
  return (
    
      <tr>
        <td>{contact.names}</td>
        <td>{contact.email}</td>
        <td>{contact.subject}</td>
        <td>{contact.timestamp}</td>  
    </tr>
  );
}

const ManageContact = () => {
  const[contacts,setContacts] = useState([]);
  const[inline,setInline] = useState({message:'',message_type:'inf'});
  const{user_account_state} = useContext(UserAccountContext);
  const{uid} = user_account_state.user_account;


  useEffect(() => {
    
    const fetchContactsAPI = async () => {
        apiRequests.fetchUserContactForm(uid).then(response => {
          if(response.status){
            console.log(response.payload);
            setContacts(response.payload);
          }else{
            setInline({message:'error fetching user contact form details',message_type:'error'});
          }
        }).catch(error => {
          setInline({message:error.message,message_type:'error'});
        });

        return true;
    };

    fetchContactsAPI().then(result => {
      console.log('Contacts Fetched',result);
    })

    return () => {
      setInline({message:'',message_type:'inf'});
      setContacts([]);
    };
  }, [])


  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">
            <i className="fa fa-envelope"> </i> Manage Contact
          </h3>
        </div>
  
        <div className="box-footer">
          <table className='table table-responsive'>
            <thead>
                <tr>
                  <td>Names</td>
                  <td>Email</td>
                  <td>Subject</td>
                  <td>Time</td>                  
                </tr>
            </thead>
            <tbody>            
              {contacts.map(contact => {
                return <ContactItem contact={contact} key={contact.contact_id} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}


const NotAuthorized = () => {
  return(
        <Fragment>
          <div className="box box-danger">
            <div className="box box-header">
              <h3 className="box-title">
                <strong>
                  {" "}
                  <i className="fa fa-dashboard"> </i>{' '} Dashboard{" "}
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

  )
}


const Dashboard = () => {
  
    const[admins,setAdmins] = useState([]);
    const[present_user,setPresentUser] = useState({
      uid : '',
      is_admin: false
    })
    const [inline,setInline] = useState({message:'',message_type:'info'});
    const [display,setDisplay] = useState('manage-users');
    const [displayMenu, setMenu] = useState({ menu: false });
    const { user_account_state } = useContext(UserAccountContext);
    const showDropdownMenu = e => {
      e.preventDefault();
      setMenu({ menu: true });
      document.addEventListener("click", hideDropdownMenu);
    };

    const hideDropdownMenu = () => {
      setMenu({ menu: false });
      document.removeEventListener("click", hideDropdownMenu);
    };


    

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
      };

      fetchPresentUser().then(result => {
        console.log(result);
      });

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
                  <i className="fa fa-dashboard"> </i>{' '} Dashboard{" "}
                </strong>
              </h3>

              <div className="box-tools">
                <div classNam="dropdown">
                  <button
                    type="button"
                    className="btn btn-box-tool dropdown-toggle"
                    onClick={e => showDropdownMenu(e)}
                  >
                    <i className="fa fa-bars"> </i>{" "}
                  </button>
                  {displayMenu.menu ? (
                    <ul className="dropmenu">
                      <li
                        className="btn btn-block droplink"
                        name="manage-payments"
                        onClick={() => setDisplay("manage-payments")}
                      >
                        <i className="fa fa-credit-card"> </i> Manage Payments{" "}
                      </li>
                      <li
                        className="btn btn-block droplink"
                        name="manage-users"
                        onClick={() => setDisplay("manage-users")}
                      >
                        <i className="fa fa-users"> </i> Manage Users{" "}
                      </li>

                      <li
                        className="btn btn-block droplink"
                        name="manage-contacts"
                        onClick={() => setDisplay("manage-contacts")}
                      >
                        <i className="fa fa-envelope"> </i> Manage Contact{" "}
                      </li>
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
            {display === "manage-payments" ? <ManagePayments /> : null}

            {display === "manage-users" ? <ManageUsers /> : null}

            {display === "manage-contacts" ? <ManageContact /> : null}
          </div>
        </Fragment>
      ) : (
        <NotAuthorized />
      )}
    </Fragment>
  );
}


export default Dashboard;


