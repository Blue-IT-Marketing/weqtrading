import React, { useState, Fragment,useContext,useEffect } from "react";
import {Link} from 'react-router-dom';

import { service_init, category_init } from "../market-constants";
import { routes, settings } from "../../../constants";
import * as apiRequests from "../api-requests";
import { UserAccountContext } from "../../../context/UserAccount/userAccountContext";

import InlineMessage from "../../Forms/InlineMessage";


const Service = ({ service, addServiceToBasket }) => {
  const [inline, setInline] = useState({ message: "", message_type: "info" });
  const { user_account_state, doLogin } = useContext(UserAccountContext);

  const addToBasket = async service => {
    console.log("Adding this service to basket", service);
    if (user_account_state.user_account.uid) {
      try {
        await addServiceToBasket(service)
          .then(Response => {
            if (Response.status) {
              setInline({
                message: ` successfully add ${service.service_name} to basket`
              });
            } else {
              setInline({
                message: Response.error.message,
                message_type: "error"
              });
            }
          })
          .catch(error => {
            setInline({ message: error.message, message_type: "error" });
          });
      } catch (error) {
        setInline({ message: error.message, message_type: "error" });
      }
    } else {
      setInline({
        message:
          "you are presently not logged in please login in order to start buying and selling services in this portal",
        message_type: "error"
      });
    }
  };

  return (
    <div className="box box-info">
      <div className="polaroid">
        <div className="box box-footer">
          <div className="box box-header">
            <h3 className="box-title" title={service.description}>
              {service.service_name}
            </h3>
            <div className="box-tools">
              <button
                type="button"
                className="btn btn-box-tool btn-outline-light"
                onClick={e => addToBasket(service)}
                title={`Add ${service.service_name} to Basket`}
              >
                R {service.price}.00 Add to Basket
              </button>
            </div>
          </div>
          <img
            className="pola-image"
            src={service.service_art}
            alt={service.service_name}
            title={`
              Title : ${service.service_name}  
              Description : 
              ${service.description}
              
              ----------------------------------
              
              Price : R ${service.price}.00
            `}
          />
          <div className="polatext">
            <span>{service.description}</span>
            <div className="box-tools">
              <div className="box-tools">
                <button
                  type="button"
                  className="btn btn-warning btn-outline-light"
                  onClick={e => addToBasket(service)}
                  title={`Add ${service.service_name} to Basket `}
                >
                  R {service.price}.00 Add to Basket
                </button>
                {inline.message ? (
                  <InlineMessage
                    message={inline.message}
                    message_type={inline.message_type}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default function Services() {

    const[services,setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sub_categories, setSubCategories] = useState([]);
    const [show_services, setShowServices] = useState([]);

    const [shoppingBasket, setShoppingBasket] = useState([]);
    const { user_account_state, doLogin } = useContext(UserAccountContext);
  
    const addServiceToBasket = async service => {
      let results = { status: true, payload: {}, error: {} };
      let cart_item = {
        uid: user_account_state.user_account.uid,
        item: service
      };

      await apiRequests.addToCart(JSON.stringify(cart_item)).then(Response => {
        results = { ...Response };
        if (Response.status) {
          setShoppingBasket(Response.payload);
        } else {
          console.log(Response.error.message);
        }
      });
      return results;
    };

    const createSubCategories = response => {
      let subCategoryList = [];

      response.forEach(category => {
        if (!subCategoryList.includes(category.sub_category)) {
          subCategoryList.push(category.sub_category);
        }
      });
      console.log("Sub Category List : ", subCategoryList);
      return subCategoryList;
    };

    const onCategoryClick = category => {
      let expanded_category = categories.find(
        expanded_category => expanded_category.sub_category === category
      );

      let filtered_services = services.filter(service => {
        return service.category_id === expanded_category.category_id;
      });
      console.log("Filtered Service ", filtered_services);
      setShowServices(filtered_services);
    };

    useEffect(() => {
      const fetchAPI = async () => {
        let category_type = "services";

        let response = [];

        await apiRequests
          .fetchCategories(category_type)
          .then(categories => {
            response = categories;
            setCategories(categories);
          })
          .catch(error => {
            console.log(error);
          });

        let subs = await createSubCategories(response);

        setSubCategories(subs);
        return true;
      };

      fetchAPI().then(result => {
        console.log(result);
      });

      return () => {
        setCategories([]);
      };
    }, []);

    useEffect(() => {
      apiRequests.fetchServicesAPI().then(result => {
        setServices(result);
        setShowServices(result);
      });
      return () => {
        setServices([]);
        setShowServices([]);
      };
    }, []);

  
  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">
            <i className="fa fa-server"> </i> Services
          </h3>

          <div className="box-tools">
            {sub_categories.map(sub => {
              return (
                <button
                  type="button"
                  className="btn btn-box-tool"
                  name={sub}
                  onClick={e => onCategoryClick(e.target.name)}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>

        {show_services.map(service => {
          if (
            service.service_name &&
            service.service_art &&            
            service.price
          ) {
            return (
              <Service
                service={service}
                key={service.id}
                addServiceToBasket={addServiceToBasket}
              />
            );
          }
        })}
      </div>
    </Fragment>
  );
}
