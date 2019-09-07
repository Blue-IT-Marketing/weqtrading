import React,{Fragment,useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import InlineError from '../../Forms/InlineError';
import InlineMessage from '../../Forms/InlineMessage';


import {
  physical_address_init,
  physical_address_errors_init,
  contact_details_init,
  contact_details_errors_init
} from "../market-constants";


import * as APIRequests from '../api-requests';
import {firebase} from '../../../firebase';
import { Utils } from '../../../utilities';

import * as settings from '../../../constants';


const BasketItem = ({item}) => {
    return(<li className='list-group-item'></li>)
}

const ShoppingBasket = () => {
    const[basket,setBasket] = useState([]);
    const[coupons,setCoupons] = useState({
      code_id : '',
      discount_percentage : 0,
      code : '',
      valid : false
    });

    const[inline,setInline] = useState({message:'',message_type:'info'});

    return (
      <Fragment>
        <div className="box box-body">
          <div className="box box-header">
            <h3 className="box-title">
              <i className="fa fa-shopping-basket"> </i> Shopping Basket
            </h3>
          </div>

          <div className="box box-warning">
            <div className='row'>
                <div className='box box-footer col-md-8'>
                    <div className='box box-header'>
                        <h3 className='box-title'>
                          <i className='fa fa-shopping-cart'> </i>{' '}
                           Shopping Items</h3>

                        <div className='box-tools'>
                            <button
                              type='button'
                              className='btn btn-box-tool btn-outline-danger'
                              name='clear_items'
                            >
                              <i className='fa fa-eraser'>{' '}</i>{' '}
                              Clear Items
                            </button>
                        </div>
                    </div>
                    <ul className="list-group">
                        {
                          basket.length > 0 ?
                          (
                          basket.map((item,index) => {
                            return(<BasketItem item={item} key={index} /> : '')
                          })
                        ):(
                          <span
                            className='box box-warning'
                          >There are not items in your shopping list</span>
                        )
                        
                        }
                    </ul>

                </div>    
                <div className='box box-footer col-md-4'>
                    <div className='box box-header'>
                        <h3 className='box-title'>
                          <i className='fa fa-shopping-bag'> </i>{' '}
                           Check Out </h3>
                    </div>

                    <ul className='list-group'>
                      <li className='list-group-item'>Sub Totals : </li>
                      <li className='list-group-item'> Tax : </li>
                      <li className='list-group-item'> Total : </li> 
                      <li className='list-group-item'>
                        <input 
                            type='text'  
                            className='form-control'
                            name='coupon_code'
                            placeholder='Coupon Code...'
                            value={coupons.code}
                            onChange={e => setCoupons({...coupons,[e.target.name]: e.target.value})}
                          />
                      </li>  
                      <li className='list-group-item'>
                          <button
                            type='button'
                            className='btn btn-danger margin'
                            name='applycode'
                          >
                            <i className='fa fa-money'> </i>{' '}
                            Apply Code
                          </button>  
                          <button
                            type='button'
                            className='btn btn-success margin'
                            name='checkout'
                          >
                           <i className='fa fa-shopping-bag'> </i>{' '}  
                           Checkout
                          </button>
                      </li>                 
                    </ul>
                </div>
          </div>
        </div>

        </div>
      </Fragment>
    );
};

const PhysicalAddress = () => {
    const [physical,setPhysical] = useState(physical_address_init);
    const [errors,setErrors] = useState(physical_address_errors_init);
    const [inline,setInline] = useState({message: '',message_type:'info'});

    const checkErrors = async e => {
      let isError = false;

      const check_deliver_to = () => {
        if(Utils.isEmpty(physical.deliver_to)){
          setErrors({
            ...errors,
            deliver_to_error : 'Deliver to field cannot be empty'
          });
          return true;
        }
        return false;
      }
      const check_stand = () => {
        if(Utils.isEmpty(physical.stand)){
          setErrors({
            ...errors,
            stand_error : 'stand number field cannot be empty'
          });
          return true;
        }
        return false;
      }
      const check_street_name = () => {
        if(Utils.isEmpty(physical.street_name)){
          setErrors({
            ...errors,
            street_name_error : 'street name field cannot be empty'
          });
          return true;
        }
        return false;
      }
      const check_city = () => {
        if(Utils.isEmpty(physical.city)){
          setErrors({
            ...errors,
            city_error : 'city name field cannot be empty'
          });
          return true;
        }
        return false;
      }
      const check_province = () => {
        if(Utils.isEmpty(physical.province)){
          setErrors({
            ...errors,
            province_error : 'province name field cannot be empty'
          });
          return true;
        }
        return false;
      }
      const check_country = () => {
        if(Utils.isEmpty(physical.country)){
          setErrors({
            ...errors,
            country_error : 'country field cannot be empty'
          });
          return true;
        };
        return false;
      }
      const check_postal_code = () => {
        if(Utils.isEmpty(physical.postal_code)){
          setErrors({
            ...errors,
            postal_code_error:'postal code error field cannot be empty'
          });
          return true;
        }
        return false;
      }

      const do_check = () => {
          check_deliver_to() ? isError = true : isError = isError;
          check_stand() ? (isError = true) : (isError = isError);
          check_street_name() ? (isError = true) : (isError = isError);
          check_city() ? (isError = true) : (isError = isError);
          check_province() ? (isError = true) : (isError = isError);
          check_country() ? (isError = true) : (isError = isError);
          check_postal_code() ? (isError = true) : (isError = isError);

          return isError;
      };

      return await do_check();

    };

    const addPhysicalAddress = async e => {
      
      let physical_address = Object.assign({},physical);
      physical_address.uid = firebase.auth.currentUser.uid;
      physical_address = JSON.stringify(physical_address);

      await APIRequests.savePhysicalAddress(physical_address).then(response => {
          if (response.status) {
            setPhysical(response.payload);
            setInline({message: "successfully saved physical address",message_type: "info"
            });
          } else {
            setInline({
              message: response.error.message,
              message_type: "error"
            });
          }
        })
        .catch(error => {
          setInline({ message: error.message, message_type: "error" });
      });

      return true;
    };


    useEffect(() => {

      // load physical address for this user
      const loadPhysicalAddress = async () => {

        let seed = firebase.auth.currentUser.uid;        
        let stateKey = settings.settings.localStorageKey + 'physical-address-' + seed + '-';

        await APIRequests.fetchPhysicalAddress(seed,stateKey).then(physical => {
          setPhysical(physical);
        }).catch(error => {
          console.log(error);
        });
        return true;
      };

      loadPhysicalAddress().then(result => {
        console.log(result);
      });

      return () => {
        setPhysical(physical_address_init);
        setErrors(physical_address_errors_init);
        setInline({message:'',message_type:'info'});
      };
    }, [])

    return (
      <Fragment>
        <div className="box box-body">
          <div className="box box-header">
            <h3
              className="box-title"
              title={
                "an address where your service should be rendered or where you are located if a service is virtual"
              }
            >
              <i className="fa fa-map-marker"> </i> Delivery Address
            </h3>
          </div>

          <form className="form-horizontal">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="deliver_to"
                placeholder="Deliver to, or a place where the service will be rendered..."
                value={physical.deliver_to}
                onChange={e =>
                  setPhysical({ ...physical, [e.target.name]: e.target.value })
                }
              />
              {errors.deliver_to_error ? <InlineError message={errors.deliver_to_error} /> : ''}
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="stand"
                placeholder="Stand Number ..."
                value={physical.stand}
                onChange={e =>
                  setPhysical({ ...physical, [e.target.name]: e.target.value })
                }
              />
              {errors.stand_error ? <InlineError message={errors.stand_error} /> : ''}
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="street_name"
                placeholder="Street Name...."
                value={physical.street_name}
                onChange={e =>
                  setPhysical({ ...physical, [e.target.name]: e.target.value })
                }
              />
              {errors.street_name_error ? <InlineError message={errors.street_name_error} /> : ''}
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="city"
                placeholder="City..."
                value={physical.city}
                onChange={e =>
                  setPhysical({ ...physical, [e.target.name]: e.target.value })
                }
              />
              {errors.city_error ? <InlineError message={errors.city_error} /> : ''}
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="province"
                placeholder="Province..."
                value={physical.province}
                onChange={e =>
                  setPhysical({ ...physical, [e.target.name]: e.target.value })
                }
              />
              {errors.province_error ? <InlineError message={errors.province_error} /> : ''}
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="country"
                placeholder="Country..."
                value={physical.country}
                onChange={e =>
                  setPhysical({ ...physical, [e.target.name]: e.target.value })
                }
              />
              {errors.country_error ? <InlineError message={errors.country_error} /> : ''}
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="postal_code"
                placeholder="Postal Code..."
                value={physical.postal_code}
                onChange={e =>
                  setPhysical({ ...physical, [e.target.name]: e.target.value })
                }
              />
              {errors.postal_code_error ? <InlineError message={errors.postal_code_error} /> : ''}
            </div>

            <div className="form-group">
              <button
                type="button"
                className="btn btn-success btn-lg"
                name="save_physical"
                onClick={e => checkErrors(e).then(isError => {
                  isError ?
                    setInline({message:'there was an error processing form',message_type:'error'})
                  : addPhysicalAddress(e).then(response => {
                    console.log(response);
                  })
                })}
              >
                <i className="fa fa-save"> </i> Add Physical Address
              </button>
              <button
                type="button"
                className="btn btn-warning btn-lg"
                name="reset"
                onClick={e => {
                  setErrors(physical_address_errors_init);
                  setPhysical(physical_address_init);
                  setInline({message:'',message_type:'info'});
                }}
              >
                <i className="fa fa-eraser"> </i> Reset
              </button>
            </div>

            <div className='form-group'>
                {
                  inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type} /> : ''
                }
            </div>
          </form>
        </div>
      </Fragment>
    );
};


