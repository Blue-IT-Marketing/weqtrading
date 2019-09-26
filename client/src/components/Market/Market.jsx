import React, { Fragment, useState, useEffect,useContext } from "react";

import Products from "./Products/Products";
import Services from "./Service/Services";
import { Link } from "react-router-dom";
import axios from "axios";
import { routes } from "../../constants";
import * as apiRequests from './api-requests';
import {firebase} from '../../firebase';

import {UserAccountContext} from '../../context/UserAccount/userAccountContext';


export default function Market() {

  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [display,setDisplay] = useState('products');
  const [search,setSearch] = useState('');
  const [search_results,setSearchResults] = useState([]);
  const [inline,setInline] = useState({message:'',message_type:'inf'});
  const {user_account_state,doLogin } = useContext(UserAccountContext);

  const [displayMenu, setMenu] = useState({ menu: false });

  const showDropdownMenu = e => {
    e.preventDefault();
    setMenu({ menu: true });
    document.addEventListener("click", hideDropdownMenu);
  };

  const hideDropdownMenu = () => {
    setMenu({ menu: false });
    document.removeEventListener("click", hideDropdownMenu);
  };

  

  const onSearch = async e => {
    e.preventDefault();
    
    let search_text = search;

    await apiRequests.onSearch(search_text).then(results => {
      if (results.status){
        setSearchResults(results.payload);
      }else{
        setSearchResults([]);
      }
    }).catch(error => {
      setInline({message:'error performing search',message_type:'error'});
    });

    return true;
  };


  useEffect(() => {
    apiRequests.fetchProductsAPI().then(result => {
      setProducts(result);
    });

    apiRequests.fetchServicesAPI().then(result => {
      setServices(result);
    });


    return () => {
      setProducts([]);
      setServices([]);
    };
  }, []);

  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">
            <strong>
              {" "}
              <i className="fa fa-shopping-basket"> </i> Market Place{" "}
            </strong>{" "}
          </h3>

          <div className="box-tools">
              <div className="dropdown">
              <button
                type="button"
                className="btn btn-box-tool dropdown-toggle"
                onClick={e => showDropdownMenu(e)}
              >
                <i className="fa fa-bars"> </i>
              </button>
              {displayMenu.menu ? (
                <ul className="dropmenu">
                  <li
                    type="button"
                    className="btn btn-box-tool droplink"
                    name="products"
                    onClick={e => setDisplay("products")}
                  >
                    <i className="fa fa-product-hunt"> </i> Products
                  </li>
                  <li
                    type="button"
                    className="btn btn-box-tool droplink"
                    name="services"
                    onClick={e => setDisplay("services")}
                  >
                    <i className="fa fa-server"> </i> Services
                  </li>
                  {user_account_state.user_account.uid ? (
                    <li
                      type="button"
                      className="btn btn-box-tool droplink"                    
                    >

                      <Link to={routes.check_out_page}>
                        {" "}
                          <i className="fa fa-shopping-cart"> </i> Check Out
                      </Link>
                    </li>
                  ) : (
                    <li
                      type="button"
                      className="btn btn-box-tool droplink"                    
                    >
                    <Link to={routes.login_page}>
                        <i className="fa fa-sign-in"> </i> Login                      
                    </Link>
                    </li>
                  )}
                </ul>
              ):null}
            </div>


          </div>
          
        </div>

        <div className="box box-footer">

          {display === "products" ? <Products products={products} /> : ""}

          {display === "services" ? <Services services={services} /> : ""}
        </div>
      </div>
    </Fragment>
  );
}
