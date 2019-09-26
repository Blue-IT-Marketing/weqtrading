import React,{Fragment,useState,useEffect,useContext,useRef} from 'react';
import {Link} from 'react-router-dom';
import InlineError from '../../Forms/InlineError';
import InlineMessage from '../../Forms/InlineMessage';


import {
  physical_address_init,
  physical_address_errors_init,
  contact_details_init,
  contact_details_errors_init,
  products_init,
  service_init,
  cart_init,
  coupon_init
} from "../market-constants";


import * as APIRequests from '../api-requests';
import {firebase} from '../../../firebase';
import { Utils } from '../../../utilities';

import * as settings from '../../../constants';

import { UserAccountContext } from "../../../context/UserAccount/userAccountContext";
import {Capitalize} from 'react-lodash';
import { client_id } from './checkout_constants';

const BasketItem = ({item}) => {
  
  const[product,setProduct] = useState(products_init);
  const[service,setService] = useState(service_init);

  useEffect(() => {
    const fetchAPI = async () => {   
        if (item.item_type === 'products'){
          await APIRequests.fetchProductAPI(item.id_service_product).then(results => {
              setProduct(results);
          });
        }else{
          await APIRequests.fetchServiceAPI(item.id_service_product).then(results => {
              setService(results);
          });
        }
        return true;
    };
    fetchAPI().then(result => {
      console.log(result);
    })
    return () => {
      setProduct(products_init);
      setService(service_init);
    };
  }, [])
    let description = '';
    product.description
      ? (description = product.description)
      : (description = service.description);
    return (
      <tr>
        <td title={description}>
          {
            (item.item_type === 'products') ?
              <Capitalize string={product.product_name} /> 
            : <Capitalize string={service.service_name} />
          }
        </td>
        <td><Capitalize string={item.item_type} /></td>
        <td>{item.quantity}</td>
        <td>R {item.price}.00</td>
        <td>R {item.sub_total}.00</td>
      </tr>
    );
}

