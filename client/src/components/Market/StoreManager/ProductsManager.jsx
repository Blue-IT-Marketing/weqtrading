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
} from "../market-constants";
import InlineError from "../../Forms/InlineError";
import InlineMessage from "../../Forms/InlineMessage";

import * as apiRequests from "../api-requests";
import { Utils } from "../../../utilities";
import { api_products_endpoint } from "../../../constants/routes";
import { extended_user } from "../../Auth/auth-constants";






const ManageProduct = ({ product }) => {
  const [form_product, setProduct] = useState(products_init);
  const [categories, setCategories] = useState([]);
  const [inline, setInline] = useState({ message: "", message_type: "inf" });

  const onUpdate = async e => {
    let product = { ...form_product };
    product = JSON.stringify(product);
    await apiRequests
      .updateProduct(product)
      .then(results => {
        if (results.status) {
          setProduct(results.payload);
          setInline({
            message: "product successfully updated",
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

  const onDeleteProduct = async e => {
    let product = { ...form_product };

    await apiRequests
      .onDeleteProduct(product)
      .then(result => {
        if (result.status) {
          setProduct(result.payload);
          setInline({
            message: "product successfully deleted",
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
    let category_type = "products";
    apiRequests
      .fetchCategories(category_type)
      .then(results => {
        setCategories(results);
      })
      .catch(error => {
        console.log(error);
      });
    setProduct(product);
    return () => {
      setProduct(products_init);
      setCategories([]);
    };
  }, []);
  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">Product Manager</h3>
          <div className="box-tools">
            <button
              type="button"
              className="btn btn-box-tool btn-outline-danger"
              name="delete-product"
              onClick={e => onDeleteProduct(e)}
            >
              <i className="fa fa-eraser"> </i>
              Delete
            </button>
          </div>
        </div>

        <div className="box-footer">
          <form className="form-horizontal">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                className="form-control"
                name="product_name"
                value={form_product.product_name}
                onChange={e =>
                  setProduct({
                    ...form_product,
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
                value={form_product.description}
                onChange={e =>
                  setProduct({
                    ...form_product,
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
                value={form_product.price}
                onChange={e =>
                  setProduct({
                    ...form_product,
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
                value={form_product.category_id}
                onChange={e =>
                  setProduct({
                    ...form_product,
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
                name="update-product"
                onClick={e => onUpdate(e)}
              >
                <i className="fa fa-cloud-upload"> </i> Update Product
              </button>
              <button
                type="button"
                className="btn btn-warning btn-lg margin"
                name="update-product"
                onClick={e => {
                  setProduct(product);
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

// id = ndb.StringProperty() # id of this request
// product_id = ndb.StringProperty() # the same as the product id in the product table
// client_uid = ndb.StringProperty() # user id of the client who requested the product
// total_requested = ndb.StringProperty(default='1')
// date_requested = ndb.StringProperty()
// products_sent = ndb.BooleanProperty(default=False)
// date_sent = ndb.StringProperty()


{/* <td>Client</td>
<td>Requests</td>
<td>Date Requested</td>
<td>Sent</td>
<td>Sent Date</td> */}

const RequestItem = ({request}) => {
    const [client,setClient] = useState(extended_user);
    const [inline,setInline] = useState({message:'',message_type:'inf'});

    const fetchUserByID = async uid => {
        await apiRequests.fetchUserByID(uid).then(results => {
            if(results.status){
                setClient(results.payload);
            }else{
                setInline({message:'there was an error fetching client details',message_type:'error'});
                setClient(extended_user);
            }
        }).catch(error => {
            setInline({message:error.message,message_type:'error'});
            setClient(extended_user);
        });
        return true;
    };

    return(
        <tr>
            <td>{
                fetchUserByID(request.client_uid).then(result => {
                    if (result){
                        return <span title={client.cell}> {client.name} - {client.surname} </span>;
                    }
                })
            }</td>
            <td>{request.total_requested}</td>
            <td>{request.date_requested}</td>
            <td>{request.products_sent ? 'Yes': 'No'}</td>
            <td>{request.date_sent}</td>
        </tr>
    )
}

const ProductRequests = ({product}) => {
    const [requests,setRequests] = useState([])
    const [inline,setInline] = useState({message:'',message_type:'inf'});
    const {user_account_state} = useContext(UserAccountContext);

    useEffect(() => {
        const fetchRequestsAPI = async () => {
            let uid = user_account_state.user_account.uid;
            let id = product.id;
            apiRequests.fetchProductRequests(uid,id).then(results => {
                if(results.status){
                    setRequests(results.payload);                    
                }else{
                    setRequests([]);
                }
            }).catch(error => {
                console.log(error.message);
            });
            return true;
        };
        
        fetchRequestsAPI().then(result => {
          console.log(result);
        });

        return () => {
            setInline({message:'',message_type:'inf'});
            setRequests([]);
        };
    }, []);

    return (
      <Fragment>
        <div className="box box-body">
          <div className="box box-header">
            <h3 className="box-title"> Product Requests</h3>
          </div>
          <div className="box box-footer">
            <div className='row'>
                
                    <ul className='list-group'>
                        <li className='list-group-item'> Product Name : {product.product_name}</li>
                        <li className='list-group-item'> Product Price : R {product.price}.00</li>
                        <li className='list-group-item'> Description : {product.description}</li>                
                    </ul> 
                    <hr></hr> 
            </div>
            <div className='row'>
                  <table className='table table-responsive'>
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
}


const ShowProduct = ({ product }) => {
  const [display, setDisplay] = useState("details");

  return (
    <Fragment>
      <div className="box box-primary">
        <div className="box box-header">
          <h3 className="box-title">{product.product_name}</h3>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <ul className="list-group">
              <li className="list-group-item">
                Product Name : <a href="#"> {product.product_name} </a>
              </li>
              <li className="list-group-item">
                Product Price : <a href="#"> {product.price} </a>
              </li>
              <li className="list-group-item">
                Active : <a href="#">{product.active ? "True" : "False"}</a>
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
                  name="product-requests"
                  onClick={e => setDisplay("product-requests")}
                >
                  <i className="fa fa-inbox"> </i> Product Requests
                </button>
              </li>

              <li className="list-group-item">
                <button
                  type="button"
                  className="btn btn-sm btn-block btn-flickr"
                  name="manage-products"
                  onClick={e => setDisplay("manage-products")}
                >
                  <i className="fa fa-dashboard"> </i> Manage Product
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
                    value={product.description}
                    className="form-control"
                  />
                </div>
                <div className="polaroid">
                  <img src={product.product_art} className="pola-image" />
                </div>
              </Fragment>
            ) : null}
            {display === "manage-products" ? (
              <ManageProduct product={product} />
            ) : null}
            {display === 'product-requests' ? <ProductRequests product={product} />  : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const ProductItem = ({ product, onOpenProduct }) => {
  return (
    <Fragment>
      <tr>
        <td
          className="btn btn-block btn-outline-primary margin"
          onClick={e => {
            let id = product.id;
            onOpenProduct(id);
          }}
        >
          {product.product_name}
        </td>
        <td>{product.description}</td>
        <td>{product.price}</td>
      </tr>
    </Fragment>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(products_init);

  const [inline, setInline] = useState({ message: "", message_type: "inf" });
  const { user_account_state } = useContext(UserAccountContext);

  const onOpenProduct = id => {
    setProduct(products.find(product => product.id === id));
  };

  useEffect(() => {
    const fetchProductsAPI = async () => {
      let uid = user_account_state.user_account.uid;
      await apiRequests.fetchUserProductsAPI(uid).then(results => {
          console.log(results);
          setProducts(results);
        }).catch(error => {
          setProducts([]);
        });
      return true;
    };

    fetchProductsAPI().then(result => {
      console.log(result);
    });

    return () => {
      setProducts([]);
      setProduct(products_init);
    };
  }, []);

  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">Products</h3>
        </div>
        {product.id ? (
          <ShowProduct product={product} />
        ) : (
          <table className="table table-responsive">
            <thead>
              <tr>
                <td>Product Name</td>
                <td>Description</td>
                <td>Price</td>
              </tr>
            </thead>
            <tbody>
              {products.map(product => {
                return (
                  <ProductItem
                    onOpenProduct={onOpenProduct}
                    product={product}
                    key={product.id}
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




export default Products;