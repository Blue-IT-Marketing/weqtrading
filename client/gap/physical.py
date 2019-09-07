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

