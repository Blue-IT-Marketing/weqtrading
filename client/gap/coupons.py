import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
import json
import random
import string


class Coupons(ndb.Expando):    
    code_id = ndb.StringProperty()
    discount_percentage = ndb.StringProperty()
    code = ndb.StringProperty()
    valid = ndb.BooleanProperty(default=False)


    def addCoupon(self,coupon):

        coupons_query = Coupons.query(Coupons.code == coupon['code'])
        coupons_list = coupons_query.fetch()

        if len(coupons_list) > 0:
            return False
        else:
            pass # finish this up later
    def removeCoupons(self,code):
        coupons_query = Coupons.query(Coupons.code == code)
        coupons_list = coupons_query.fetch()

        for coupon in coupons_list:
            coupon.key.delete()

        return True




