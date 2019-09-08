import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
import json,random,string
from datetime import date,datetime


class Contact(ndb.Expando):
    contact_id = ndb.StringProperty()
    names = ndb.StringProperty() 
    cell = ndb.StringProperty() 
    email = ndb.StringProperty() 
    subject = ndb.StringProperty()   
    message = ndb.StringProperty()
    timestamp = ndb.StringProperty()
    


    def create_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))

    def new_contact(self,contact):
        today = datetime.now()
        today = today.date()


        contact_query =Contact.query(Contact.email == Contact.email and Contact.timestamp == today )
        contact_list = contact_query.fetch()

        if len(contact_list) > 0:
            self.contact_id = self.create_id()
            self.names = contact['names']
            self.cell = contact['cell']
            self.email = contact['email']
            self.subject = contact['subject']
            self.message = contact['message']
            self.timestamp = today
            return self.put()
        else:
            return ''
