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

export const fetchCategories = async () => {
    let results = [];

    await axios.get(routes.api_categories_endpoint).then(result => {
        if (result.status === 200){
            return result.data;
        }else{
            throw new Error('there was an error fetching product categories');
        }
    }).then(categories => {
        results = categories;
    }).catch(error => {
        console.log('Categories Error : ',error.message);
    })

    return results;
};

export const saveCategory = async (category) => {
    let results = [];

    await axios.post(routes.api_categories_endpoint,'&data='+category).then(result => {
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