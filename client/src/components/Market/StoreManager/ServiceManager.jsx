
import React, { Fragment, useState, useEffect, useContext } from "react";
import { UserAccountContext } from "../../../context/UserAccount/userAccountContext";
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
import InlineError from "../../Forms/InlineError";
import InlineMessage from "../../Forms/InlineMessage";

import * as apiRequests from "../api-requests";
import { Utils } from "../../../utilities";
import { api_products_endpoint } from "../../../constants/routes";

import { extended_user } from "../../Auth/auth-constants";


const ManageService = ({ service }) => {
  const [form_service, setService] = useState(service_init);
  const [categories, setCategories] = useState([]);
  const [inline, setInline] = useState({ message: "", message_type: "inf" });

  const onUpdate = async e => {
    let service = { ...form_service };
    service = JSON.stringify(service);
    await apiRequests
      .updateService(service)
      .then(results => {
        if (results.status) {
          setService(results.payload);
          setInline({
            message: "service successfully updated",
            message_type: "inf"
          });
        } else {
          setInline({ message: results.error.message, message_type: "error" });
        }
      })
      .catch(error => {
        setInline({ message: error.message, message_type: "error" });
      });
    return true;
  };

  const onDeleteService = async e => {
    let service = { ...form_service };

    await apiRequests
      .onDeleteService(service)
      .then(result => {
        if (result.status) {
          setService(result.payload);
          setInline({
            message: "service successfully deleted",
            message_type: "inf"
          });
        } else {
          setInline({ message: result.error.message, message_type: "error" });
        }
      })
      .catch(error => {
        setInline({ message: error.message, message_type: "error" });
      });
    return true;
  };

  useEffect(() => {
    let category_type = "services";
    apiRequests
      .fetchCategories(category_type)
      .then(results => {
        setCategories(results);
      })
      .catch(error => {
        console.log(error);
      });
    setService(service);
    return () => {
      setService(service_init);
      setCategories([]);
    };
  }, []);
  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">Service Manager</h3>
          <div className="box-tools">
            <button
              type="button"
              className="btn btn-box-tool btn-outline-danger"
              name="delete-product"
              onClick={e => onDeleteService(e)}
            >
              <i className="fa fa-eraser"> </i>
              Delete
            </button>
          </div>
        </div>

        <div className="box-footer">
          <form className="form-horizontal">
            <div className="form-group">
              <label>Service Name</label>
              <input
                type="text"
                className="form-control"
                name="service_name"
                value={form_service.service_name}
                onChange={e =>
                  setService({
                    ...form_service,
                    [e.target.name]: e.target.value
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                value={form_service.description}
                onChange={e =>
                  setService({
                    ...form_service,
                    [e.target.name]: e.target.value
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                className="form-control"
                name="price"
                value={form_service.price}
                onChange={e =>
                  setService({
                    ...form_service,
                    [e.target.name]: e.target.value
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                name="category_id"
                value={form_service.category_id}
                onChange={e =>
                  setService({
                    ...form_service,
                    [e.target.name]: e.target.value
                  })
                }
              >
                {categories.map(category => {
                  return (
                    <option value={category.category_id}>
                      {category.sub_category}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group">
              <button
                type="button"
                className="btn btn-primary btn-lg margin"
                name="update-service"
                onClick={e => onUpdate(e)}
              >
                <i className="fa fa-cloud-upload"> </i> Update Service
              </button>
              <button
                type="button"
                className="btn btn-warning btn-lg margin"
                name="reset_service"
                onClick={e => {
                  setService(service);
                  setInline({ message: "", message_type: "info" });
                }}
              >
                <i className="fa fa-cloud-upload"> </i> Undo Changes
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
      </div>
    </Fragment>
  );
};


const RequestItem = ({ request }) => {
  const [client, setClient] = useState(extended_user);
  const [inline, setInline] = useState({ message: "", message_type: "inf" });

  const fetchUserByID = async uid => {
    console.log('Fetching User',uid);
    await apiRequests
      .fetchUserByID(uid)
      .then(results => {
        if (results.status) {
          setClient(results.payload);
        } else {
          setInline({
            message: "there was an error fetching client details",
            message_type: "error"
          });
          setClient(extended_user);
        }
      })
      .catch(error => {
        setInline({ message: error.message, message_type: "error" });
        setClient(extended_user);
      });
    return true;
  };

  return (
    <tr>
      <td>
        {fetchUserByID(request.client_uid).then(result => {
          if (result) {
            return (
              <span title={client.cell}>
                {" "}
                {client.name} - {client.surname}{" "}
              </span>
            );
          }
        })}
      </td>
      <td>{request.total_requested}</td>
      <td>{request.date_requested}</td>
      <td>{request.products_sent ? "Yes" : "No"}</td>
      <td>{request.date_sent}</td>
    </tr>
  );
};

const ServiceRequests =({service}) => {
     const [requests, setRequests] = useState([]);
     const [inline, setInline] = useState({ message: "", message_type: "inf" });
     const { user_account_state } = useContext(UserAccountContext);

     useEffect(() => {
       const fetchRequestsAPI = async () => {
         let uid = user_account_state.user_account.uid;
         let id = service.id;

         apiRequests
           .fetchProductRequests(uid, id)
           .then(results => {
             if (results.status) {
               setRequests(results.payload);
             } else {
               setRequests([]);
             }
           })
           .catch(error => {
             console.log(error.message);
           });

         return true;
       };

       fetchRequestsAPI().then(result => {
         console.log(result);
       });

       return () => {
         setInline({ message: "", message_type: "inf" });
         setRequests([]);
       };
     }, []);


    return (
      <Fragment>
        <div className="box box-body">
          <div className="box box-header">
            <h3 className="box-title"> Service Requests</h3>
          </div>
          <div className="box box-footer">
            <div className="row">
              
                <ul className="list-group">
                  <li className="list-group-item">
                    {" "}
                    Service Name : {service.service_name}
                  </li>
                  <li className="list-group-item">{" "} Service Price : R {service.price}.00</li>
                  <li className="list-group-item">
                    {" "}
                    Description : {service.description}
                  </li>
                </ul>
            </div>

            <div className="row">
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <td>Client</td>
                      <td>Requests</td>
                      <td>Date Requested</td>
                      <td>Sent</td>
                      <td>Sent Date</td>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map(request => {
                      return <RequestItem request={request} key={request.id} />;
                    })}
                  </tbody>
                </table>
            </div>


            </div>
          </div>
        
      </Fragment>
    );
};

const ShowService = ({ service }) => {
  const [display, setDisplay] = useState("details");

  return (
    <Fragment>
      <div className="box box-primary">
        <div className="box box-header">
          <h3 className="box-title">{service.service_name}</h3>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <ul className="list-group">
              <li className="list-group-item">
                Service Name : <a href="#"> {service.service_name} </a>
              </li>
              <li className="list-group-item">
                Service Price : <a href="#"> {service.price} </a>
              </li>
              <li className="list-group-item">
                Active : <a href="#">{service.active ? "True" : "False"}</a>
              </li>
              <li className="list-group-item">
                <button
                  type="button"
                  className="btn btn-sm btn-block btn-flickr"
                  name="details"
                  onClick={e => setDisplay("details")}
                >
                  <i className="fa fa-line-chart"> </i> Details
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-block btn-flickr"
                  name="show-sales"
                  onClick={e => setDisplay("show-sales")}
                >
                  <i className="fa fa-line-chart"> </i> Show Sales
                </button>
              </li>
              <li className="list-group-item">
                <button
                  type="button"
                  className="btn btn-sm btn-block btn-flickr"
                  name="service-requests"
                  onClick={e => setDisplay("service-requests")}
                >
                  <i className="fa fa-inbox"> </i> Service Requests
                </button>
              </li>

              <li className="list-group-item">
                <button
                  type="button"
                  className="btn btn-sm btn-block btn-flickr"
                  name="manage-services"
                  onClick={e => setDisplay("manage-services")}
                >
                  <i className="fa fa-dashboard"> </i> Manage service
                </button>
              </li>
            </ul>
          </div>
          <div className="col-sm-8">
            {display === "details" ? (
              <Fragment>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={service.description}
                    className="form-control"
                  />
                </div>
                <div className="polaroid">
                  <img src={service.service_art} className="pola-image" />
                </div>
              </Fragment>
            ) : null}
            {display === "manage-services" ? (
              <ManageService service={service} />
            ) : null}
            {display === 'service-requests' ? 
              <ServiceRequests service={service}/> : ''}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const ServiceItem = ({ service, onOpenService }) => {
  return (
    <tr>
      <td
        className="btn btn-block btn-outline-primary margin"
        onClick={e => {
          let id = service.id;
          onOpenService(id);
        }}
      >
        {service.service_name}
      </td>
      <td>{service.description}</td>
      <td>{service.price}</td>
    </tr>
  );
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [service, setService] = useState(service_init);

  const [inline, setInline] = useState({ message: "", message_type: "inf" });
  const { user_account_state } = useContext(UserAccountContext);

  const onOpenService = id => {
    setService(services.find(service => service.id === id));
  };

  useEffect(() => {
    const fetchServicesAPI = async () => {
      let uid = user_account_state.user_account.uid;
      await apiRequests
        .fetchUserServicesAPI(uid)
        .then(results => {
          console.log(results);
          setServices(results);
        })
        .catch(error => {
          setServices([]);
        });
      return true;
    };

    fetchServicesAPI().then(result => {
      console.log(result);
    });

    return () => {
      setServices([]);
      setService(service_init);
    };
  }, []);
  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">Services</h3>
        </div>
        {service.id ? (
          <ShowService service={service} />
        ) : (
          <table className="table table-responsive">
            <thead>
              <tr>
                <td>Service Name</td>
                <td>Description</td>
                <td>Price</td>
              </tr>
            </thead>
            <tbody>
              {services.map(service => {
                return (
                  <ServiceItem
                    onOpenService={onOpenService}
                    service={service}
                    key={service.id}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </Fragment>
  );
};


export default Services;