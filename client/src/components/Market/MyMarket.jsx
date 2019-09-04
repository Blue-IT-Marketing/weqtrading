import React, { Fragment, useState, useEffect } from "react";
import {
  products_init,
  service_init,
  category_init,
  category_errors_init
} from "./market-constants";
import { firebase } from "../../firebase";
import * as RequestsAPI from "./api-requests";
import axios from "axios";

import InlineMessage from '../Forms/InlineMessage';
import InlineError from '../Forms/InlineError';


import {Utils} from '../../utilities';

function AddProduct() {
  const [product, setProduct] = useState(products_init);
  const [uploaded, setUploaded] = useState({image: "",url: "",size: 0,filename: "",progress: 0});

  const [categories, setCategories] = useState([]);

  const doUpload = async e => {
    const { image } = uploaded;

    const uploadTask = firebase.storage.ref(`products/${product.sub_category}/${image.name}`).put(image);
        await uploadTask.on("state_changed",snapshot => {
            //progress
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploaded({...uploaded,progress});
      },error => {
          console.log(error.message);},() => {
        // complete function
        firebase.storage.ref(`products/${product.sub_category}`).child(image.name).getDownloadURL().then(url => {
            console.log(url);
            setProduct({
              ...product,
              product_art: url
            });
          });
      }
    );
  };

  const FileArtChange = async e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      console.log(image);
      setUploaded({
        ...uploaded,
        image: image
      });
      return true;
    }
    return false;
  };

  const doSaveProduct = async e => {
    e.preventDefault();
    let product_to_save = Object.assign({}, product);
    product_to_save.uid = firebase.auth.currentUser.uid;
    console.log("Product to Save", product_to_save);
    const product_data = JSON.stringify(product);
  };

  useEffect(() => {
    RequestsAPI.fetchCategories(results => setCategories(results));
    return () => {
      setCategories([]);
    };
  }, []);
  const placeholder = "https://via.placeholder.com/300/09f/fff.png";
  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">
            <strong>Add Product</strong>
          </h3>
        </div>

        <form className="form-horizontal">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="product_name"
              value={product.product_name}
              placeholder="Product Name..."
              onChange={e =>
                setProduct({ ...product, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Product Description..."
              value={product.description}
              onChange={e =>
                setProduct({ ...product, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Select Product Categories</label>
            <select
              name="category_id"
              className="form-control"
              onChange={e =>
                setProduct({ ...product, [e.target.name]: e.target.value })
              }
            >
              {categories.map(category => (
                <option value={category.category_id}>
                  {" "}
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="price"
              placeholder="Price in ZAR..."
              value={product.price}
              onChange={e =>
                setProduct({ ...product, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Product Art</label>
            <input
              type="file"
              className="form-control"
              name="product_art"
              onChange={e => FileArtChange(e)}
            />
          </div>

          <div className="form-group">
            <button
              type="button"
              className="btn btn-bitbucket"
              name="upload-product-art"
              onClick={e => doUpload(e)}>
              <strong>
                <i className="fa fa-cloud-upload"> </i> Upload Product Art
              </strong>
            </button>
          </div>

          <div className="form-group">
            <div className="polaroid">
              <img
                
                height="300"
                width="300"
                src={product.product_art || placeholder}/>
            </div>
          </div>

          <div className="form-group">
            <button
              className="btn btn-success"
              name="save-product"
              onClick={e => doSaveProduct(e)}>
              <strong>
                <i className="fa fa-save"> </i> Add Product
              </strong>
            </button>
            <button className="btn btn-warning">
              <strong>
                <i className="fa fa-eraser"> </i> Reset
              </strong>
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

function AddService() {
  const [service, setService] = useState(service_init);
  const placeholder = "https://via.placeholder.com/300/09f/fff.png";
  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">
            <strong>Add Service</strong>
          </h3>
        </div>
        <form className="form-horizontal">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="service_name"
              value={service.service_name}
              placeholder="Service Name..."
              onChange={e =>
                setService({ ...service, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Service Description..."
              value={service.description}
              onChange={e =>
                setService({ ...service, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="price"
              placeholder="Price in ZAR..."
              value={service.price}
              onChange={e =>
                setService({ ...service, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Service Art</label>
            <input type="file" className="form-control" name="service_art" />
          </div>

          <div className="form-group">
            <div className="polaroid">
              <img
                
                height="300"
                width="300"
                src={
                  service.service_art || "https://via.placeholder.com/300/09f/fff.png"
                }
              />
            </div>
          </div>

          <div className="form-group">
            <button className="btn btn-success">
              <strong>
                <i className="fa fa-save"> </i> Add Service
              </strong>
            </button>
            <button className="btn btn-warning">
              <strong>
                <i className="fa fa-eraser"> </i> Reset
              </strong>
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

function AddCategories() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(category_init);
  const [uploaded, setUploaded] = useState({image: "",url: "",size: 0,filename: "",progress: 0});
  const [inline,setInline] = useState({message:'',message_type:'info'});
  const [errors, setErrors] = useState(category_errors_init);

  const CategoryArtFileChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      console.log(image);
      setUploaded({
        ...uploaded,
        image: image
      });
      return true;
    }
    return false;
  };

  const doUpload = async e => {
    const { image } = uploaded;

    const uploadTask = firebase.storage.ref(`categories/${image.name}`).put(image);
        await uploadTask.on(
        "state_changed",
        snapshot => {
            //progress
            const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setUploaded({
            ...uploaded,
            progress
            });
        },
        error => {
            //error function
            console.log(error.message);
        },
        () => {
            // complete function
            firebase.storage
            .ref("categories")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                console.log(url);
                setCategory({
                ...category,
                category_art: url
                });
            });
      }
    );
  };


  const doAddCategory = async e => {
        // e.preventDefault();
        let my_category = Object.assign({},category);
        my_category.uid = firebase.auth.currentUser.uid;
        my_category = JSON.stringify(my_category);
        console.log("CATEGORY", my_category);
        RequestsAPI.saveCategory(my_category).then(results => {
            setCategory(results);
            setCategories({ categories: categories.push(results) });
            setInline({ message: "successfully created new category" });
          })
          .catch(error => {
            setInline({ message: error.message, message_type: "error" });
          });
  };



  const checkErrors = async e => {
        // e.preventDefault();
        let isError = false;
        const check_category_name = () => {
            if(Utils.isEmpty(category.category_name)){
                setErrors({
                    ...errors,
                    category_name_error: 'category name cannot be empty'
                });
                return true;
            }
            return false;
        }
        const check_category_type = () => {    
            if(Utils.isEmpty(category.category_type)){
                setErrors({
                    ...errors,
                    category_type_error : 'Please select category type'
                });
                return true;
            }
            return false;
        }
        const check_sub_category = () => {
            if(Utils.isEmpty(category.sub_category)){
                setErrors({
                    ...errors,
                    sub_category_error: 'sub category cannot be empty'
                });
                return true;
            }
            return false;
        }
        const check_description = () => {
            if(Utils.isEmpty(category.description)){
                setErrors({
                    ...errors,
                    description_error : 'description cannot be empty'
                });
                return true;
            }
            return false;
        }
        const check_notes = () => {
            if(Utils.isEmpty(category.notes)){
                setErrors({
                    ...errors,
                    notes_error : 'Notes cannot be empty'
                });
                return true
            }
            return false;
        }
        const check_category_art = () => {
            if(Utils.isEmpty(category.category_art)){
                setErrors({
                    ...errors,
                    category_art_error : 'Category Art cannot be empty'
                });
                return true;
            }
            return false;
        }

        const do_check = () => {
            check_category_name() ? isError = true : isError = isError;
            check_category_type() ? isError = true : isError = isError;
            check_sub_category() ? isError = true : isError = isError;
            check_description() ? isError = true : isError = isError;
            check_notes() ? isError = true : isError = isError;
            check_category_art() ? isError = true : isError = isError;

            return isError;
        }

        return await do_check();
  };



  const placeholder = "https://via.placeholder.com/300/09f/fff.png";
  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">
            <strong>
              <i className="fa fa-bookmark-o"></i> Add Categories
            </strong>
          </h3>
        </div>

        <form className="form-horizontal">
          <div className="form-group">
            <label>Category Type </label>
            <select
              type="text"
              className="form-control"
              name="category_type"
              value={category.category_type}
              onChange={e =>
                setCategory({ ...category, [e.target.name]: e.target.value })
              }>
                <option value="products">Products</option>
                <option value="services">Services</option>
            </select>
            {errors.category_type_error ? <InlineError message={errors.category_type_error} /> : ''}
          </div>

          <div className='form-group'>
              <input 
                type='text' 
                className='form-control'
                name='sub_category'
                placeholder='Sub Category...'
                value={category.sub_category}
                onChange={e =>setCategory({ ...category, [e.target.name]: e.target.value })}
            />
            {errors.sub_category_error ? <InlineError message={errors.sub_category_error} /> : ''}
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="category_name"
              placeholder="Category Name..."
              value={category.category_name}
              onChange={e =>
                setCategory({ ...category, [e.target.name]: e.target.value })
              }
            />
            {errors.category_name_error ? <InlineError message={errors.category_name_error} /> : ''}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Description..."
              value={category.description}
              onChange={e =>
                setCategory({ ...category, [e.target.name]: e.target.value })
              }

            />
            {errors.description_error ? <InlineError message={errors.description_error} /> : ''}
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              name="notes"
              placeholder="Notes..."
              value={category.notes}
              onChange={e =>
                setCategory({ ...category, [e.target.name]: e.target.value })
              }

            />
            {errors.notes_error ? <InlineError message={errors.notes_error} /> : ''}
          </div>
          <div className="form-group">
            <label> Category Art</label>
            <input
              type="file"
              className="form-control"
              onChange={e => CategoryArtFileChange(e)}
            />
            {errors.category_art_error ? <InlineError message={errors.category_art_error} /> : ''}
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-bitbucket"
              name="upload-category-art"
              onClick={e => doUpload(e)}
            >
              <strong>
                <i className="fa fa-cloud-upload"> </i> Upload Category Art
              </strong>
            </button>
          </div>
          <div className="form-group">
            <div className="polaroid">
              <img
                
                height="300"
                width="300"
                src={category.category_art || placeholder}
              />
            </div>
          </div>

          <div className="form-group">
            <button
              type="button"
              className="btn btn-success"
              name="save-category"
              onClick={e => checkErrors(e).then(isError => {
                  isError ? setInline({message: 'there was an error processing form ', message_type:'error'}) 
                    : doAddCategory(e)
              }) }
            >
              <strong>
                <i className="fa fa-save"> </i> Save Category
              </strong>
            </button>
            <button
              type="button"
              className="btn btn-warning"
              name="reset-category"
            >
              <strong>
                <i className="fa fa-save"> </i> Reset
              </strong>
            </button>
          </div>
          <div className='form-group'>
              { inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type} /> : ''}
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default function MyMarket() {
  const [display, setDisplay] = useState("add-categories");
  const [product, setProduct] = useState(products_init);
  const [service, setService] = useState(service_init);
  
  let my_header;
  Utils.isMobile()
    ?  my_header = () => 
        <div className="box-header">
          <h3 className="box-title">
            <strong>
              <i className="fa fa-shopping-basket"> </i> My Products &amp;
              Services
            </strong>
          </h3>
          <div className="box-tools">
            <button
              type="button"
              className="btn btn-box-tool btn-outline-dark"
              name="add-categories"
              onClick={e => setDisplay(e.target.name)}
            >
              <i className="fa fa-bookmark"> </i> Categories
            </button>

            <button
              type="button"
              className="btn btn-box-tool"
              name="add-products"
              onClick={e => setDisplay(e.target.name)}
            >
              <i className="fa fa-shopping-bag"> </i> Products
            </button>
            <button
              type="button"
              className="btn btn-box-tool"
              name="add-services"
              onClick={e => setDisplay(e.target.name)}
            >
              <i className="fa fa-shopping-cart"> </i> Services
            </button>
          </div>
        </div>
      
    : my_header = () => 
        <Fragment>
          <div className="box-header">
            <h3 className="box-title">
              <strong>
                <i className="fa fa-shopping-basket"> </i> My Products &amp;
                Services
              </strong>
            </h3>

            <div className="box-tools">
              <button
                type="button"
                className="btn btn-box-tool btn-outline-dark"
                name="add-categories"
                onClick={e => setDisplay(e.target.name)}
              >
                <i className="fa fa-bookmark"> </i> Add Categories
              </button>
              <button
                type="button"
                className="btn btn-box-tool"
                name="add-products"
                onClick={e => setDisplay(e.target.name)}
              >
                <i className="fa fa-shopping-bag"> </i> Add Products
              </button>
              <button
                type="button"
                className="btn btn-box-tool"
                name="add-services"
                onClick={e => setDisplay(e.target.name)}
              >
                <i className="fa fa-shopping-cart"> </i> Add Services
              </button>
            </div>   
            </div>       
        </Fragment>;
   
  return (
    <Fragment>
      <div className="box box-body">
        {my_header()}  
        {display === "add-products" ? <AddProduct /> : ""}
        {display === "add-services" ? <AddService /> : ""}
        {display === "add-categories" ? <AddCategories /> : ""}
      </div>
    </Fragment>
  );
}
