import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
import json
import random
import string
import datetime


class Banking(ndb.Expando):
    banking_id = ndb.StringProperty()
    account_holder= ndb.StringProperty()
    bank_name= ndb.StringProperty()
    account_number= ndb.StringProperty()
    branch_code= ndb.StringProperty()
    is_admin_account = ndb.BooleanProperty(default=False)

    def create_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))


    def addAdminBank(self,banking_details):
        try:
            this_bank = Banking()
            this_bank.banking_id = this_bank.create_id()
            this_bank.account_holder = banking_details['account_holder']
            this_bank.bank_name = banking_details['bank_name']
            this_bank.account_number = banking_details['account_number']
            this_bank.branch_code = banking_details['branch_code']
            this_bank.is_admin_account = True
            this_bank.put()
            return this_bank
        except:
            return ''

    def deleteBanking(self,banking_id):
        try:
            request_query = Banking.query(Banking.banking_id == banking_id)
            banking_list = request_query.fetch()
            is_deleted = False
            for bank in banking_list:
                bank.key.delete()
                is_deleted = True

            return is_deleted
        except:
            return False