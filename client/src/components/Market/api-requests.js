import axios from 'axios';
import {routes} from '../../constants';


export const fetchProductsAPI = async () => {
  let results = [];
  await axios
    .get(routes.api_products_endpoint)
    .then(result => {
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("there was an error fetching products");
      }
    })
    .then(products => {
      console.log('Fetch Products API', products);
      results = [...products];
    })
    .catch(error => {
      console.log(error.message);
    });

  return results;
};


export const fetchProductAPI = async product_id => {
  let results = [];
  await axios
    .get(routes.api_products_endpoint + `/${product_id}`)
    .then(result => {
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("there was an error fetching products");
      }
    })
    .then(products => {
      console.log("Fetch Products API", products);
      results = {...products};
    })
    .catch(error => {
      console.log(error.message);
    });

  return results;
};


export const fetchUserProductsAPI = async uid => {
  let results = [];
  await axios.get(routes.api_products_endpoint + `/user/${uid}`).then(result => {
    if(result.status === 200){
      return result.data;
    }else{
      throw new Error('there was an error fetching user products');
    }
  }).then(products => {
    results = [...products];
  }).catch(error => {
    console.log(error.message);
  });

  return results;
};


export const fetchUserServicesAPI = async uid => {
  let results = [];
  await axios.get(routes.api_services_endpoint + `/user/${uid}`).then(result => {
    if(result.status){
      return result.data;
    }else{
      throw new Error('there was an error fetching user services');
    }
  }).then(services => {
    results = [...services];
  }).catch(error => {
    console.log(error.message);
  });
  return results;
}


export const fetchServicesAPI = async () => {
  let results = [];
  await axios
    .get(routes.api_services_endpoint)
    .then(result => {
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("there was an error fetching services");
      }
    })
    .then(services => {
      results = [...services];
    })
    .catch(error => {
      console.log(error);
    });

  return results;
};

export const fetchServiceAPI = async service_id => {
  let results = [];
  await axios
    .get(routes.api_services_endpoint + `/${service_id}`)
    .then(result => {
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("there was an error fetching products");
      }
    })
    .then(products => {
      console.log("Fetch Products API", products);
      results = { ...products };
    })
    .catch(error => {
      console.log(error.message);
    });

  return results;

};


export const fetchCategories = async (category_type) => {
    let results = [];

    await axios.get(routes.api_categories_endpoint).then(result => {
        if (result.status === 200){
            return result.data;
        }else{
            throw new Error('there was an error fetching product categories');
        }
    }).then(categories => {
        categories.forEach(category => {
          if(category.category_type === category_type){
            results.push(category)
          }
        })
    }).catch(error => {
        console.log('Categories Error : ',error.message);
    })
    
    return results;
};

export const saveCategory = async (category) => {
    let results = [];

    await axios.post(routes.api_categories_endpoint,category).then(result => {
        if (result.status === 200){
            return result.data;
        }else{
            throw new Error('there was an error saving new category');
        }
    }).then(category => {
        results = category;
    }).catch(error => {
        console.log('Save Caregoty',error.message);
    });

    return results;
};


export const saveProduct = async(product) => {
  let results = {status : true,payload:{},error:{}};
   

  await axios.post(routes.api_products_endpoint,product).then(result => {
      if(result.status === 200){
        return result.data;
      }else{
        throw new Error('there was an error saving new product');
      }
  }).then(product => {
    results.status = true;
    results.payload = product;

  }).catch(error => {
    console.log('Save product error',error.message);
    results.status = false;
    results.error = error;
  });

  return results;
};

export const onDeleteProduct = async(product) => {
    let results = { status: true, payload: {}, error: {} };

    await axios.delete(routes.api_products_endpoint + `/${product.uid}/${product.id}`).then(result => {
        if (result.status === 200){
          return result.data;
        }
    }).then(product => {
      results.status = true;
      results.payload = {...product};
    
    }).catch(error => {
      results.status = false;
      results.error = {...error};      
    });
    return results;
};


export const doAddService = async(service) => {
  let results = { status: true, payload: {}, error: {} };

  await axios.post(routes.api_services_endpoint,service).then(result => {
    if(result.status === 200){
      return result.data;
    }else{
      throw new Error('there was an error saving new service');
    }
  }).then(service => {
    results.status = true;
    results.payload = service;
  }).catch(error => {
    results.status = false;
    results.error = error;
  });

  return results;
};


