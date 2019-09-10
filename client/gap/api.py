import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import json,logging
from contact import Contact
from categories import Categories
from products import Products
from services import Services
from physical import PhysicalAddress
from clientcontactdetails import ContactDetails
from cart import Cart,Items
from datetime import datetime
from coupons import Coupons
from user import User
def authorize (uid):
    # take in a user id and check if the user has permissions to access 
    # the resource he or she is asking for

    pass

class APIRouterHandler(webapp2.RequestHandler):
        
    def get(self):
        url_route = self.request.uri
        route = url_route.split("/")

        logging.info('ROUTE INFORMATION')
        logging.info(route)
        
        status_int = 200

        if 'categories' in route:

            category_requests = Categories.query()
            categories_list = category_requests.fetch()

            response_data = []

            for category in categories_list:
                response_data.append(category.to_dict())
        elif 'products' in route:

            product_id = str(route[len(route) - 1])
            logging.info('PRODUCT ID')
            logging.info(product_id)

            if product_id == 'products':

                products_requests = Products.query()
                products_list = products_requests.fetch()
                
                response_data = []
                for product in products_list:
                    response_data.append(product.to_dict())
            else:
                products_requests = Products.query(Products.id == product_id)
                products_list = products_requests.fetch()

                if len(products_list) > 0:
                    product = products_list[0]

                    response_data = product.to_dict()
                else:
                    status_int = 403
                    response_data = {'message':'product not found'}
        elif 'services' in route:
            service_id = str(route[len(route) - 1])
            if service_id == 'services':
                services_requests = Services.query()
                services_list = services_requests.fetch()

                response_data = []
                for service in services_list:
                    response_data.append(service.to_dict())
            else:
                services_requests = Services.query(Services.id == service_id)
                services_list = services_requests.fetch()

                if len(services_list) > 0:
                    service = services_list[0]

                    response_data = service.to_dict()
                else:
                    status_int = 403
                    response_data = {'message':'service not found'}
        elif 'physical-address' in route:

            uid = route[len(route) - 1]

            physical_request = PhysicalAddress.query(PhysicalAddress.uid == uid)
            physical_list = physical_request.fetch()

            if (len(physical_list) > 0):
                physical_address = physical_list[0]
                response_data = physical_address.to_dict()
            else:
                status_int = 403
                response_data ={'message':'physical address not found'}

        elif 'contact-details' in route:

            uid = route[len(route) - 1]

            contact_details_request = ContactDetails.query(ContactDetails.uid == uid)
            contact_details_list = contact_details_request.fetch()

            if (len(contact_details_list) > 0):
                contact_details = contact_details_list[0]
                response_data = contact_details.to_dict()
            else:
                status_int = 403
                response_data = {'message': 'contact details not found'}

        elif 'cart' in route:
            uid = route[len(route) - 1]

            cart_request = Cart.query(Cart.uid == uid)
            cart_list = cart_request.fetch()

            if len(cart_list) > 0:
                cart = cart_list[0]                
                items_request = Items.query(Items.cart_id == cart.cart_id)
                items_list = items_request.fetch()
                cart_items = []
                for item in items_list:
                    cart_items.append(item.to_dict())
                cart = cart.to_dict()
                
                # let results = {status : true, cart_items : [], cart : {}, error: {} };
                response_data = {
                    'status': True,
                    'cart_items': cart_items,
                    'cart': cart,
                    'error': {}
                }

            else:
                status_int = 403
                response_data = {
                    'status': False,
                    'cart_items': [],
                    'cart': {},
                    'error': {'message':'cart items not found'}
                }

        elif 'user' in route:
            uid = route[len(route) - 1]

            this_user = User()
            this_user = this_user.getUser(uid=uid)
            if this_user != '':
                response_data = this_user.to_dict()
            else:
                status_int = 400
                response_data = {'message': 'user not found in the system'}


        else:
            status_int = 400
            response_data = {'message': 'the server cannot process this request'}

        self.response.headers['Content-Type'] = "application/json"
        self.response.status_int = status_int
        json_data = json.dumps(response_data)
        self.response.write(json_data)

    def post(self):
        url = self.request.uri
        route = url.split('/')
        status_int = 200

        if 'contact' in route:
            json_data = json.loads(self.request.body)
            logging.info(json_data)

            this_contact = Contact()
            contact_key = this_contact.new_contact(contact=json_data)

            if contact_key != None:
                response_data = {'message': 'Thank you ' + str(json_data['names']) + ' for sending us this message we will be responding to you through this email ' + str(json_data['email']) }
            else:
                response_data = {'message' : 'Unfortunately we cannot process any more contact messages from you'}

        elif 'categories' in route:
            json_data = json.loads(self.request.body)                            
            this_category = Categories();
            this_category = this_category.addCategory(category=json_data)

            if this_category == '':
                status_int = 403
                response_data={'message':'error category already exist'}
            else:
                response_data = this_category.to_dict()

        elif 'products' in route:
            json_data = json.loads(self.request.body)            
            this_products = Products()
            this_products = this_products.addProduct(product=json_data)
            logging.info(this_products)            
            if this_products != None:
                response_data = {'message': 'product successfully added'}
            else:
                response_data = {'message': 'duplicate product error'}

        elif 'services' in route:            
            json_data = json.loads(self.request.body)                    
            this_service = Services()
            this_service = this_service.addService(service=json_data)

            if this_service != '':    
                response_data = this_service.to_dict()
            else:
                status_int = 403
                response_data = { 'message':'duplicate service'}

        elif 'physical-address' in route:
            json_data = json.loads(self.request.body)                        
            physical_address = PhysicalAddress()
            physical_address = physical_address.addPhysicalAddress(physical=json_data)
            response_data = physical_address.to_dict()

        elif 'contact-details' in route:
            json_data = json.loads(self.request.body)
            contact_details = ContactDetails()
            contact_details = contact_details.addContactDetails(contact=json_data)
            response_data = contact_details.to_dict()

        elif 'cart' in route:            
            
            json_data = json.loads(self.request.body)

            cart_owner_id = json_data['uid']
            item =  json_data['item']
            logging.info(item)

            cart_request = Cart.query(Cart.uid == cart_owner_id)
            cart_list = cart_request.fetch()

            if len(cart_list) > 0 :
                cart = cart_list[0]
            else:
                cart = Cart()
                cart.uid = cart_owner_id
                cart.cart_id = cart.create_cart_id()
                cart.is_active = True
                today = datetime.now()
                today = today.strftime("%d-%b-%Y")
                cart.date_created = today
                cart.total_items = str(0)                
                cart.sub_total = str(0)
                cart.tax = str(0)
                cart.total = str(0)

            items = Items()
            try:
                product_name = item['product_name']
                items.item_type = 'products'
            except:
                items.item_type = 'services'

            items.item_id = items.create_item_id()

            items.id_service_product = item['id']
            items.cart_id = cart.cart_id
            items.price = item['price']
            items.quantity = str(1)
            items.sub_total = str(float(items.price) * int(items.quantity))

            cart.sub_total = str(float(cart.sub_total) + float(items.sub_total))
            cart.tax = str(0)
            cart.total = str(float(cart.sub_total) + float(cart.tax))


            cart.total_items = str(int(cart.total_items) + 1)

            cart.put() 
            items.put() 

            items_request = Items.query(Items.cart_id == cart.cart_id)
            items_list = items_request.fetch()
            ser_items = []
            for item in items_list:
                ser_items.append(item.to_dict())
            cart = cart.to_dict()
            # let results = {status : true, cart_items : [], cart : {}, error: {} };
            response_data = {
                    'status' : 'True' , 
                    'cart_items': ser_items,
                    'cart' : cart,
                    'error' : {}
                    }

        elif 'user' in route:
            json_data = json.loads(self.request.body)
            logging.info('User Data')
            logging.info(json_data)

            this_user = User()
            this_user = this_user.addUser(json_user=json_data)
            if this_user != '':
                response_data = this_user.to_dict()
            else:
                status_int = 403
                response_data = {'message': 'user not found'}

        else:
            status_int = 400
            response_data = {'message': 'the server cannot process this request'}


        self.response.headers['Content-Type'] = "application/json"
        self.response.status_int = status_int
        json_data = json.dumps(response_data)
        self.response.write(json_data)

    def delete(self):
        url = self.request.uri
        route = url.split('/')
        status_int = 200

        if 'cart' in route:
            uid = route[len(route) - 1]
            cart = Cart()
            items = Items()

            cart_id = cart.removeCart(uid=uid)
            if cart_id != '':
                items.removeItems(cart_id=cart_id)

                response_data = {
                    'message': 'successfully deleted cart',
                    'cart': {}
                }
            else:
                response_data = {
                    'message': 'cart not found',
                    'cart': {}
                }
        else:
            status_int = 403
            response_data = {
                'message' : 'error resource not found'
            }


        self.response.headers['Content-Type'] = "application/json"
        self.response.status_int = status_int
        json_data = json.dumps(response_data)
        self.response.write(json_data)

    def put(self):

        url = self.request.uri
        route = url.split('/')
        status_int = 200

        logging.info('ARE WE THERE YET')

        if 'coupons' in route:
            json_data = json.loads(self.request.body)
            logging.info(json_data)


            coupons_request = Coupons.query(Coupons.code == json_data['code'] and Coupons.valid == True)
            coupons_list = coupons_request.fetch();

            cart_request = Cart.query(Cart.uid == json_data['uid'])
            cart_list = cart_request.fetch()



            if ((len(coupons_list) > 0) and (len(cart_list > 0))):
                coupon = coupons_list[0]
                coupon_code = coupon.to_dict()
                response_data = {
                    'succeed' : True,
                    'coupon'  : coupon_code,
                    'message' : 'coupon code valid'
                }

            else:
                response_data = {
                    'succeed': False,
                    'coupon' : {},
                    'message':'cannot find coupon or your cart is empty'
                }

        elif 'user' in route:
            json_data = json.loads(self.request.body)
            logging.info(json_data)

            this_user = User();
            this_user = this_user.updateUser(json_user=json_data)

            if this_user != '':
                response_data = this_user.to_dict()
            else:
                status_int = 403
                response_data={'message':'user not found'}


        else:
            status_int = 401
            response_data = {'message': 'you are not allowed to access that method'}
            
        self.response.headers['Content-Type'] = "application/json"
        self.response.status_int = status_int
        json_data = json.dumps(response_data)
        self.response.write(json_data)


app = webapp2.WSGIApplication([
    ('/api/.*', APIRouterHandler)


], debug=True)
