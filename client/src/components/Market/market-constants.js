
export const category_init = {    
    category_id : '',
    category_name : '',
    description : '',
    notes : '',
    category_type : '',
    sub_category : '',
    category_art : '',
};

export const category_errors_init = {
    category_name_error : '',
    description_error : '',
    notes_error : '',
    category_type_error : '',
    sub_category_error : '',
    category_art_error : ''
};

export const products_init = {
         uid : '',
         id: '',
         category_id : '',
         product_name: '',
         description: '',
         product_art: '',
         price: '',
         currency: 'zar'
};

export const products_errors_init = {
    category_id_error : '',
    product_name_error : '',
    description_error : '',
    product_art_error : '',
    price_error : '',
    currency_error : ''
};

export const service_init = {
    uid: '',
    id: '',
    category_id: '',
    service_name: '',
    description: '',
    service_art : '',
    price: '',
    currency: 'zar'
};

export const service_errors_init = {
    category_id_error : '',
    service_name_error: '',
    description_error: '',
    service_art_error: '',
    price_error: '',
    currency_error: 'zar'
};


export const physical_address_init = {
    uid: '',
    deliver_to : '',
    stand: '',
    street_name: '',
    city: '',
    province: '',
    country : '',
    postal_code: '',
};

export const physical_address_errors_init = {
    deliver_to_error : '',
    stand_error : '',
    street_name_error : '',
    city_error : '',
    province_error : '',
    country_error : '',
    postal_code_error : ''
};


export const contact_details_init = {
    uid: "",
    tel: "",
    cell: "",
    email: "",
    fax: "",
    website: ""
};


export const contact_details_errors_init = {
    tel_error : '',
    cell_error : '',
    email_error : '',
    fax_error : '',
    website_error : ''
};


export const cart_init = {
    cart_id :'',  // # unique id for this cart instance
    uid :'',
    total_items : '0',
    date_created : '',
    is_active : true,
    sub_total :'0',
    tax : '0',
    total : '0'
};

export const coupon_init = {
    uid: '',    
    code: '',
    validated : false    
};