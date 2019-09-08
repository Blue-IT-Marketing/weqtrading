import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
import json
import random
import string


class Cart(ndb.Expando):
    cart_id = ndb.StringProperty() # unique id for this cart instance
    uid = ndb.StringProperty()
    total_items = ndb.StringProperty()
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
    price = ndb.StringProperty(default=0) # price charged for service or product
    quantity = ndb.StringProperty(default=0) # Quantity of items 
    sub_total = ndb.StringProperty(default=0) # sub total

    def create_item_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))


    def removeItems(self, cart_id):
        items_query = Items.query(Items.cart_id == cart_id)
        items_list = items_query.fetch()

        for item in items_list:
            item.key.delete()
