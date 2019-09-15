import React,{Fragment,useState,useEffect,useContext} from 'react';
import {UserAccountContext} from '../../../context/UserAccount/userAccountContext';
import {
  store_init,
  store_errors_init,
  payment_init,
  payment_errors_init,
  products_init,
  products_errors_init,
  category_init,
  service_init
} from "../market-constants";
import InlineError from '../../Forms/InlineError';
import InlineMessage from '../../Forms/InlineMessage';

import * as apiRequests from '../api-requests';
import { Utils } from '../../../utilities';
import { api_products_endpoint } from '../../../constants/routes';



const Store = () => {
    const [store, setStore] = useState(store_init);
    const [errors, setErrors] = useState(store_errors_init);
    const [inline, setInline] = useState({ message: "", message_type: "info" });
    const [my_form,setForm] = useState({primary : 'Add Store',reset:'Reset'});
    const { user_account_state } = useContext(UserAccountContext);

    const checkErrors = async e => {
      let isError = false;
      
      const check_store_name = () => {
        if(Utils.isEmpty(store.store_name)){
          setErrors({...errors,store_name_error : 'store name field cannot be empty'});
          return true;
        }
        return false;
      }

      const check_description = () => {
        if(Utils.isEmpty(store.description)){
          setErrors({...errors,description_error : 'desciprition field cannot be empty'});
          return true;
        }
        return false;
      }

      const check_company_name = () => {
        if(Utils.isEmpty(store.company_name)){
          setErrors({...errors,company_name_error: 'company name field cannot be empty'});
          return true;
        }
        return false;
      }

      const check_physical_address = () => {
        if(Utils.isEmpty(store.physical_address)){
          setErrors({...errors,physical_address_error : 'physical address field cannot be empty'});
          return true;
        }
        return false;
      }

      const check_tel = () => {
        if(Utils.isTel(store.tel) === false){
          setErrors({...errors,tel_error : 'telephone field is invalid'});
          return true;
        }
        return false;
      }

      const check_cell = () => {
        if(Utils.isCell(store.cell) === false){
          setErrors({...errors,cell_error : 'cell number field is invalid'});
          return true;
        }
        return false;
      }

      const check_email = () => {
        if(Utils.validateEmail(store.email) === false){
          setErrors({...errors,email_error : 'email field is invalid'});
          return true;
        }
        return false;
      }

       const check_website = () => {
         if(!Utils.isEmpty(store.website)){
         if(Utils.isUrl(store.website) === false){
           setErrors({...errors,website_error:"website field is invalid"});
           return true;
         }
         return false;
        }
        return false;         
       }

       const do_check = () => {
         check_store_name() ? isError = true : isError = isError;
         check_description() ? isError = true : isError = isError;
         check_company_name() ? isError = true : isError = isError;
         check_physical_address() ? isError = true : isError = isError;
         check_tel() ? isError = true : isError = isError;
         check_cell() ? isError = true : isError = isError;
         check_email() ? isError = true : isError = isError;
         check_website() ? isError = true : isError = isError;

         return isError;
       }

       return do_check();
    };

    const addStore = async e => {
        let uid = user_account_state.user_account.uid;
        let client_store = {...store};
        client_store.uid = uid;
        client_store = JSON.stringify(client_store);
        apiRequests.addStore(client_store).then(response => {
          if(response.status){
            setStore(response.payload);
            setInline({message:'successfully updated store',message_type:'info'});
          }else{
            setInline({message:'error adding new store',message_type:'error'});
          }
        }).catch(error => {
          setInline({message:error.message,message_type:'error'});
        });

        return true;
    };

    useEffect(() => {

      const fetchStore = async () => {
        let uid = user_account_state.user_account.uid;
        await apiRequests.fetchStore(uid).then(response => {
          if (response.status) {
            setStore(response.payload);
            setForm({...my_form,primary:'Update Store'});
          } else {
            console.log(response.error.message);
          }
        });
        return true;
      };

      fetchStore().then(success => {console.log('Store fetched')});

      return () => {
        setStore(store_init);
        setErrors(store_errors_init);
        setInline({message:'',message_type:'info'});
      };
    }, []);
    return (
      <Fragment>
        <div className="box box-body">
          <div className="box box-header">
            <h3 className="box-title"> <i className='fa fa-shopping-basket'> </i>  Store Manager</h3>

            <div className='box-tools'>
            </div>
          </div>
          <div className='box box-footer'>
            <form className="form-horizontal">
              <div className="form-group">
                <label>Store Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="store_name"
                  value={store.store_name}
                  onChange={e =>
                    setStore({ ...store, [e.target.name]: e.target.value })
                  }
                />
                {errors.store_name_error ? <InlineError message={errors.store_name_error} /> : '' }
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={store.description}
                  onChange={e =>
                    setStore({ ...store, [e.target.name]: e.target.value })
                  }
                />
                {errors.description_error ? <InlineError message={errors.description_error} /> : ''}
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="company_name"
                  value={store.company_name}
                  onChange={e =>
                    setStore({ ...store, [e.target.name]: e.target.value })
                  }
                />
                {errors.company_name_error ? <InlineError message={errors.company_name_error} /> : ''}
              </div>
              <div className="form-group">
                <label>Physical Address</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="physical_address"
                  value={store.physical_address}
                  onChange={e =>
                    setStore({ ...store, [e.target.name]: e.target.value })
                  }
                />
                {errors.physical_address_error ? <InlineError message={errors.physical_address_error} /> : ''}
              </div>
              <div className="form-group">
                <label>Tel</label>
                <input
                  type="text"
                  className="form-control"
                  name="tel"
                  value={store.tel}
                  onChange={e =>
                    setStore({ ...store, [e.target.name]: e.target.value })
                  }
                />
                {errors.tel_error ? <InlineError message={errors.tel_error} /> : ''}
              </div>
              <div className="form-group">
                <label>Cell</label>
                <input
                  type="text"
                  className="form-control"
                  name="cell"
                  value={store.cell}
                  onChange={e =>
                    setStore({ ...store, [e.target.name]: e.target.value })
                  }
                />
                {errors.cell_error ? <InlineError message={errors.cell_error} /> : ''}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={store.email}
                  onChange={e =>
                    setStore({ ...store, [e.target.name]: e.target.value })
                  }
                />
                {errors.email_error ? <InlineError message={errors.email_error} /> : ''}
              </div>
              <div className="form-group">
                <label>Website</label>
                <input
                  type="text"
                  className="form-control"
                  name="website"
                  value={store.website}
                  onChange={e =>
                    setStore({ ...store, [e.target.name]: e.target.value })
                  }
                />
                {errors.website_error ? <InlineError message={errors.website_error} /> : ''}
              </div>
              <div className='form-group'>
                  <button
                    type='button'
                    className='btn btn-success btn-lg'
                    name='save-company'
                    onClick={e => checkErrors(e).then(isError => {
                      isError ? 
                        setInline({message:'error processing form', message_type:'error'})
                      : addStore(e).then(response => {
                        console.log(response);
                      })
                    })}
                  >
                    <i className='fa fa-save'> </i> {' '}
                    {my_form.primary}
                    
                  </button>
                  <button
                    type='button'
                    className='btn btn-warning btn-lg'
                    name='reset'
                    onClick={e => {
                      setInline({message:'',message_type:'info'});
                      setErrors(store_errors_init);
                      setStore(store_init);
                    }}
                  >
                    <i className='fa fa-eraser'> </i> {' '}
                    Reset
                  </button>
              </div>
              <div className='form-group'>
                {inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type} /> : ''}
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
};






const StoreManager = () => {
    const[display,setDisplay] = useState('store');
    const{user_account_state} = useContext(UserAccountContext);

    return (
      <Fragment>
        <div className="box box-warning">
          <div className="box box-header">
            <h3 className="box-title">
              <i className="fa fa-dashboard"> </i> Store Manager
            </h3>
            <div className="box-tools">
              <button
                type="button"
                className="btn btn-box-tool"
                name="store"
                onClick={e => setDisplay(e.target.name)}
              >
                <i className="fa fa-product-hunt"> </i> Store Manager
              </button>

            </div>
          </div>

          {display === "store" ? <Store /> : ""}

        </div>
      </Fragment>
    );
}

export default StoreManager;
