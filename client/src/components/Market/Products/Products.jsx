import React ,{useState,useEffect,Fragment}from 'react';


import {products_init,category_init} from '../market-constants';
import { routes } from '../../../constants';
import * as apiRequests from '../api-requests';

  // uid : '',
  // id: '',
  // category_id : '',
  // product_name: '',
  // description: '',
  // product_art: '',
  // price: '',
  // currency: 'zar'

const Product = ({product}) => {
  return(

    <div className='box box-info'>
        <div className='polaroid'>
            <div className='box box-footer'>
                <div className='box box-header'>
                    <h3 className='box-title'>
                        {product.product_name}
                    </h3>
                    <div className='box-tools'>
                        <button
                          type='button'
                          className='btn btn-box-tool btn-outline-light'
                        >R {product.price}.00 Add to Basket</button>
                    </div>
                </div>

                <img className='pola-image'  src={product.product_art} alt={product.product_name}/> 
                <div className='polatext'>
                    <span>{product.description}</span>
                </div>  
            </div>              
        </div>
    </div>            
  )
}


export default function Products({products}) {

    const [categories,setCategories] = useState([]);
    const [sub_categories,setSubCategories] = useState([]);
    const [show_products, setShowProducts] = useState([]);

    const createSubCategories = (response) => {
        let subCategoryList = [];

        response.forEach(category => {
          if (!subCategoryList.includes(category.sub_category)) {
            subCategoryList.push(category.sub_category);
          }
        });
        console.log('Sub Category List : ',subCategoryList);
        return subCategoryList;
    };


    const onCategoryClick = (category) => {

      let expanded_category = categories.find(expanded_category => expanded_category.sub_category === category);

      let filtered_products = products.filter(product => {
        return product.category_id === expanded_category.category_id;
      });
      console.log('Filtered Products ', filtered_products);
      setShowProducts(filtered_products);
    };


    useEffect(() => {
      
      const fetchAPI = async () => {
        let category_type = "products";
        
        let response = [];

        await apiRequests.fetchCategories(category_type).then(categories => {
            response = categories;
            setCategories(categories);
        }).catch(error => {
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
      console.log('All Products',products);
      setShowProducts(products);
      return () => {
        setShowProducts([]);
      };
    }, [products]);

    return (
      <Fragment>
        <div className="box box-body">
          <div className="box box-header">
            <h3 className="box-title">Products</h3>

            <div className="box-tools">
              {sub_categories.map(sub => {
                return (
                  <button
                    type="button"
                    className="btn btn-box-tool btn-outline-dark"
                    name={sub}
                    onClick={e => onCategoryClick(e.target.name)}
                    >
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>

              {
                show_products.map(product => {
                  return(
                    <Product product={product} key={product.id}/>
                  )
                })
              }
        </div>
      </Fragment>
    );
}
