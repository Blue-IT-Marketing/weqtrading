import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
template_env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.getcwd()))

class APIRouterHandler(webapp2.RequestHandler):

    def get(self):
        url_route = self.request.uri
        url_routes = url_route.split("/")
        
            
        pass

    def post(self):
        pass

app = webapp2.WSGIApplication([
    ('/api/.*', APIRouterHandler)


], debug=True)
