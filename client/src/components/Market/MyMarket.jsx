import React,{Fragment,useState,useEffect} from 'react';
import {products_init,service_init} from './market-constants';
import {firebase} from '../../firebase';
import * as RequestsAPI from './api-requests';



function AddProduct(){
    const[product,setProduct] = useState(products_init);
    const[uploaded,setUploaded] = useState({
        image :'',
        url : '',
        size : 0,
        filename : '',
        progress : 0

    });

    const[categories,setCategories] = useState([]);

    
    const doUpload = async e => {
        
        const { image } = uploaded;

        const uploadTask = firebase.storage.ref(`products/${image.name}`).put(image);
            await uploadTask.on("state_changed",
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
                    firebase.storage.ref("products").child(image.name).getDownloadURL()
                        .then(url => {
                            console.log(url);
                            setProduct({
                                ...product,
                                product_art : url
                            })                            
                        })
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
        let product_to_save = Object.assign({},product);
        product_to_save.uid = firebase.auth.currentUser.uid;
        console.log('Product to Save',product_to_save);
        const product_data = JSON.stringify(product);
    };

    useEffect(() => {
      RequestsAPI.fetchCategories(results => setCategories(results));
      return () => {
        setCategories([]);
      };
    }, [])
    
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
            <div className='form-group'>
                <label>Select Product Categories</label>
                <select
                    name='category_id'
                    className='form-control'
                    onChange={e =>
                    setProduct({ ...product, [e.target.name]: e.target.value })
                    }
                >
                    {
                        categories.map(category => <option value={category.category_id}> {category.category_name}</option>)
                    }

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

            <div className='form-group'>
                <button
                    type='button'
                    className='btn btn-bitbucket'
                    name='upload-product-art'
                    onClick={e => doUpload(e)}
                >
                    <strong>
                        <i className='fa fa-cloud-upload'> </i>{' '}
                        Upload Product Art
                    </strong>

                </button>
            </div>

            <div className="form-group">
              <div className="polaroid">
                <img 
                    className="pola-image" 
                    height='240' 
                    width='320' 
                    src={product.product_art || 'https://via.placeholder.com/300/09f/fff.png'} 
                    />
              </div>
            </div>

            <div className="form-group">
              <button 
                className="btn btn-success"
                name='save-product'
                onClick={e => doSaveProduct(e)}

              >
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
};

        //  uid: "",
        //  id: "",
        //  group_id: "",
        //  service_name: "",
        //  description: "",
        //  service_art : '',
        //  price: "",
        //  currency: "zar"

function AddService(){
    const [service,setService] = useState(service_init);

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
                  className="pola-image"
                  height="240"
                  width="320"
                  src={
                    service.service_art ||
                    "https://via.placeholder.com/300/09f/fff.png"
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
};  


export default function MyMarket (){
    const [display,setDisplay] = useState('add-products');
    const [product, setProduct] = useState(products_init);
    const[service,setService] = useState(service_init);


  return (
      <Fragment>
          <div className='box box-body'>
              <div className='box-header'>
                  <h3 className='box-title'>
                      <strong>
                          <i className='fa fa-shopping-basket'> </i>
                          {" "}
                          My Products &amp; Services
                      </strong>
                  </h3>
                  <div className='box-tools'>
                      <button
                        type='button'
                        className='btn btn-box-tool'
                        name='add-products'
                        onClick = {e => setDisplay(e.target.name)}
                      >
                           <i className='fa fa-shopping-bag'> </i>{' '}
                              Add Products
                          
                      </button>
                      <button
                        type='button'
                        className='btn btn-box-tool'
                        name='add-services'
                        onClick = {e => setDisplay(e.target.name)}
                      >
                           <i className='fa fa-shopping-cart'> </i>{' '}
                              Add Services
                          
                      </button>

                      <button
                        type='button'
                        className='btn btn-box-tool btn-outline-dark'
                        name='add-categories'
                        onClick = {e => setDisplay(e.target.name)}
                      >
                          <i className='fa fa-bookmark'> </i>{' '}
                          Add Categories
                      </button>

                  </div>
              </div>
          
            
            {
                display === 'add-products' ? 
                    <AddProduct /> : ''
            }

            {
                display === 'add-services' ? 
                    <AddService /> : ''
            }
          </div>

      </Fragment>
  )
}
