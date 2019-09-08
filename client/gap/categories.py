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

    def addCategory(self,category):
        category_requests = Categories.query((Categories.category_name == category['category_name']) and (
            Categories.sub_category == category['sub_category']))
        categories_list = category_requests.fetch()
        
        if len(categories_list) > 0:
            return ''
        else:
            self.category_id = self.create_id()
            self.category_type = category['category_type']
            self.sub_category = category['sub_category']
            self.category_name = category['category_name']
            self.description = category['description']
            self.notes = category['notes']
            self.category_art = category['category_art']
            self.put()
            return self

    def removeCategory(self,category_id):
        category_request = Categories.query(Categories.category_id == category_id)
        category_list = category_request.fetch()

        cat_found = False
        for category in category_list:
            cat_found = True
            category.key.delete()

        return cat_found
