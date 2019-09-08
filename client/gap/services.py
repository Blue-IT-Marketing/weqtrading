

import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
import json
import random
import string


class Services (ndb.Expando):
    uid = ndb.StringProperty()
    id = ndb.StringProperty()
    category_id = ndb.StringProperty()
    service_name = ndb.StringProperty()
    description = ndb.StringProperty()
    service_art = ndb.StringProperty()
    price = ndb.StringProperty()
    currency = ndb.StringProperty(default='zar')

    def create_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))

    def addService(self,service):

            service_request = Services.query(Services.service_name == service['service_name'])
            service_list = service_request.fetch()

            if len(service_list) > 0:
                return ''
            else:
                this_service = Services()
                this_service.id = this_service.create_id()
                this_service.category_id = service['category_id']
                this_service.service_name = service['service_name']
                this_service.service_art = service['service_art']
                this_service.price = service['price']
                this_service.uid = service['uid']
                this_service.description = service['description']

                this_service.put()
                return this_service


    def removeService(self,uid,id):

        services_request = Services.query((Services.uid == uid) and (Services.id == id))
        services_list = services_request.fetch()

        for service in services_list:
            service.key.delete()

        return True
