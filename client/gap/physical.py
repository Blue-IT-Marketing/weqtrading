import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
import json,random,string


    # uid: '',
    # deliver_to : '',
    # stand: '',
    # street_name: '',
    # city: '',
    # province: '',
    # country : '',
    # postal_code: '',


class PhysicalAddress(ndb.Expando):
    uid = ndb.StringProperty()
    deliver_to = ndb.StringProperty()
    stand = ndb.StringProperty()
    street_name = ndb.StringProperty()
    city = ndb.StringProperty()
    province = ndb.StringProperty()
    country  = ndb.StringProperty()
    postal_code = ndb.StringProperty()


    def addPhysicalAddress(self,physical):

        physical_request = PhysicalAddress.query(PhysicalAddress.uid == physical['uid'])
        physical_list = physical_request.fetch()

        
        if len(physical_list) > 0:
            physical_address = physical_list[0]
        else:
            physical_address = PhysicalAddress()

        physical_address.uid = physical['uid']
        physical_address.deliver_to = physical['deliver_to']
        physical_address.stand = physical['stand']
        physical_address.street_name = physical['street_name']
        physical_address.city = physical['city']
        physical_address.province = physical['province']
        physical_address.country = physical['country']
        physical_address.postal_code = physical['postal_code']
        physical_address.put()

        return physical_address