const ShoppingBasket = () => {
    const[basket,setBasket] = useState([]);
    const[coupons,setCoupons] = useState(coupon_init);
    const[errors,setErrors] = useState({
      coupon_code_error : ''
    });
    const [cart, setCart] = useState(cart_init);
    const[inline,setInline] = useState({message:'',message_type:'info'});
    
    const[display,setDisplay] = useState('shopping-basket');
    const [paidFor,SetPaidFor] = useState(false);
    const [loaded,setLoaded] = useState(false);
    
    let paypalRef = useRef();

    const { user_account_state, doLogin } = useContext(UserAccountContext);
    
    
    const applyCouponCode = e => {
        /**
         * compile code information from state
         * send coupon to back end
         * backend server must find out if the code there matches 
         * the ones in the database, if it does then apply discounts 
         * appropriately
         */
        if (coupons.code){
            let coupon = {...coupons};
            try{
                coupon.uid = user_account_state.user_account.uid;
                coupon = JSON.stringify(coupon);
                APIRequests.applyCouponCode(coupon).then(results => {
                  console.log('coupon code results : ', results);
                  if (results.status){
                    // activate the discount only on the total amount
                    // the app will then send the total amount into
                    // the payment record and then save it back to server
                    
                  }else{
                    setInline({message:results.error.message,message_type:'error'});
                    console.log(results.error.message);
                  }
                });

              }catch(error){
                console.log(error);
                setInline({message:error.message,message_type:'error'});
              }              
            
        }else{
          setErrors({...errors, coupon_code_error : 'coupon code cannot be empty'});
          setInline({message:'error applying coupon code'});
        }
            

    };

    useEffect(() => {
      const apiFetch = async () => {
        let uid = user_account_state.user_account.uid;

        APIRequests.retrieveCart(uid).then(Response => {
          console.log("Cart Items :", Response.cart_items);
          setBasket(Response.cart_items);
          setCart(Response.cart);
        }); 

      };

      apiFetch().then(results => {

      });

      return () => {
        setBasket([]);
      };
    }, []);


    useEffect(() => {

      const createPurchaseUnits = async () => {
        let purchase_units = [];
        await basket.forEach(purchase_item => {
                console.log('Purchase Item',purchase_item);
                purchase_units.push({
                  id_service_product: purchase_item.id_service_product,
                  amount: {
                    currency_code: "USD",
                    value: purchase_item.price
                  }
                });
              });

        return purchase_units;
      };

      createPurchaseUnits().then(purchase_units => {

              console.log('Purchase Units', purchase_units);
              console.log('PAYPAL',window.paypal);
              window.paypal.Buttons({
                  createOrder: (data, actions) => {
                    return actions.order.create({ purchase_units : purchase_units });
                  },
                  onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    SetPaidFor(true);
                    console.log(order);
                  }
              }).render(paypalRef);

          }) // end create purchase units         
      
      return () => {
        
      };
    }, [loaded])

    return (
      <Fragment>
        <div className="box box-body">
          <div className="box box-header">
            <h3 className="box-title">
              <i className="fa fa-shopping-basket"> </i> Shopping Basket
            </h3>
          </div>

          <div className="box box-warning">
            <div className="row">
              <div className="box box-footer col-md-8">
                <div className="box box-header">
                  <h3 className="box-title">
                    <i className="fa fa-shopping-cart"> </i> Shopping Items
                  </h3>

                  <div className="box-tools">
                    <button
                      type="button"
                      className="btn btn-box-tool"
                      name="clear_items"
                      onClick={e =>
                        APIRequests.deleteCart(
                          firebase.auth.currentUser.uid
                        ).then(results => {
                          console.log(results);
                          if (results.status === true) {
                            setCart(cart_init);
                            setBasket([]);
                            setInline({
                              message: "cart items cleared",
                              message_type: "error"
                            });
                          }
                        })
                      }
                    >
                      <i className="fa fa-eraser"> </i> Clear Items
                    </button>
                  </div>
                </div>
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <td>
                        <strong>
                          <em>Item Name</em>
                        </strong>
                      </td>
                      <td>
                        <strong>
                          <em>Item Type</em>
                        </strong>
                      </td>
                      <td>
                        <strong>
                          <em>Quantity</em>
                        </strong>
                      </td>
                      <td>
                        <strong>
                          <em>Price</em>
                        </strong>
                      </td>
                      <td>
                        <strong>
                          <em>Sub Total</em>
                        </strong>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {basket.length > 0 ? (
                      basket.map((item, index) => {
                        return (<BasketItem item={item} key={index} />: "");
                      })
                    ) : (
                      <span className="box box-warning">
                        There are not items in your shopping list
                      </span>
                    )}
                  </tbody>
                </table>
                {inline.message ? (
                  <InlineMessage
                    message={inline.message}
                    message_type={inline.message_type}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="box box-footer col-md-4">
                <div className="box box-header">
                  <h3 className="box-title">
                    <i className="fa fa-shopping-bag"> </i> Check Out{" "}
                  </h3>
                </div>

                <ul className="list-group">
                  <li className="list-group-item">
                    Sub Totals : R {cart.sub_total}0
                  </li>
                  <li className="list-group-item"> Tax : R {cart.tax}.00</li>
                  <li className="list-group-item"> Total : R {cart.total}0</li>
                  <li className="list-group-item">
                    <input
                      type="text"
                      className="form-control"
                      name="code"
                      placeholder="Coupon Code..."
                      value={coupons.code}
                      onChange={e =>
                        setCoupons({
                          ...coupons,
                          [e.target.name]: e.target.value
                        })
                      }
                    />
                    {errors.coupon_code_error ? (
                      <InlineError message={errors.coupon_code_error} />
                    ) : (
                      ""
                    )}
                  </li>
                  <li className="list-group-item">
                    <button
                      type="button"
                      className="btn btn-danger margin"
                      name="applycode"
                      onClick={e => applyCouponCode(e)}
                    >
                      <i className="fa fa-money"> </i> Apply Code
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning"
                      name="reset"
                      onClick={e => {
                        setCoupons(coupon_init);
                        setErrors({ coupon_code_error: "" });
                        setInline({ message: "", message_type: "info" });
                      }}
                    >
                      <i className="fa fa-eraser"> </i> Reset Code
                    </button>
                  </li>
                  <li className="list-group-item">
                    <div ref={v => (paypalRef = v)} />
                    <button
                      type="button"
                      className="btn btn-success margin"
                      name="checkout"
                      title="Send Invoice and Pay Via EFT or Make a Deposit"
                      onClick={e => setDisplay(e)}
                    >
                      <i className="fa fa-shopping-bag"> </i> Checkout (EFT)
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
    const { user_account_state, doLogin } = useContext(UserAccountContext);

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
      physical_address.uid = user_account_state.user_account.uid;
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

        let seed = user_account_state.user_account.uid;        
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
    const { user_account_state, doLogin } = useContext(UserAccountContext);

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
      return false;
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
        return false;
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
        return false;
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
      contact_details.uid = user_account_state.user_account.uid;
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
    };

    useEffect(() => {

      const fetchContacts = async () => {
        let seed = user_account_state.user_account.uid;
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
  const { user_account_state, doLogin } = useContext(UserAccountContext);
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
    const { user_account_state, doLogin } = useContext(UserAccountContext);
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
              <i className="fa fa-shopping-cart"> </i> Check Out
            </h3>
            <div className="box-tools">
              <div className="dropdown">
                <button
                  type="button"
                  className="btn btn-box-tool dropdown-toggle"
                  onClick={e => showDropdownMenu(e)}
                >
                  Check Out{" "}
                </button>
                {displayMenu.menu ? (
                  <ul className="dropmenu">
                    <li
                      className="btn btn-block droplink"
                      name="physical_address"
                      onClick={e => setDisplay("physical_address")}
                    >
                      Physical Address
                    </li>
                    <li
                      className="btn btn-block droplink"
                      name="contact_details"
                      onClick={e => setDisplay("contact_details")}
                    >
                      <i className="fa fa-mobile-phone"> </i> Contact Details
                    </li>
                    <li
                      className="btn btn-block droplink"
                      name="shopping_basket"
                      onClick={e => setDisplay("shopping_basket")}
                    >
                      <i className="fa fa-shopping-basket"> </i> Shopping Basket
                    </li>
                  </ul>
                ) : null}
              </div>
            </div>
          </div>

          {display === "physical_address" ? <PhysicalAddress /> : ""}
          {display === "contact_details" ? <ContactDetails /> : ""}
          {display === "shopping_basket" ? <ShoppingBasket /> : ""}
        </div>
      </Fragment>
    );
}

export default CheckOut;