export const updateService = async(service) => {
  let results = { status: true, payload: {}, error: {} };

  await axios.put(routes.api_services_endpoint,service).then(result => {
    if(result.status === 200){
      return result.data;
    }else{
      throw new Error('there was an error updating service');
    }
  }).then(service => {
    results.status = true;
    results.payload = {...service};
    results.error = {}

  }).catch(error => {
    results.status = false;
    results.payload = {};
    results.error = {...error};
  });
  return results;
};


export const updateProduct = async(product) => {
  let results = {status : true, payload: {}, error : {}};

  await axios.put(routes.api_products_endpoint,product).then(result => {
    if(result.status === 200){
      return result.data;
    }else{
      throw new Error('there was an error updating product');
    }
  }).then(product => {
    results.status = true;
    results.payload ={...product};
    results.error = {};

  }).catch(error => {
    results.status = false;
    results.payload = {};
    results.error = {...error}
  });
  return results;
};


export const fetchProductRequests = async(uid,id) => {
  let results = { status: true, payload: {}, error: {} };

  await axios.get(routes.api_products_endpoint + `/requests/${uid}/${id}`).then(result => {
    if (result.status === 200){
      return result.data;
    }else{
      throw new Error('error fetching product requests');
    }
  }).then(requests => {
    results.status = true;
    results.payload = {...requests};
    results.error = {};
  }).catch(error => {
    results.status = false;
    results.payload = {};
    results.error = {...error};
  });
  return results;
};


export const onDeleteService = async(service) => {
  let results = { status: true, payload: {}, error: {} };

  await axios.delete(routes.api_services_endpoint,service).then(result => {
    if(result.status === 200){
      return result.data;
    }else{
      throw new Error('there was an error deleting service');
    }
  }).then(service => {
    results.status = true;
    results.payload = {...service};
    results.error ={}
  }).catch(error => {
    results.status = false;
    results.payload = {};
    results.error = {...error};
  });
  return results;
};

export const savePhysicalAddress = async(physical_address) => {
  let results = { status: true, payload: {}, error: {} };

  await axios.post(routes.api_physical_endpoint,physical_address).then(result => {
    if(result.status === 200){
      return result.data;
    }else{
      throw new Error('there was an error saving new physical address');
    }
  }).then(physical => {
    results.status = true;
    results.payload = physical;
  }).catch(error => {
    results.status = false;
    results.error = error;
  });

  return results;
};

export const fetchPhysicalAddress =async (seed,stateKey) => {
    let response = {};
    let request_data = {
      uid: seed
    };

    await axios.get(routes.api_physical_endpoint + `/${seed}`).then(results => {
      if (results.status === 200){
        return results.data;
      }else{
        throw new Error('there was an error loading physical address');
      }
    }).then(physical => {
      response = {...physical};
    }).catch(error => {
      console.log(error.message);
    });

    return response;
};


export const saveContactDetails = async(contact_details) => {
  let results = { status: true, payload: {}, error: {} };

  await axios.post(routes.api_contact_endpoint, contact_details).then(result => {
    if(result.status === 200){
      return result.data;
    }else{
      throw new Error('there was an error saving contact details')
    }
  }).then(contact => {
    results.status = true;
    results.payload = contact;
  }).catch(error => {
    results.status = false;
    results.error = error;
  });
  return results;
};


export const fetchContactDetails = async (seed,stateKey) => {
    let response = {};
    await axios.get(routes.api_contact_endpoint + `/${seed}`).then(result => {
      if(result.status === 200){
        return result.data;
      }else{
        throw new Error('there was an error loading contact details');
      }
    }).then(contact => {
      response = {...contact};

    }).catch(error => {
      console.log(error.message);
    });

    return response;
};



export const addToCart = async cart_item => {
    let results = { status: true, payload: {}, error: {} };

    await axios.post(routes.api_cart_endpoint, cart_item)
      .then(result => {
        if (result.status === 200) {
          return result.data;
        } else {
          throw new Error("there was an error adding cart item");
        }
      })
      .then(cart_items => {
        results.status = true;
        results.payload = [...cart_items];
      })
      .catch(error => {
        results.status = false;
        results.error = { ...error };
      });
    console.log("Add to cart results : ", results);
    return results;
};



