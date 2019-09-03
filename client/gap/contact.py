import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
import json,random,string


class Contact(ndb.Expando):
    contact_id = ndb.StringProperty()
    names = ndb.StringProperty() 
    cell = ndb.StringProperty() 
    email = ndb.StringProperty() 
    subject = ndb.StringProperty()   
    message = ndb.StringProperty() 
    


    def create_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))
