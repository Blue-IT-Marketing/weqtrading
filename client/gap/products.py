

import os
from google.appengine.ext import ndb
import logging
import json
import random
import string



class Products (ndb.Expando):
    uid = ndb.StringProperty()
    id = ndb.StringProperty()
    category_id = ndb.StringProperty()
    product_name = ndb.StringProperty()
    seo_link = ndb.StringProperty()
    description = ndb.StringProperty()
    product_art = ndb.StringProperty()
    price = ndb.StringProperty()
    currency = ndb.StringProperty(default='zar')
    active = ndb.BooleanProperty(default=True)

    def create_seo_link(self,name):
        temp = ''
        char_list = name.split()
        for char in char_list:
            temp += char

        return temp
    
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
            self.seo_link = self.create_seo_link(name=self.product_name)
            self.description = product['description']
            self.price = product['price']
            self.product_art = product['product_art']
            self.uid = product['uid']
            
            return self.put()

    def deleteProduct(self,uid,id):

        products_requests = Products.query(Products.uid == uid)
        products_list = products_requests.fetch()

        for product in products_list:
            if (product.id == id):
                product.active = False
                product.put()
                return product
            else:
                pass
        return ''

    def updateProduct(self,product):

        products_request = Products.query(Products.id == product['id'])
        products_list = products_request.fetch() 

        for found_product in products_list:
            if found_product.uid == product['uid']:
                found_product.category_id = product['category_id']
                found_product.product_name = product['product_name']
                found_product.description = product['description']
                found_product.product_art = product['product_art']
                found_product.price = product['price']
                found_product.currency = product['currency']
                found_product.active = product['active'] == 'true'
                found_product.put()
                return found_product
            else:
                pass

        return ''