export const retrieveCart = async uid => {
  let results = {status : true, cart_items : [], cart : {}, error: {} };

  await axios.get(routes.api_cart_endpoint + `/${uid}`).then(result => {
      if(result.status === 200){
        return result.data;
      }else{
        throw new Error('there was an error fetching cart');
      }
  }).then(Response => {
      results.status = true;
      results.cart = Response.cart;
      results.cart_items = Response.cart_items;
  }).catch(error => {
      results.status = false;
      results.error = {...error};
  });

  return results;
};


export const deleteCart = async uid => {
  let results = { status: true, cart_items: [], cart: {}, error: {} };
  await axios.delete(routes.api_cart_endpoint + `/${uid}`).then(response => {
      if (response.status === 200){
        return response.data
      }else{
        throw new Error('there was an error removing cart');
      }
  }).then(cart => {
    results.status = true;
    results.cart_items = [];
    results.cart = {};
  }).catch(error => {
    results.status = false;
    results.error = {...error};
  });

  return results;
};


export const applyCouponCode = async coupon => {
  let results = { status: true, coupon_code: {}, error: {} };

  await axios.put(routes.api_coupons_endpoint,coupon).then(response => {
    if (response.status === 200){
      return response.data;
    }else{
      throw new Error('error on server or coupon code not found',response.data);
    }
  }).then(response => {
    if (response.succeed){
      results.status = response.succeed;
      results.coupon_code = { ...response.coupon };    
    }else{
      results.status = response.succeed;
      results.error.message = response.message;    
    }
  }).catch(error => {
    console.log('coupon code error ',error.message);
    results.status = false;
    results.error = {...error};
  });

  return results;

};


export const fetchStore = async uid => {
  let results = { status: true, payload: {}, error: {} };

  await axios.get(routes.api_store_endpoint + `/${uid}`).then(response => {
      if(response.status === 200){
        return response.data;
      }else{
        throw new Error('error fetching store');
      }
  }).then(store => {
    results.status = true;
    results.payload = {...store};
    results.error = {};
  }).catch(error => {
    results.status = false;
    results.error = {...error};
    results.payload = {};
  });

  return results;
};


export const addStore = async (client_store) => {
  let results = { status: true, payload: {}, error: {} };
  await axios.post(routes.api_store_endpoint,client_store).then(response => {
      if(response.status === 200){
          return response.data;
      }else{
        throw new Error('there was an error adding store');
      }
  }).then(store => {
    results.status = true;
    results.payload = {...store};
    results.error = {};
  }).catch(error => {
    results.status = false;
    results.error = {...error};
    results.payload = {};
  });
  return results;
}



export const fetchTransactions = async(uid) => {
  let results = { status: true, payload: [], error: {} };

  await axios.get(routes.api_transactions_endpoint+`/${uid}`).then(response => {
    if(response.status === 200){
      return response.data;
    }else{
      throw new Error('there was an error fetching transactions');
    }
  }).then(transactions => {
    results.status = true;
    results.payload = [...transactions];
    results.error = {};
  }).catch(error => {
    results.status = false;
    results.error = {...error};
    results.payload = {};
  });
  return results;
};

export const createTransaction = async client_transaction => {
  let results = { status: true, payload: {}, error: {} };
  await axios.post(routes.api_transactions_endpoint,client_transaction).then(result => {
    if(result.status === 200){
      return result.data;
    }else{
      throw new Error('there was an error creating transaction');
    }
  }).then(transaction => {
      results.status = true;
      results.payload = {...transaction};
      results.error = {};
  }).catch(error => {
    results.status = false;
    results.payload = {};
    results.error = {...error};
  });
  return results;
};


export const removeTransaction = async (id,uid) => {
  let results = { status: true, payload: {}, error: {} };

  await axios.delete(routes.api_transactions_endpoint+`/${uid}/${id}`).then(result => {
    if(results.status === 200){
      return results.data;
    }else{
      throw new Error('there was an error removing transanction');
    }
  }).then(transactions => {
    results.status = true;
    results.payload = [...transactions];
    results.error = {};
  }).catch(error => {
    results.status = false;
    results.payload = [];
    results.error = {...error};
  });
  return results;
};


export const fetchUserByID = async (uid) => {
  let results = { status: true, payload: {}, error: {} };
  
  await axios.get(routes.api_user_endpoint + `/${uid}`).then(result => {
      if(result.status === 200){
        return result.data;
      }else{
      }
  }).then(user => {
    results.status = true;
    results.payload = {...user};
    results.error = {};
  }).catch(error => {
    results.status = false;
    results.payload = {};
    results.error = {...error};
  });
  return results;
}