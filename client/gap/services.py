

import os,logging,json,random,string
from google.appengine.ext import ndb


class Services (ndb.Expando):
    uid = ndb.StringProperty()
    id = ndb.StringProperty()
    category_id = ndb.StringProperty()
    service_name = ndb.StringProperty()
    seo_link = ndb.StringProperty()
    description = ndb.StringProperty()
    service_art = ndb.StringProperty()
    price = ndb.StringProperty()
    currency = ndb.StringProperty(default='zar')
    active = ndb.BooleanProperty(default=True)

    def create_seo_link(self,name):
        temp = ''
        char_list = name.split()
        for char in char_list:
            temp += char

        return temp

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
                this_service.seo_link = this_service.create_seo_link(name=this_service.service_name)
                this_service.service_art = service['service_art']
                this_service.price = service['price']
                this_service.uid = service['uid']
                this_service.description = service['description']

                this_service.put()
                return this_service


    def removeService(self,uid,id):

        services_request = Services.query(Services.uid == uid )
        services_list = services_request.fetch()

        for service in services_list:
            if (service.id == id):
                service.key.delete()

        return True

    def updateService(self,service):

        service_request = Services.query(Services.id == service['id'])
        service_list = service_request.fetch()

        for found_service in service_list:
            if (found_service.uid == service['uid']):
                found_service.category_id = service['category_id']
                found_service.service_name = service['service_name']
                found_service.description = service['description']
                found_service.service_art = service['service_art']
                found_service.price = service['price']
                found_service.currency = service['currency']
                found_service.put()
                return found_service
            else:
                pass
        return ''
