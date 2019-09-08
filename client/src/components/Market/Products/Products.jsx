import React ,{useState,useEffect,Fragment,useContext}from 'react';
import {products_init,category_init} from '../market-constants';
import { routes,settings } from '../../../constants';
import * as apiRequests from '../api-requests';
import * as productStore from '../CheckOut/store-basket';

import InlineMessage from '../../Forms/InlineMessage';

import { UserAccountContext } from "../../../context/UserAccount/userAccountContext";

const Product = ({product,addProductToBasket}) => {
  const [inline,setInline] = useState({message:'',message_type:'info'});
  const { user_account_state, doLogin } = useContext(UserAccountContext);

  const addToBasket = async product => {    
    
    console.log('Adding this product to basket',product);
    if (user_account_state.user_account.uid){
    try {
      await addProductToBasket(product)
        .then(Response => {
          if (Response.status) {
            setInline({
              message: ` successfully add ${product.product_name} to basket`
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
  }else{
    setInline({message:'you are presently not logged in please login in order to start buying and selling products in this portal',message_type:'error'});
  }


  };

  return (
    <div className="box box-info">
      <div className="polaroid">
        <div className="box box-footer">
          <div className="box box-header">
            <h3 className="box-title" title={product.description}>
              {product.product_name}
            </h3>
            <div className="box-tools">
              <button
                type="button"
                className="btn btn-box-tool btn-outline-light"
                onClick={e => addToBasket(product)}
                title={`Add ${product.product_name} to Basket`}
              >
                R {product.price}.00 Add to Basket
              </button>
            </div>
          </div>
          <img
            className="pola-image"
            src={product.product_art}
            alt={product.product_name}
            title={
              `
              Title : ${product.product_name}  
              Description : 
              ${product.description}
              
              ----------------------------------
              
              Price : R ${product.price}.00
            `}
          />
          <div className="polatext">
            <span>{product.description}</span>
            <div className="box-tools">
              <div className="box-tools">
                <button
                  type="button"
                  className="btn btn-warning btn-outline-light"
                  onClick={e => addToBasket(product)}
                  title={`Add ${product.product_name} to Basket `}
                >
                  R {product.price}.00 Add to Basket
                </button>
                {inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type} /> : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function Products({products}) {

    const [categories,setCategories] = useState([]);
    const [sub_categories,setSubCategories] = useState([]);
    const [show_products, setShowProducts] = useState([]);

    const [shoppingBasket,setShoppingBasket] = useState([]);
    const { user_account_state, doLogin } = useContext(UserAccountContext);

    const addProductToBasket = async product => {   
        let results = { status: true, payload: {}, error: {} };     
        let cart_item = {
          uid : user_account_state.user_account.uid,
          item : product,
        };

        await apiRequests.addToCart(JSON.stringify(cart_item)).then(Response => {          
          results = { ...Response };
          if(Response.status){                        
            setShoppingBasket(Response.payload)
          }else{
             console.log(Response.error.message);
          }            
        });
        return results;
    };


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
            <h3 className="box-title">
              <i className='fa fa-product-hunt'> </i>{' '}
                Products
            </h3>

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
                  if(product.product_name && product.product_art && product.description && product.price){
                    return (
                      <Product
                        product={product}
                        key={product.id}
                        addProductToBasket={addProductToBasket}
                      />
                    )}                  
                })
              }
        </div>
      </Fragment>
    );
}
