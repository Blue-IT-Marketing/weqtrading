import React, { Fragment,useContext,useState,useEffect } from 'react'
import { UserAccountContext } from "../../context/UserAccount/userAccountContext";
import { routes } from "../../constants";
import {payment_init, payment_errors_init} from '../Market/market-constants';
import * as apiRequests from './dashboard-api';
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
              <h3 className='box-title'>Payments Manager </h3>
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
                  <i className="fa fa-dashboard"> </i> Dashboard{" "}
                </strong>
              </h3>

              <div className="box-tools">
                <button className="btn btn-box-tool">
                  {" "}
                  <strong>
                    {" "}
                    <i className="fa fa-callout-info"> </i> Manage Payments{" "}
                  </strong>{" "}
                </button>

              </div>
            </div>


            <ManagePayments />

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


