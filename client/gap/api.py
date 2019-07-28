import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging,json
from contact import Contact
class APIRouterHandler(webapp2.RequestHandler):

    def get(self):
        url_route = self.request.uri
        url_routes = url_route.split("/")
        
            
        pass

    def post(self):
        url = self.request.uri
        route = url.split('/')
        
        if 'contact' in route:
            data = self.request.get('data')
            json_data = json.loads(data)
            logging.info(data)
            Contact.contact_id = ''
            Contact.names = json_data['names']
            Contact.cell = json_data['cell']
            Contact.email = json_data['email']
            Contact.subject = json_data['subject']
            Contact.message = json_data['message']
            Contact.put()

            




app = webapp2.WSGIApplication([
    ('/api/.*', APIRouterHandler)


], debug=True)
