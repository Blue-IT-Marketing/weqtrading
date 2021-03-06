import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
import json,random,string
from datetime import date,datetime

class Response(ndb.Expando):    
    response_id = ndb.StringProperty()
    contact_id = ndb.StringProperty()
    to_cell = ndb.StringProperty()
    from_cell = ndb.StringProperty()
    to_email = ndb.StringProperty() 
    from_email = ndb.StringProperty()  
    subject = ndb.StringProperty()
    response = ndb.TextProperty()
    timestamp = ndb.StringProperty() 

    def create_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))

    def createResponse(self,response_data,admin_user):
        
        this_response = Response()
        this_response.response_id = this_response.create_id()
        this_response.contact_id = response_data['contact_id']
        this_response.to_cell = response_data['cell']
        this_response.from_cell = admin_user.cell
        this_response.to_email = response_data['email']
        this_response.from_email = admin_user.email
        this_response.subject = response_data['subject']
        this_response.response = response_data['response']        
        this_response.timestamp = str(datetime.now())
        this_response.put()
        return this_response;


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


    def remove_contact(self,contact_id):

        contact_query = Contact.query(Contact.contact_id == contact_id)
        contact_list = contact_query.fetch()

        for contact in contact_list:
            contact.key.delete()

        return True
        
