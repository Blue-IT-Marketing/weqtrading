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
      results = [...products];
    })
    .catch(error => {
      console.log(error.message);
    });

  return results;
};

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
}