const ContactDetails = () => {
    const [contact,setContact] = useState(contact_details_init);
    const [errors,setErrors] = useState(contact_details_errors_init);
    const [inline,setInline] = useState({message:'',message_type:'info'});


    const checkErrors = async e  => {
      let isError = false;

      const check_tel = () => {
        if(Utils.isEmpty(contact.tel) === false){
        if(Utils.isTel(contact.tel) === false){
          setErrors({
            ...errors,
            tel_error : 'tel field is invalid'
          });
          return true;
        }
        return false;
      }
      return true;
      }

      const check_cell = () => {
        if (Utils.isCell(contact.cell === false)) {
          setErrors({
            ...errors,
            cell_error: "cell field is invalid"
          });
          return true;
        }
        return false;
      }

      const check_fax = () => {
        if (Utils.isEmpty(contact.fax) === false){
          if (Utils.isFax(contact.fax === false)) {
            setErrors({
              ...errors,
              fax_error: "fax field is invalid"
            });
            return true;
          }
          return false;
        }
        return true;
      }

      const check_email = () => {
        if (Utils.validateEmail(contact.email) === false) {
          setErrors({
            ...errors,
            email_error: "email field is invalid"
          });
          return true;
        }
        return false;
      }

      const check_website = () => {
        if(Utils.isEmpty(contact.website) === false){
          if(Utils.isUrl(contact.website) === false){
            setErrors({
              ...errors,
              website_error : 'website address is invalid'
            });
            return true;
          }
          return false;
        }
        return true;
      }

      const do_check = () => {
        check_tel() ? isError = true : isError = isError;
        check_cell() ? (isError = true) : (isError = isError);
        check_fax() ? (isError = true) : (isError = isError);
        check_email() ? (isError = true) : (isError = isError);
        check_website() ? (isError = true) : (isError = isError);
        return isError;
      }

      return await do_check();
    }

    const onAddContactDetails = async e => {
      let contact_details = Object.assign({},contact);
      contact_details.uid = firebase.auth.currentUser.uid;
      contact_details = JSON.stringify(contact_details);

      APIRequests.saveContactDetails(contact_details).then(response => {
          if(response.status){
            setContact(response.payload);
            setInline({message:'successfully saved contact details',message_type:'info'});
          }else{
            setInline({message:response.error.message,message_type:'error'});
          }
      }).catch(error => {
          setInline({message: error.message,message_type:'error'});
      });

      return true;
    }

    useEffect(() => {
      const fetchContacts = async () => {
        let seed = firebase.auth.currentUser.uid;
        let stateKey = settings.settings.localStorageKey + 'contact-details-' + seed + '-';

        await APIRequests.fetchContactDetails(seed, stateKey).then(response => {
          setContact(response);
        }).catch(error => {
          console.log(error);
        });

        return true;
      };

      fetchContacts().then(result => console.log(result));

      return () => {
        setContact(contact_details_init);
        setErrors(contact_details_errors_init);
        setInline({message:'',message_type:'info'});
      };
    }, []);

    return(
        <Fragment>
            <div className='box box-body'>
                <div className='box box-header'>
                    <h3 className='box-title'>
                        <i className='fa fa-mobile-phone'> </i>{' '}
                        Contact Details
                    </h3>
                </div>

                <form className='form-group'>
                    <div className='form-group'>
                        <input 
                            type='tel'
                            className='form-control'
                            name='tel'
                            placeholder='Tel...'
                            value={contact.tel}
                            onChange={e => setContact({...contact,[e.target.name]:e.target.value})}
                        />
                        {errors.tel_error ? <InlineError message={errors.tel_error} /> : ''}
                    </div>

                    <div className='form-group'>
                        <input 
                            type='tel'
                            className='form-control'
                            name='cell'
                            placeholder='Cell...'
                            value={contact.cell}
                            onChange={e => setContact({...contact,[e.target.name]:e.target.value})}
                        />
                        {errors.cell_error ? <InlineError message={errors.cell_error} /> : ''}
                    </div>

                    <div className='form-group'>
                        <input 
                            type='tel'
                            className='form-control'
                            name='fax'
                            placeholder='Fax...'
                            value={contact.fax}
                            onChange={e => setContact({...contact,[e.target.name]:e.target.value})}
                        />
                        {errors.fax_error ? <InlineError message={errors.fax_error} /> : ''}
                    </div>

                    <div className='form-group'>
                        <input 
                            type='email'
                            className='form-control'
                            name='email'
                            placeholder='Email...'
                            value={contact.email}
                            onChange={e => setContact({...contact,[e.target.name]:e.target.value})}
                        />
                        {errors.email_error ? <InlineError message={errors.email_error} /> : ''}
                    </div>

                    <div className='form-group'>
                        <input 
                            type='url'
                            className='form-control'
                            name='website'
                            placeholder='Website Address...'
                            value={contact.website}
                            onChange={e => setContact({...contact,[e.target.name]:e.target.value})}
                        />
                        {errors.website_error ? <InlineError message={errors.website_error} /> : ''}
                    </div>

                    <div className='form-group'>
                        <button
                            type='button'
                            className='btn btn-success btn-lg'
                            name='save-contacts'
                            onClick={e => checkErrors(e).then(isError => {
                              isError ?
                                setInline({message: 'error processing contact form'})
                              : onAddContactDetails(e).then(result => {
                                console.log(result);
                              });
                            })}
                        >
                            <i className='fa fa-save'> </i>{' '}
                            Save Contacts
                        </button>
                        <button
                            type='button'
                            className='btn btn-warning btn-lg'
                            name='reset'
                            onClick={e => {
                              setContact(contact_details_init);
                              setErrors(contact_details_errors_init);
                              setInline({message:'',message_type:'info'});
                            }}
                        >
                            <i className='fa fa-eraser'> </i>{' '}
                            Reset
                        </button>
                    </div>

                    <div className='form-group'>
                        {
                          inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type} /> : ''
                        }
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

const PaymentDetails = () => {
  return(
    <Fragment>
      <div className='box box-body'>
          <div className='box box-header'>
              <h3 className='box-title'></h3>
          </div>
      </div>
    </Fragment>
  )
};


const CheckOut = () => {
    const [display,setDisplay] = useState('physical_address');
    return (
        <Fragment>
            <div className='box box-body'>
                <div className='box box-header'>
                    <h3 className='box-title'>
                        <i className='fa fa-shopping-cart'> </i>{' '}
                        Check Out
                    </h3>
                    <div className='box-tools'>
                        <button
                            type='button'
                            className='btn btn-box-tool btn-outline-dark'
                            name='physical_address'
                            onClick={e => setDisplay(e.target.name)}
                        >
                            <i className='fa fa-map-pin'> </i> {' '}
                            Physical Address
                        </button>

                        <button
                            type='button'
                            className='btn btn-box-tool btn-outline-dark'
                            name='contact_details'
                            onClick={e => setDisplay(e.target.name)}
                        >
                            <i className='fa fa-mobile-phone'> </i> {' '}
                            Contact Details
                        </button>

                        <button
                            type='button'
                            className='btn btn-box-tool btn-outline-dark'
                            name='shopping_basket'
                            onClick={e => setDisplay(e.target.name)}
                        >
                            <i className='fa fa-shopping-basket'> </i> {' '}
                            Shopping Basket
                        </button>
                    </div>
                </div>

                {
                    display === 'physical_address' ? 
                        <PhysicalAddress /> :''
                }
                {
                    display === 'contact_details' ? 
                        <ContactDetails /> : ''
                }
                {
                    display === 'shopping_basket' ? 
                        <ShoppingBasket /> : ''
                }
            </div>
        </Fragment>                    
    );
}

export default CheckOut;
