import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
import json


class Contact(ndb.Expando):
    contact_id : ndb.StringProperty()
    names : ndb.StringProperty() 
    cell : ndb.StringProperty() 
    email : ndb.StringProperty() 
    subject : ndb.StringProperty()   
    message : ndb.StringProperty() 
    