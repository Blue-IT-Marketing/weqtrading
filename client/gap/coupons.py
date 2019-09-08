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

