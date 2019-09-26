import React, { Fragment, useState, useEffect,useContext } from "react";
import {
  products_init,
  products_errors_init,
  service_init,
  service_errors_init,
  category_init,
  category_errors_init
} from "./market-constants";
import { firebase } from "../../firebase";
import * as RequestsAPI from "./api-requests";
import axios from "axios";

import InlineMessage from '../Forms/InlineMessage';
import InlineError from '../Forms/InlineError';

import {Utils} from '../../utilities';
import { UserAccountContext } from "../../context/UserAccount/userAccountContext";

function AddProduct() {
  const [product, setProduct] = useState(products_init);
  const [uploaded, setUploaded] = useState({image: "",url: "",size: 0,filename: "",progress: 0});
  const [inline,setInline] = useState({message : '', message_type:'info'});
  const [errors,setErrors] = useState(products_errors_init)
  const [categories, setCategories] = useState([]);
  const { user_account_state, doLogin } = useContext(UserAccountContext);
  const doUpload = async e => {
    const { image } = uploaded;
    try {
      let category = categories.find(
        category => category.category_id === product.category_id
      );

      const uploadTask = firebase.storage
        .ref(`products/${user_account_state.user_account.uid}/${category.sub_category}/${image.name}`)
        .put(image);
      await uploadTask.on(
        "state_changed",
        snapshot => {
          //progress
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploaded({ ...uploaded, progress });
        },
        error => {
          console.log(error.message);
        },
        () => {
          // complete function
          firebase.storage
            .ref(`products/${user_account_state.user_account.uid}/${category.sub_category}`)
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              console.log(url);
              setProduct({
                ...product,
                product_art: url
              });
            });
        }
      );
    } catch (error) {
      console.log(error);
      setInline({ message: error.message, message_type: "error" });
    }

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
    product_to_save.uid = user_account_state.user_account.uid;
    console.log("Product to Save", product_to_save);
    product_to_save = JSON.stringify(product_to_save);
    RequestsAPI.saveProduct(product_to_save)
      .then(results => {
        if (results.status) {
          setProduct(results.payload);
          setInline({
            message: "successfully saved product",
            message_type: "info"
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


  const checkErrors = async e => {
    let isError = false;

    const check_product_name = () => {
      if(Utils.isEmpty(product.product_name)){
        setErrors({
          ...errors,
          product_name_error : 'product name field cannot be empty'
        });
        return true;
      }
      return false;
    }

    const check_product_description = () => {
      if(Utils.isEmpty(product.description)){
        setErrors({...errors,description_error : 'product description cannot be empty'});
        return true;
      }
      return false;
    }

    const check_price = () => {
      if(Utils.isMoney(product.price)){
        setErrors({...errors,price_error: 'product price is invalid'});
        return true;
      }
      return false;
    }

    const check_product_art = () => {
      if(Utils.isEmpty(product.product_art)){
        setErrors({...errors,product_art_error : 'product art is not valid'});
        return true;
      }
      return false;
    }

    const check_category_id = () => {
      if(Utils.isEmpty(product.category_id)){
        setErrors({...errors,category_id_error : 'please select main category type'});
      }
    }

    const do_check_errors = () => {
        check_product_name() ? isError = true : isError = isError;
        check_product_description() ? (isError = true) : (isError = isError);
        check_price() ? (isError = true) : (isError = isError);
        check_product_art() ? (isError = true) : (isError = isError);
        check_category_id() ? (isError = true) : (isError = isError);
        return isError;
    }


    return await do_check_errors();     
  };


  useEffect(() => {
    let category_type = 'products';
    RequestsAPI.fetchCategories(category_type).then(results => {
      console.log('Category results',results);
      setCategories(results);
    });
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
            {errors.product_name_error ? (
              <InlineError message={errors.product_name_error} />
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <textarea
              
              className="form-control"
              name="description"
              placeholder="Product Description..."
              value={product.description}
              onChange={e =>
                setProduct({ ...product, [e.target.name]: e.target.value })
              }
            />
            {errors.description_error ? (
              <InlineError message={errors.description_error} />
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label>Product Categories</label>
            <select
              name="category_id"
              className="form-control"
              onChange={e =>
                setProduct({ ...product, [e.target.name]: e.target.value })
              }
            >
              <option value={null}>Select Product Category</option>
              {categories.map(category => {
                console.log("What the hell", category);
                return (
                  <option value={category.category_id}>
                    {" "}
                    {category.sub_category} - {category.category_name}{" "}
                  </option>
                );
              })}
            </select>
            {errors.category_id_error ? (
              <InlineError message={errors.category_id_error} />
            ) : (
              ""
            )}
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
            {errors.price_error ? (
              <InlineError message={errors.price_error} />
            ) : (
              ""
            )}
          </div>

          <div className="form-group">
            <label>Product Art</label>
            <input
              type="file"
              className="form-control"
              name="product_art"
              onChange={e => FileArtChange(e)}
            />
            {errors.product_art_error ? (
              <InlineError message={errors.product_art_error} />
            ) : (
              ""
            )}
          </div>

          <div className="form-group">
            <button
              type="button"
              className="btn btn-bitbucket btn-lg"
              name="upload-product-art"
              onClick={e => doUpload(e)}
            >
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
                src={product.product_art || placeholder}
              />
            </div>
          </div>

          <div className="form-group">
            <button
              type="button"
              className="btn btn-success btn-lg"
              name="save-product"
              onClick={e =>
                checkErrors(e).then(isError => {
                  if (isError) {
                    doSaveProduct(e).then(result => {
                      console.log("Product saved");
                    });
                  } else {
                    setInline({
                      message: "there was an error processing form",
                      message_type: "error"
                    });
                  }
                })
              }
            >
              <strong>
                <i className="fa fa-save"> </i> Add Product
              </strong>
            </button>
            <button
              type="button"
              className="btn btn-warning btn-lg"
              onClick={e => {
                setErrors(products_errors_init);
                setInline({ message: "", message_type: "info" });
                setProduct(products_init);
              }}
            >
              <strong>
                <i className="fa fa-eraser"> </i> Reset
              </strong>
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
    </Fragment>
  );
}

function AddService() {
  const [service, setService] = useState(service_init);
  const [errors,setErrors] = useState(service_errors_init);
  const [inline,setInline] = useState({message:'',message_type:'info'});
  const [categories,setCategories] = useState([]);
  const [uploaded, setUploaded] = useState({
    image: "",
    url: "",
    size: 0,
    filename: "",
    progress: 0
  });

  const { user_account_state, doLogin } = useContext(UserAccountContext);

  const placeholder = "https://via.placeholder.com/300/09f/fff.png";

  const doUpload = async e => {
    const { image } = uploaded;
    try {
      let category = categories.find(
        category => category.category_id === service.category_id
      );
      const uploadTask = firebase.storage
        .ref(`services/${user_account_state.user_account.uid}/${category.sub_category}/${image.name}`)
        .put(image);
      await uploadTask.on(
        "state_changed",
        snapshot => {
          //progress
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploaded({ ...uploaded, progress });
        },
        error => {
          console.log(error.message);
        },
        () => {
          // complete function
          firebase.storage
            .ref(`services/${user_account_state.user_account.uid}/${category.sub_category}`)
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              console.log(url);
              setService({
                ...service,
                service_art: url
              });
            });
        }
      );
    } catch (error) {
      console.log(error)
      setInline({message:'please fill in the form correctly before you upload service art',message_type:'error'});
    }

  };

  const fileArtChange = async e => {
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


  const checkErrors = async e => {
    let isError = false;

    const check_service_name = () => {
      if(Utils.isEmpty(service.service_name)){
        setErrors({...errors,service_name_error : 'service name field cannot be empty'});
        return true;
      }
      return false;
    }

    const check_service_description = e => {
      if(Utils.isEmpty(service.description)){
        setErrors({...errors,description_error : 'service description field cannot be empty'});
        return true;
      }
      return false;
    }

    const check_service_art = e => {
      if(Utils.isEmpty(service.service_art)){
        setErrors({...errors,service_art_error : 'service art cannot be empty'});
        return true;
      }
      return false;
    }

    const check_price = e => {
      
        if(Utils.isMoney(service.price) === false){
          setErrors({...errors,price_error:'invalid service price'});
          return true;
        }
        return false;
    }


    const check_service_category = e => {
      if(Utils.isEmpty(service.category_id)){
        setErrors({...errors,category_id_error : 'please select service category'});
        return true;
      }
      return false;
    }

    const do_check =  e => {
      check_service_name() ? isError = true : isError = false;
      check_service_description() ? isError = true : isError = false;
      check_service_art() ? isError = true : isError = false;
      check_price() ? isError = true : isError = false;
      check_service_category() ? isError = true : isError = false;

      return isError;
      
    } 


    return await do_check();
    
  }


  const addService = async e => {
      let my_service = {...service}; 
      my_service.uid = user_account_state.user_account.uid;
      await RequestsAPI.doAddService(JSON.stringify(my_service)).then(results => {
          if(results.status){
            setService(results.payload);
            setInline({message:'successfully saved service',message_type:'info'});
          }else{
            setInline({message:results.error.message,message_type:'error'});
          }
      }).catch(error => {
        setInline({message:error.message,message_type:'error'});
      });

      return true;
  };
  

  useEffect(() => {
    let category_type = "services";
    RequestsAPI.fetchCategories(category_type).then(results => {
      console.log("Category results", results);
      setCategories(results);
    });
    return () => {
      setCategories([]);
    };
  }, []);

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
            {errors.service_name_error ? <InlineError message={errors.service_name_error} /> : ''}
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              name="description"
              placeholder="Service Description..."
              value={service.description}
              onChange={e =>
                setService({ ...service, [e.target.name]: e.target.value })
              }
            />
            {errors.description_error ? <InlineError message={errors.description_error} /> : ''}
          </div>

          <div className="form-group">
            <label>Service Categories</label>
            <select
              name="category_id"
              className="form-control"
              onChange={e =>
                setService({ ...service, [e.target.name]: e.target.value })
              }
            >
              <option value={null}>Select Service Category</option>
              {categories.map(category => {
                console.log("What the hell", category);
                return (
                  <option value={category.category_id}>
                    {" "}
                    {category.sub_category} - {category.category_name}{" "}
                  </option>
                );
              })}
            </select>
            {errors.category_id_error ? (
              <InlineError message={errors.category_id_error} />
            ) : (
              ""
            )}
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
            {errors.price_error ? <InlineError message={errors.price_error} />  : ''}
          </div>

          <div className="form-group">
            <label>Service Art</label>
            <input
              type="file"
              className="form-control"
              name="service_art"
              onChange={e => fileArtChange(e)}
            />
            {errors.service_art_error ? <InlineError message={errors.service_art_error} /> : ''}
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-bitbucket btn-lg"
              onClick={e => doUpload(e).then(results => {console.log(results)})}
            >
              <strong>
                <i className="fa fa-cloud-upload"> </i> Upload Service Art
              </strong>
            </button>
          </div>

          <div className="form-group">
            <div className="polaroid">
              <img
                height="300"
                width="300"
                src={
                  service.service_art ||
                  "https://via.placeholder.com/300/09f/fff.png"
                }
              />
            </div>
          </div>

          <div className="form-group">
            <button 
            type='button'
            className="btn btn-success btn-lg"
            onClick={e => checkErrors(e).then(isError => {
              isError ?
                setInline({message:'there was an error processing form'})
              : addService(e).then(results => {
                    console.log(results);
                    setInline({message:''})
                }).catch(error => {
                  setInline({message:error.message,message_type:'error'});
                });
            })}
            
            >
              <strong>
                <i className="fa fa-save"> </i> Add Service
              </strong>
            </button>
            <button
              type='button'
              className="btn btn-warning btn-lg"
              onClick={e => {
                setService(service_init);
                setErrors(service_errors_init);
                setInline({message:'',message_type:'info'});
              }}>
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
  const { user_account_state, doLogin } = useContext(UserAccountContext);

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

    const uploadTask = firebase.storage.ref(`categories/${user_account_state.user_account.uid}/${image.name}`).put(image);
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
        my_category.uid = user_account_state.user_account.uid;
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
                <option value={null}>Select Product or Service Category Type</option>
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
            <textarea
              
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
              className="btn btn-bitbucket btn-lg"
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
              className="btn btn-success btn-lg"
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
              className="btn btn-warning btn-lg"
              name="reset-category"
              onClick = {e => {
                setCategory(category_init);
                setErrors(category_errors_init);
                setInline({message:'',message_type:'info'});
              }}              
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
  const [displayMenu,setMenu] = useState({menu:false});

    const showDropdownMenu = e => {
      e.preventDefault();
      setMenu({ menu: true });
      document.addEventListener("click", hideDropdownMenu);
    };

    const hideDropdownMenu = () => {
      setMenu({ menu: false });
      document.removeEventListener("click", hideDropdownMenu);
    };

  return (
    <Fragment>
      <div className="box box-body">
        <div className="box-header">
          <h3 className="box-title">
            <strong>
              <i className="fa fa-shopping-basket"> </i> My Products &amp;
              Services
            </strong>
          </h3>
          <div className="box-tools">
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-box-tool dropdown-toggle"
                onClick={e => showDropdownMenu(e)}
              >
                <i className='fa fa-bars'> </i>
              </button>
              {displayMenu.menu ? (
                <ul className="dropmenu">
                  <li
                    className="btn btn-block droplink"
                    name="add-categories"
                    onClick={e => setDisplay("add-categories")}
                  >
                    <i className="fa fa-bookmark"> </i> Categories
                  </li>
                  <li
                    className="btn btn-block droplink"
                    name="add-products"
                    onClick={e => setDisplay("add-products")}
                  >
                    <i className="fa fa-shopping-bag"> </i> Products
                  </li>
                  <li
                    className="btn btn-block droplink"
                    name="add-services"
                    onClick={e => setDisplay("add-services")}
                  >
                    <i className="fa fa-shopping-cart"> </i> Services
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </div>

        {display === "add-products" ? <AddProduct /> : ""}
        {display === "add-services" ? <AddService /> : ""}
        {display === "add-categories" ? <AddCategories /> : ""}
      </div>
    </Fragment>
  );
}
