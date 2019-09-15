
import os
from google.appengine.ext import ndb
import logging
import datetime



class Store (ndb.Expando):
    uid = ndb.StringProperty()
    store_name = ndb.StringProperty()
    company_name = ndb.StringProperty()
    description = ndb.StringProperty()
    physical_address = ndb.StringProperty()
    tel = ndb.StringProperty()
    cell = ndb.StringProperty()
    email = ndb.StringProperty()
    website = ndb.StringProperty()


    def addStore(self,store):

        store_requests = Store.query(Store.uid == store['uid'])
        store_list = store_requests.fetch()

        if len(store_list) > 0:
            this_store = store_list[0]
        else:
            this_store = Store()
        this_store.uid = store['uid']
        this_store.store_name = store['store_name']
        this_store.company_name = store['company_name']
        this_store.description = store['description']
        this_store.physical_address = store['physical_address']
        this_store.tel = store['tel']
        this_store.cell = store['cell']
        this_store.email = store['email']
        this_store.website = store['website']
        this_store.put()

        return this_store

    def removeStore(self,uid):

        store_requests = Store.query(Store.uid == uid)
        store_list = store_requests.fetch()

        for store in store_list:
            store.key.delete()

        return True

    def updateStore(self,store):
        return self.addStore(store)

    def fetchStores(self):

        stores_requests = Store.query()
        stores_list = stores_requests.fetch()

        return stores_list

    def getStore(self,uid):
        stores_requests = Store.query(Store.uid == uid)
        stores_list = stores_requests.fetch()

        if len(stores_list) > 0:
            return stores_list[0]
        else:
            return ''


    

