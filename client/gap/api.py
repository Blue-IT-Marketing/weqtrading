import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import json
import logging
from contact import Contact
from categories import Categories
from products import Products
from services import Services
from physical import PhysicalAddress

class APIRouterHandler(webapp2.RequestHandler):

    def get(self):
        url_route = self.request.uri
        route = url_route.split("/")
        
        status_int = 200

        if 'categories' in route:

            category_requests = Categories.query()
            categories_list = category_requests.fetch()

            response_data = []

            for category in categories_list:
                response_data.append(category.to_dict())


        elif 'products' in route:

            products_requests = Products.query()
            products_list = products_requests.fetch()
            
            response_data = []
            for product in products_list:
                response_data.append(product.to_dict())

        elif 'services' in route:

            services_requests = Services.query()
            services_list = services_requests.fetch()

            response_data = []
            for service in services_list:
                response_data.append(service.to_dict())

        elif 'physical-address' in route:

            uid = route[len(route) - 1]

            physical_request = PhysicalAddress.query(PhysicalAddress.uid == uid)
            physical_list = physical_request.fetch()

            if (len(physical_list) > 0):
                physical_address = physical_list[0]
                response_data = physical_address.to_dict()
            else:
                status_int = 403
                response_data ={message:'physical address not found'}

            

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

            this_contact.contact_id = this_contact.create_id()
            this_contact.names = json_data['names']
            this_contact.cell = json_data['cell']
            this_contact.email = json_data['email']
            this_contact.subject = json_data['subject']
            this_contact.message = json_data['message']
            this_contact.put()

        elif 'categories' in route:
            json_data = json.loads(self.request.body)
            logging.info(json_data)
            
            

            this_category = Categories();

            category_requests = Categories.query((Categories.category_name == json_data['category_name']) and (Categories.sub_category == json_data['sub_category']))
            categories_list = category_requests.fetch()
            response_data = '';
            if len(categories_list) > 0:
                response_data = {'message':'duplicate category'}
                status_int = 403
            else:

                this_category.category_id = this_category.create_id()
                this_category.category_type = json_data['category_type']
                this_category.sub_category = json_data['sub_category']
                this_category.category_name = json_data['category_name']
                this_category.description = json_data['description']
                this_category.notes = json_data['notes']
                this_category.category_art = json_data['category_art']
                this_category.put()

                response_data = this_category.to_dict()

        elif 'products' in route:
            json_data = json.loads(self.request.body)
            logging.info(json_data)

            this_products = Products()

            products_request = Products.query(Products.product_name == json_data['product_name'])
            products_list = products_request.fetch()

            response_data = ''
            if len(products_list) > 0:
                response_data = {'message':'duplicate product'}
                status_int = 403
            else:

                this_products.id = this_products.create_id()
                this_products.category_id = json_data['category_id']
                this_products.product_name = json_data['product_name']
                this_products.description = json_data['description']
                this_products.price = json_data['price']
                this_products.product_art = json_data['product_art']
                this_products.uid = json_data['uid']

                this_products.put()

                response_data = this_products.to_dict()

        elif 'services' in route:
            
            json_data = json.loads(self.request.body)
            logging.info(json_data)
            

            service_request = Services(Services.service_name == json_data['service_name'])            
            service_list = service_request.fetch()

            response_data = ''
            if len(service_list) > 0:
                response_data = {'message': 'duplicate service'}
                status_int = 403
            else:


                this_service = Services()
                this_service.id = this_service.create_id()
                this_service.category_id = json_data['category_id']
                this_service.service_name = json_data['service_name']
                this_service.service_art = json_data['service_art']
                this_service.price  = json_data['price']
                this_service.uid = json_data['uid']

                this_service.put() 
                response_data = this_service.to_dict()

        elif 'physical-address' in route:
            json_data = json.loads(self.request.body)
            logging.info(json_data)
            

            physical_request = PhysicalAddress.query(PhysicalAddress.uid == json_data['uid'])
            physical_list = physical_request.fetch()

            status_int = 200
            if len(physical_list) > 0:
                physical_address = physical_list[0]
            else:
                physical_address = PhysicalAddress()

            physical_address.uid = json_data['uid']
            physical_address.deliver_to = json_data['deliver_to']
            physical_address.stand = json_data['stand']
            physical_address.street_name = json_data['street_name']
            physical_address.city = json_data['city']
            physical_address.province = json_data['province']
            physical_address.country = json_data['country']
            physical_address.postal_code = json_data['postal_code']
            physical_address.put()

            response_data = physical_address.to_dict()

        else:
            status_int = 400

            response_data = {'message': 'the server cannot process this request'}


        self.response.headers['Content-Type'] = "application/json"
        self.response.status_int = status_int
        json_data = json.dumps(response_data)
        self.response.write(json_data)


app = webapp2.WSGIApplication([
    ('/api/.*', APIRouterHandler)


], debug=True)
