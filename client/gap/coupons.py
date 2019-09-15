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

    def create_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))

    def addCoupon(self,coupon):

        coupons_query = Coupons.query(Coupons.code == coupon['code'])
        coupons_list = coupons_query.fetch()

        if len(coupons_list) > 0:
            return ''
        else:
            this_coupon = Coupons()
            this_coupon.code_id = this_coupon.create_id()
            this_coupon.discount_percentage = coupon['discount_percentage']
            this_coupon.code = coupon['code']
            this_coupon.valid = True
            this_coupon.put()
            return this_coupon

    def removeCoupons(self,code):
        coupons_query = Coupons.query(Coupons.code == code)
        coupons_list = coupons_query.fetch()

        for coupon in coupons_list:
            coupon.key.delete()
            return coupon

        return ''

        




