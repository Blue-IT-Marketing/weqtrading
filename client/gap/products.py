

import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
import json
import random
import string

class Products (ndb.Expando):
    uid = ndb.StringProperty()
    id = ndb.StringProperty()
    category_id = ndb.StringProperty()
    product_name = ndb.StringProperty()
    description = ndb.StringProperty()
    product_art = ndb.StringProperty()
    price = ndb.StringProperty()
    currency = ndb.StringProperty(default='zar')
    
    def create_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))


    def addProduct(self,product):
        products_request = Products.query(Products.product_name == product['product_name'])
        products_list = products_request.fetch()
        
        if len(products_list) > 0:
            return ''
        else:
            self.id = self.create_id()
            self.category_id = product['category_id']
            self.product_name = product['product_name']
            self.description = product['description']
            self.price = product['price']
            self.product_art = product['product_art']
            self.uid = product['uid']
            
            return self.put()
