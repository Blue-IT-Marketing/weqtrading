import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
import json
import random
import string
import datetime


class ProductRequests(ndb.Expando):
    id = ndb.StringProperty() # id of this request
    product_id = ndb.StringProperty() # the same as the product id in the product table
    client_uid = ndb.StringProperty() # user id of the client who requested the product
    total_requested = ndb.StringProperty(default='1')
    date_requested = ndb.StringProperty()
    products_sent = ndb.BooleanProperty(default=False)
    date_sent = ndb.StringProperty()

    def create_product_request_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))

    def addProduct(self,product,uid,total):

        this_product_requests = ProductRequests()
        this_product_requests.id = this_product_requests.create_product_request_id()
        this_product_requests.product_id = product['id']
        this_product_requests.client_uid = uid
        this_product_requests.total_requested = total
        today = datetime.datetime.now()

        this_product_requests.date_requested = str(datetime.date(year=today.year,month=today.month,day=today.day))
        this_product_requests.total_requested = str(total)

        this_product_requests.put()
        return this_product_requests



class ServiceRequests(ndb.Expando):
    id = ndb.StringProperty()  # id of this request
    # the same as the product id in the product table
    service_id = ndb.StringProperty()
    # user id of the client who requested the product
    client_uid = ndb.StringProperty()
    total_requested = ndb.StringProperty(default='1')
    date_requested = ndb.StringProperty()
    products_sent = ndb.BooleanProperty(default=False)
    date_sent = ndb.StringProperty()

    def create_service_request_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))

    def addService(self, service, uid, total):

        this_service_requests = ServiceRequests()
        this_service_requests.id = this_service_requests.create_service_request_id()
        this_service_requests.product_id = service['id']
        this_service_requests.client_uid = uid
        this_service_requests.total_requested = total
        today = datetime.datetime.now()

        this_service_requests.date_requested = str(datetime.date(
            year=today.year, month=today.month, day=today.day))
        this_service_requests.total_requested = str(total)

        this_service_requests.put()
        return this_service_requests


class Cart(ndb.Expando):
    cart_id = ndb.StringProperty() # unique id for this cart instance
    uid = ndb.StringProperty()
    total_items = ndb.StringProperty(default='0')
    date_created = ndb.StringProperty() 
    is_active = ndb.BooleanProperty(default=True) # to indicate if the user is still interested in the items in this cart
    sub_total = ndb.StringProperty(default=0)
    tax = ndb.StringProperty(default=0)
    total = ndb.StringProperty(default=0)

    
    def create_cart_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))

    def removeCart(self,uid):
        
        cart_request = Cart.query(Cart.uid == uid)
        cart_list = cart_request.fetch()

        cart_id = ''
        for cart in cart_list:
            cart_id = cart.cart_id
            cart.key.delete()
        
        return cart_id
    

        
class Items(ndb.Expando):        
    item_id = ndb.StringProperty() # unique value for the item 
    cart_id = ndb.StringProperty() # to identify the cart where the item is attached
    item_type = ndb.StringProperty(default='product') # Service or Product
    id_service_product = ndb.StringProperty() # ID is the same as the product ID
    price = ndb.StringProperty(default='0') # price charged for service or product
    quantity = ndb.StringProperty(default='0') # Quantity of items
    sub_total = ndb.StringProperty(default='0') # sub total

    def create_item_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))


    def removeItems(self, cart_id):
        items_query = Items.query(Items.cart_id == cart_id)
        items_list = items_query.fetch()

        for item in items_list:
            item.key.delete()
