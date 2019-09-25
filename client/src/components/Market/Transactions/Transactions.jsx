import React, { Fragment, useState, useEffect, useContext } from "react";
import { UserAccountContext } from "../../../context/UserAccount/userAccountContext";
import {
  store_init,
  store_errors_init,
  payment_init,
  payment_errors_init
} from "../market-constants";
import InlineError from "../../Forms/InlineError";
import InlineMessage from "../../Forms/InlineMessage";

import * as apiRequests from "../api-requests";
import { Utils } from "../../../utilities";
import {firebase} from '../../../firebase';
import {Capitalize} from 'react-lodash';

const CreatePayment = () => {
  const [payment, setPayment] = useState(payment_init);
  const [errors, setErrors] = useState(payment_errors_init);
  const [inline, setInline] = useState({ message: "", message_type: "inf" });

  const { user_account_state } = useContext(UserAccountContext);

  const checkErrors = async e => {
    let isError = false;
    const check_amount = () => {
      if (Utils.isMoney(payment.amount) === false) {
        setErrors({ ...errors, amount_error: "amount field is invalid" });
        return true;
      }
      return false;
    };

    const check_transaction_type = e => {
      if (Utils.isEmpty(payment.transaction_type)) {
        setErrors({
          ...errors,
          transaction_type_error: "please select transaction type"
        });
        return true;
      }
      return false;
    };

    const do_check = e => {
      check_amount() ? (isError = true) : (isError = isError);
      check_transaction_type() ? (isError = true) : (isError = isError);

      return isError;
    };

    return await do_check(e);
  };

  const createTransaction = async e => {
    let client_transaction = { ...payment };
    client_transaction.uid = user_account_state.user_account.uid;
    client_transaction = JSON.stringify(client_transaction);
    await apiRequests
      .createTransaction(client_transaction)
      .then(Response => {
        if (Response.status) {
          setPayment(Response.payload);
          setInline({
            message: "successfully created a new transaction",
            message_type: "info"
          });
        } else {
          setInline({ message: Response.error.message, message_type: "error" });
        }
      })
      .catch(error => {
        setInline({ message: error.message, message_type: "error" });
      });

    return true;
  };

  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">
            <i className="fa fa-cc-mastercard"> </i> Create Transaction
          </h3>
        </div>

        <form className="form-horizontal">
          <div className="form-group">
            <label>Amount</label>
            <input
              type="text"
              className="form-control"
              name="amount"
              value={payment.amount}
              onChange={e =>
                setPayment({ ...payment, [e.target.name]: e.target.value })
              }
            />
            {errors.amount_error ? (
              <InlineError message={errors.amount_error} />
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label>Transaction Type</label>
            <select
              className="form-control"
              name="transaction_type"
              value={payment.transaction_type}
              onChange={e =>
                setPayment({ ...payment, [e.target.name]: e.target.value })
              }
            >
              <option value={"deposit"}>Deposit</option>
              <option value={"withdrawal"}>Withdrawal</option>
            </select>
            {errors.transaction_type_error ? (
              <InlineError message={errors.transaction_type_error} />
            ) : (
              ""
            )}
          </div>

          <div className="form-group">
            <button
              type="button"
              className="btn btn-success btn-lg"
              name="create_transaction"
              onClick={e =>
                checkErrors(e).then(isError => {
                  isError
                    ? setInline({
                        message: "there was an error processing form"
                      })
                    : createTransaction(e).then(result => {
                        console.log(result);
                      });
                })
              }
            >
              <strong>
                <i className="fa fa-dollar"> </i> Create Transaction
              </strong>
            </button>
          </div>

          <div className="form-group">
            {inline.message ? (
              <InlineMessage
                message={inline.message}
                message_type={inline.message_type}
              />
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </Fragment>
  );
};


const Deposit = ({ transaction }) => {
  const [deposit, setDeposit] = useState({
    uid: '',
    transaction_id : '',
    proof_of_deposit : '',
  });
  const [uploaded, setUploaded] = useState({
    image: "",
    url: "",
    size: 0,
    filename: "",
    progress: 0
  });

  const[inline,setInline] = useState({message:'',message_type:'inf'});


  const { user_account_state } = useContext(UserAccountContext);

  const doUpload = async e => {
    const { image } = uploaded;
    try {
      const uploadTask = firebase.storage.ref(`deposits/${user_account_state.user_account.uid}/${transaction.id}/${image.name}`).put(image);
      await uploadTask.on(
        "state_changed",
        snapshot => {
          //progress
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploaded({ ...uploaded, progress });
        },
        error => {
          console.log(error.message);
        },
        () => {
          // complete function
          firebase.storage
            .ref(`deposits/${user_account_state.user_account.uid}/${transaction.id}`)
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              console.log(url);
              setDeposit({
                ...deposit,
                proof_of_deposit: url
              });
            });
        }
      );
    } catch (error) {
      console.log(error)
      setInline({message:'upload proof of deposit',message_type:'error'});
    }

  };

  const onChangeProof = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      console.log(image);
      setUploaded({
        ...uploaded,
        image: image
      });
      return true;
    }
    return false;
  };


  const ProcessPayment = e => {
      let uid = user_account_state.user_account.uid;
      // rewrite this
      let deposited = {...deposit};
      deposited.uid = uid;
      deposited.transaction_id = transaction.id;

      apiRequests.processDeposit(deposited).then(result => {
        if(result.status){
          setDeposit(result.payload);
          setInline({message:'successfully sent deposit for processing'});
        }else{
          setInline({message:result.error.message,message_type:'error'});
        }
      }).catch(error => {
        setInline({message:error.message,message_type:'error'});
      });

      return true;
  };

  const placeholder = "https://via.placeholder.com/300/09f/fff.png";

  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">
            <i className="fa fa-cc-amex"> </i> Deposit
          </h3>
          <div className="box-tools">
            <button type="button" className="btn btn-box-tool" name="eft">
              <i className="fa fa-bank"> </i> EFT
            </button>
            <button type="button" className="btn btn-box-tool" name="paypal">
              <i className="fa fa-paypal"> </i> PayPal / Credit Card
            </button>
          </div>
        </div>

        <form className="form-horizontal">
          <div className="form-group">
            <label>Date </label>
            <input
              type="text"
              className="form-control"
              name="date"
              value={transaction.date}
            />
          </div>

          <div className="form-group">
            <label>Amount </label>
            <input
              type="text"
              className="form-control"
              name="amount"
              value={transaction.amount}
            />
          </div>

          <div className="form-group">
            <label>Processed</label>
            <input
              type="text"
              className="form-control"
              value={transaction.processed}
            />
          </div>

          <div className="form-group">
            <label>Transaction Type</label>
            <input
              type="text"
              className="form-control"
              value={transaction.transaction_type}
            />
          </div>

          <div className="form-group">
            <label>Proof of Payment</label>
            <input type="file" className="form-control" name="proof" onChange={e => onChangeProof(e)}  />
          </div>

          <div className="form-group">
            <button
              type="button"
              className="btn btn-success btn-sm"
              name="upload-proof-payment"
              onClick={e => doUpload(e).then(result => {
                console.log(result)
              })}
            >
              {" "}
              <i className="fa fa-cloud-upload"> </i> Upload Proof of Payment
            </button>
          </div>
          <div className="form-group">
            <div className="polaroid">
              <label>Proof of Payment</label>
              <img
                src={deposit.proof_of_deposit || placeholder}
                className="pola-image"
                width="300"
                height="300"
              />
            </div>
          </div>

          <div className='form-group'>
              <button
                type='button'
                className='btn btn-success btn-lg'
                name='process-payment'
                onClick={e => ProcessPayment(e)}
              >
                <i className='fa fa-credit-card'> </i>{" "}
                Process Payment

              </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const Withdrawal = ({ transaction }) => {
  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">
            <i className="fa fa-cc-amex"> </i> Withdrawal
          </h3>
        </div>

        <form className="form-horizontal">
          <div className="form-group">
            <label>Date </label>
            <input
              type="text"
              className="form-control"
              name="date"
              value={transaction.date}
            />
          </div>

          <div className="form-group">
            <label>Amount </label>
            <input
              type="text"
              className="form-control"
              name="amount"
              value={transaction.amount}
            />
          </div>

          <div className="form-group">
            <label>Processed</label>
            <input
              type="text"
              className="form-control"
              value={transaction.processed}
            />
          </div>

          <div className="form-group">
            <label>Transaction Type</label>
            <input
              type="text"
              className="form-control"
              value={transaction.transaction_type}
            />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const ShowTransaction = ({ transaction }) => {
  return (
    <Fragment>
      <div className="box box-info">
        <div className="box box-header">
          <h3 className="box-title">Transaction Details</h3>
        </div>
        {transaction.transaction_type === "withdrawal" ? (
          <Withdrawal transaction={transaction} />
        ) : (
          <Deposit transaction={transaction} />
        )}
      </div>
    </Fragment>
  );
};

const TransactionItem = ({
  transaction,
  OpenTransaction,
  RemoveTransaction
}) => {
  return (
    <tr>
      <td>{transaction.date}</td>
      <td>R {transaction.amount}.00</td>
      <td>{<Capitalize string={transaction.transaction_type} /> }</td>
      <td>{transaction.processed ? "Yes" : "No"}</td>      
        {" "}
        <button
          type="button"
          className="btn btn-danger btn-sm margin"
          name={transaction.id}
          onClick={e => {
            let id = transaction.id;
            RemoveTransaction(id);
          }}
          title="Delete"
        >
          <i className="fa fa-cut"> </i>
        </button>
        <button
          type="button"
          className="btn btn-warning btn-sm"
          name={transaction.id}
          onClick={e => {
            let id = transaction.id;
            OpenTransaction(id);
          }}
          title="Open"
        >
          <i className="fa fa-folder-open"> </i>
        </button>
      
    </tr>
  );
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState(payment_init);
  const [display, setDisplay] = useState("transaction-list");
  const [inline, setInline] = useState({ message: "", message_type: "inf" });
  const { user_account_state } = useContext(UserAccountContext);

  const OpenTransaction = id => {
    let found_transaction = transactions.find(
      transaction => transaction.id === id
    );
    setTransaction(found_transaction);
    //fire a condition to open a transaction
    setDisplay("show-transaction");
  };

  const RemoveTransaction = id => {
    let uid = user_account_state.user_account.uid;
    apiRequests.removeTransaction(id, uid).then(Response => {
        if (Response.status) {
          setTransactions(Response.payload);
        } else {
          setInline({ message: Response.error.message, message_type: "error" });
        }
      })
      .catch(error => {
        setInline({ message: error.message, message_type: "error" });
      });
  };

  useEffect(() => {
    const fetchTransactionsAPI = async () => {
      const uid = user_account_state.user_account.uid;
      apiRequests
        .fetchTransactions(uid)
        .then(Response => {
          if (Response.status) {
            setTransactions(Response.payload);
            console.log("Transactions Fetched", Response.payload);
          } else {
            console.log("Transactions", Response.error);
          }
        })
        .catch(error => {
          console.log("Transactions", error.message);
        });
      return true;
    };

    fetchTransactionsAPI().then(result => {
      console.log(result);
    });

    return () => {
      setTransaction(payment_init);
      setTransactions([]);
    };
  }, []);

  return (
    <div className="box box-body">
      <div className="box box-header">
        <h3 className="box-title">
          <i className="fa fa-cc-diners-club"> </i> Transactions
        </h3>
        <div className="box-tools">
          <button
            type="button"
            className="btn btn-box-tool"
            name="transactions"
            onClick={e => setDisplay("transactions-list")}
          >
            <i className="fa fa-server"> </i> Transaction List
          </button>
        </div>
      </div>

      {display === "show-transaction" ? (
        <ShowTransaction transaction={transaction} />
      ) : (
        <table className="table table-responsive">
          <thead>
            <tr>
              <td>Date</td>
              <td>Amount</td>
              <td>Transaction Type</td>
              <td>Processed</td>
              <td>Control</td>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => {
              return (
                <TransactionItem
                  RemoveTransaction={RemoveTransaction}
                  OpenTransaction={OpenTransaction}
                  transaction={transaction}
                  key={transaction.id}
                />
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>Date</td>
              <td>Amount</td>
              <td>Transaction Type</td>
              <td>Processed</td>
              <td>Control</td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

const Payments = () => {
  const [display, setDisplay] = useState("transactions");
  const [displayMenu,setMenu] = useState({menu:false});

    const showDropdownMenu = e => {
      e.preventDefault();
      setMenu({ menu: true });
      document.addEventListener("click", hideDropdownMenu);
    };

    const hideDropdownMenu = () => {
      setMenu({ menu: false });
      document.removeEventListener("click", hideDropdownMenu);
    };

  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">
            <i className="fa fa-cc-paypal"> </i> Payments
          </h3>

          <div className="box-tools">
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-box-tool dropdown-toggle"
                onClick={e => showDropdownMenu(e)}
              >
                <i className="fa fa-money"> </i> Payments{" "}
              </button>
              {displayMenu.menu ? (
                <ul className="dropmenu">
                  <li
                    className="btn btn-block droplink"
                    name="transactions"
                    onClick={e => setDisplay("transactions")}
                  >
                    <i className="fa fa-cc-amex"> </i> Transactions
                  </li>
                  <li
                    className="btn btn-block droplink"
                    name="create-payment"
                    onClick={e => setDisplay("create-payment")}
                  >
                    <i className="fa fa-cc-amex"> </i> Create Transaction
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {display === "transactions" ? <Transactions /> : ""}
        {display === "create-payment" ? <CreatePayment /> : ""}
      </div>
    </Fragment>
  );
};


export default Payments