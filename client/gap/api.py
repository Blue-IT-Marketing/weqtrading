import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import json,logging
from contact import Contact,Response
from categories import Categories
from products import Products
from services import Services
from physical import PhysicalAddress
from clientcontactdetails import ContactDetails
from cart import Cart, Items, ProductRequests, ServiceRequests
from datetime import datetime
from coupons import Coupons
from user import User
from store import Store
from transactions import Transactions
from banking import Banking

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
            
            id = str(route[len(route) - 1])
            router = str(route[len(route) - 2])
            request = str(route[len(route) - 3])

            logging.info('PRODUCT ID')
            logging.info(id)

            if id == 'products':

                products_requests = Products.query()
                products_list = products_requests.fetch()
                
                response_data = []
                for product in products_list:
                    response_data.append(product.to_dict())

            elif router == 'user':

                products_request = Products.query(Products.uid == id)
                products_list = products_request.fetch()

                response_data = []
                for product in products_list:
                    response_data.append(product.to_dict())

            # requests here equals product requests

            elif router == 'search':

                search_text = id
                products_request = Products.query()
                products_list = products_request.fetch()
                
                response_data = []

                for product in products_list:
                    if (product.product_name != None) and (search_text.lower() in product.product_name.lower()):
                        response_data.append(product.to_dict())
                    elif (product.description != None) and (search_text.lower() in product.description.lower()):
                        response_data.append(product.to_dict())
                    elif (product.price != None) and search_text.lower() in product.price.lower():
                        response_data.append(product.to_dict())
                    else:
                        pass                                                        

            elif request == 'requests':
                # /requests/${uid}/${id}
                uid = router

                # id in here is the same as product_id in productRequests 
                this_query = ProductRequests.query(ProductRequests.product_id == id)
                this_product_requests_list = this_query.fetch()

                                
                response_data = []

                for product_request in this_product_requests_list:
                    # this insures that it wont be possible to get product requests if you are not the owner of the product
                    if product_request.uid == uid:
                        response_data.append(product_request.to_dict())
                    else:
                        pass

            else :
                products_requests = Products.query(Products.id == id)
                products_list = products_requests.fetch()

                if len(products_list) > 0:
                    product = products_list[0]
                    response_data = product.to_dict()
                else:
                    status_int = 403
                    response_data = {'message':'product not found'}

        elif 'services' in route:
            id = str(route[len(route) - 1])
            router = str(route[len(route) - 2])

            # fetch list of services
            if id == 'services':
                services_requests = Services.query()
                services_list = services_requests.fetch()

                response_data = []
                for service in services_list:
                    response_data.append(service.to_dict())

            elif router == 'user':
                
                services_request = Services.query(Services.uid == id)
                services_list = services_request.fetch()

                response_data = []
                for service in services_list:
                    response_data.append(service.to_dict())

            elif router == 'search':
                search_text = id
                services_request = Services.query()
                services_list = services_request.fetch()

                response_data = []

                for service in services_list:
                    if (service.service_name != None) and (search_text.lower() == service.service_name.lower()):
                        response_data.append(service.to_dict())
                    elif (service.description != None) and (search_text.lower() == service.description.lower()):
                        response_data.append(service.to_dict())
                    elif (service.price != None) and (search_text.lower() == service.price.lower()):
                        response_data.append(service.to_dict())
                    else:
                        pass

                    
            else:
                # fetch a single service
                services_requests = Services.query(Services.id == id)
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

        elif 'store' in route:
            uid = route[len(route) - 1]

            this_store = Store()
            this_store = this_store.getStore(uid)

            if this_store != '':
                response_data = this_store.to_dict()
            else:
                status_int = 403
                response_data = {'message': 'store not found'}

        elif 'transactions' in route:
            uid = route[len(route) - 1]

            this_transactions  = Transactions()
            transactions_list = this_transactions.fetchTransactions(uid)
            response_data = []
            for transaction in transactions_list:
                response_data.append(transaction.to_dict())

        elif 'dashboard' in route:
            uid = str(route[len(route) - 1])

            this_user = User()
            user = this_user.getUser(uid=uid)

            if ('payments' in route) and user.is_admin:
                
                payments_requests = Transactions.query()
                payments_list = payments_requests.fetch()

                response_data = []
                for payment in payments_list:
                    response_data.append(payment.to_dict())

            elif ('contacts' in route) and user.is_admin:
                contacts_requests = Contact.query()
                contacts_list = contacts_requests.fetch()

                response_data = []
                for contact in contacts_list:
                    response_data.append(contact.to_dict())

            elif ('users' in route) and user.is_admin:

                users_requests = User.query()
                user_list = users_requests.fetch()

                response_data = []

                for user in user_list:
                    response_data.append(user.to_dict())

            elif 'banking' in route and user.is_admin:

                banking_requests = Banking.query(Banking.is_admin_account == True)
                banking_list = banking_requests.fetch()

                response_data = []

                for banking in banking_list:
                    response_data.append(banking.to_dict())


            else:
                status_int = 403
                response_data = {'message':'you are not authorized to access dashboard'}
                    

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

                cart.sub_total = str(0)
                cart.tax = str(0)
                cart.total = str(0)

            items = Items()
            try:
                product_name = item['product_name']
                items.item_type = 'products'
                items.quantity = str(json_data['quantity'])
            except:
                items.item_type = 'services'
                items.quantity = str(json_data['quantity'])

            items.item_id = items.create_item_id()

            items.id_service_product = item['id']
            items.cart_id = cart.cart_id
            items.price = item['price']

            items.sub_total = str(float(items.price) * int(items.quantity))

            cart.sub_total = str(float(cart.sub_total) + float(items.sub_total))
            cart.tax = str(0)
            cart.total = str(float(cart.sub_total) + float(cart.tax))


            cart.total_items = str(int(cart.total_items) + int(items.quantity))

            cart.put() 
            items.put() 

            # add product to product requests and then add service to service requests

            if items.item_type == 'products':
                this_request = ProductRequests()
                this_request = this_request.addProduct(product=item,uid=cart_owner_id,total=items.quantity)
            else:
                this_request = ServiceRequests() 
                this_request = this_request.addService(service=item,uid=cart_owner_id,total=items.quantity)
                

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

        elif 'store' in route:
            json_data = json.loads(self.request.body)

            this_store = Store()
            this_store = this_store.addStore(store=json_data)
            if(this_store != ''):
                response_data = this_store.to_dict()
            else:
                status_int = 403
                response_data = {'message': 'store not stored'}

        elif 'transactions' in route:
            json_data = json.loads(self.request.body)

            this_transaction = Transactions()
            result = this_transaction.addTransaction(transaction=json_data)
            logging.info(this_transaction)

            response_data = this_transaction.to_dict()


        elif 'dashboard' in route:
            uid = route[len(route) - 1]

            admin_user_query = User.query(User.uid == uid)
            admin_user_list = admin_user_query.fetch()

            response_data = ''

            if len(admin_user_list) > 0:
                admin_user = admin_user_list[0]
            
                if ('contact' in route) and admin_user.is_admin :

                    if 'response' in route :
                        response_message = json.loads(self.request.body)

                        this_response = Response()
                        results = this_response.createResponse(response_data=response_message, admin_user=admin_user)
                        response_data = results.to_dict()
                    else:
                        status_int = 400
                        response_data = {'message': 'request could not be understood'}

                elif ('banking' in route) and admin_user.is_admin:

                    banking_details = json.loads(self.request.body)

                    this_banking = Banking()
                    results =  this_banking.addAdminBank(banking_details=banking_details)
                    if (results != ''):
                        response_data = results.to_dict()
                    else:
                        status_int = 401
                        response_data = {'message': 'error saving banking details'}

                else:
                    status_int = 400
                    response_data = {
                        'message': 'request could not be understood'}
            else:
                status_int = 400
                response_data = {
                    'message': 'request could not be understood'}

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

        elif 'transactions' in route:
            id = route[len(route) - 1]
            uid = route[len(route) - 2]

            this_transactions = Transactions()
            transaction_list = this_transactions.removeTransaction(id=id,uid=uid)

            response_data = []
            for transaction in transaction_list:
                response_data.append(transaction.to_dict())

        elif 'products' in route:
            id = route[len(route) - 1]
            uid = route[len(route) - 2]

            this_product = Products()
            result = this_product.deleteProduct(uid=uid,id=id)
            if result != '':
                response_data = result.to_dict()
            else:
                status_int = 401
                response_data = {'message':'product not found'}

        elif 'dashboard' in route:
            uid = route[len(route) - 2]

            user_request = User.query(User.uid == uid)
            user_list =user_request.fetch()

            response_data = []
            if len(user_list) > 0:
                user = user_list[0]


                if ('banking' in route) and ('delete' in route) and user.is_admin:
                    # routes.api_dashboard_endpoint + `/banking/delete/${uid}/${banking_id}

                    banking_id = route[len(route) - 1]

                    this_banking = Banking()
                    result = this_banking.deleteBanking(banking_id=banking_id)

                    if result == True:
                        banking_query = Banking.query()
                        banking_list = banking_query.fetch()

                        for banking in banking_list:
                            response_data.append(banking.to_dict())
                    else:
                        status_int = 403
                        response_data = {'message': 'bank account record not found'}

                #TODO add more adminstrative tasks here
                else:
                    status_int = 401
                    response_data = {'message': 'your request is not understood'}

            else:
                status_int = 401
                response_data = {'message': 'your request is not understood'}

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

        elif 'services' in route:
            json_data = json.loads(self.request.body)

            this_service = Services()
            this_service = this_service.updateService(service=json_data)
            
            if this_service != '':
                response_data = this_service.to_dict()
            else:
                status_int = 403
                response_data = {'message': 'error updating service'}

        elif 'products' in route:
            json_data = json.loads(self.request.body)

            this_product = Products()
            this_product = this_product.updateProduct(product=json_data)
            if this_product != '':
                response_data = this_product.to_dict()
            else:
                status_int = 403
                response_data = {'message': 'error updating product'}

        elif 'transactions' in route:
            json_data = json.loads(self.request.body);

            # do process transaction here and create an alert to show that transction
            # must be processed
        
        elif 'payments' in route:

            if 'approve' in route:
                uid = str(route[len(route) - 1])
                transaction = json.loads(self.request.body)

                this_user = User()
                this_user = this_user.getUser(uid=uid)
                if this_user.is_admin:

                    this_transaction_request = Transactions.query(Transactions.id == transaction['id'])
                    this_transaction_list = this_transaction_request.fetch()

                    if len(this_transaction_list) > 0:
                        this_transaction = this_transaction_list[0]
                        this_transaction.processed = True
                        this_transaction.put()
                        response_data = this_transaction.to_dict()
                    else:
                        status_int = 401
                        response_data = {'message': 'transaction not found'}
                else:
                    status_int = 403
                    response_data = {'message': 'you are not authorized to perform this action'}
            elif 'reject' in route:
                uid = str(route[len(route) - 1])
                transaction = json.loads(self.request.body)

                this_user = User()
                this_user = this_user.getUser(uid=uid)

                if this_user.is_admin:
                    this_transaction_request = Transactions.query(
                        Transactions.id == transaction['id'])
                    this_transaction_list = this_transaction_request.fetch()

                    if len(this_transaction_list) > 0:
                        this_transaction = this_transaction_list[0]
                        this_transaction.processed = False
                        this_transaction.put()
                        response_data = this_transaction.to_dict()
                    else:
                        status_int = 401
                        response_data = {'message': 'transaction not found'}
                else:
                    status_int = 403
                    response_data = {
                        'message': 'you are not authorized to perform this action'}

            # add more sub actions here
            else:
                status_int = 501
                response_data = {'message': 'we do not understand that request'}


        elif 'dashboard' in route:
            uid = route[len(route) - 1];

            # finding admin user information
            admin_request = User.query(User.uid == uid)
            admin_list = admin_request.fetch()

            if len(admin_list) > 0:
                user = admin_list[0]
            else:
                user = User()


            response_data = ''

            if ('user' in route) and user.is_admin:
                user_data = json.loads(self.request.body)

                user_request = User.query(User.uid == user_data['uid'])
                user_list = user_request.fetch()

                if(len(user_list) > 0):
                    user = user_list[0]
                    user = user.updateUser(json_data=user_data)
                    response_data = user.to_dict()
                else:
                    status_int = 403
                    response_data = {'message':'user not found'}

            else:
                status_int = 402
                response_data = {'message': 'request malformed'}
                    

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
