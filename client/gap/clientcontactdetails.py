import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
import json
import random
import string

class ContactDetails(ndb.Expando):
    uid = ndb.StringProperty()
    tel = ndb.StringProperty()
    cell = ndb.StringProperty()
    fax = ndb.StringProperty()
    email = ndb.StringProperty()
    website = ndb.StringProperty()
    
    def addContactDetails(self,contact):

        contact_details_request = ContactDetails.query(ContactDetails.uid == contact['uid'])
        contact_details_list = contact_details_request.fetch()

        if len(contact_details_list) > 0:
            contact_details = contact_details_list[0]
        else:
            contact_details = ContactDetails()

        contact_details.uid = contact['uid']
        contact_details.tel = contact['tel']
        contact_details.cell = contact['cell']
        contact_details.fax = contact['fax']
        contact_details.email = contact['email']
        contact_details.website = contact['website']
        contact_details.put()

        return contact_details
