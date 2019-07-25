
import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
import datetime
template_env = jinja2.Environment(
loader=jinja2.FileSystemLoader(os.getcwd()))
import plivohelper
import plivo
from twilio import *


class SMS(ndb.Expando):

    auth_id = "MAMTKWZGMYZDIWNJI3ZD"
    auth_token = "MjUwNzUzYjc2MGNjMjNmMDdmNGY3YmEyMTA4YTE3"
    smsURL = "https://api.plivo.com/v1/Account/MAMTKWZGMYZDIWNJI3ZD/Message/"

    p = plivo.RestAPI(auth_id, auth_token)

    params = {
        'src': '27790471558', # Sender's phone number with country code
        'dst' : '27790471559', # Receiver's phone Number with country code
        'text' : u"Hello, this is plivo talking to you hello master?", # Your SMS Text Message - English
        'url' : "https://api.plivo.com/v1/Account/MAMTKWZGMYZDIWNJI3ZD/Message/", # The URL to which with the status of the message is sent
        'method' : 'POST' # The method used to call the url
    }

    def sendSMS(self,dst,text):
        try:
            destination = str(dst)
            message = str(text)
            message = message.strip()
            if destination.isdigit() and (len(destination) >= 10) and not(message == None):

                context = {'src': '27790471559', 'dst': destination , 'text': message, 'url': self.smsURL,'method':'post'}
                response = self.p.send_message(context)
                return response
            else:
                return None
        except:
            return None

class SendSMSHandler(webapp2.RequestHandler):
    smsURL = "https://api.plivo.com/v1/Account/MAMTKWZGMYZDIWNJI3ZD/Message/"
    def get(self):
        try:
            strCellNumber = self.request.get('vstrToNumber')
            self.response.write("Sending SMS To : " + strCellNumber)
            strSMSSubject = self.request.get('strSMSSubject')
            strSMSBody = self.request.get('strSMSBody')

            context = {'src': '27790471558', 'dst': strCellNumber, 'text': strSMSSubject + " -- " + strSMSBody ,'url': self.smsURL,'method':'post'}


            vstrSMS = SMS()
            response = self.request.get(context)
            if not(response == None):
                self.response.write(response)
            else:
                self.response.write("There is an Error Sending Message")
        except:
            self.response.write("Fatal Error Sending SMS Message")

class SentSMSHandler(webapp2.RequestHandler):
    pass
class ReplySMSHandler(webapp2.RequestHandler):
    pass

app = webapp2.WSGIApplication([
    ('/send_sms', SendSMSHandler,),
     ('/sentsms', SentSMSHandler),
    ('/replysms', ReplySMSHandler)
], debug=True)