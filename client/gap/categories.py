import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
import json,random,string


class Categories (ndb.Expando):
    category_id = ndb.StringProperty()
    category_name = ndb.StringProperty()
    description = ndb.StringProperty()
    notes = ndb.StringProperty()
    category_type = ndb.StringProperty()
    sub_category = ndb.StringProperty()
    category_art = ndb.StringProperty()


    def create_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))
