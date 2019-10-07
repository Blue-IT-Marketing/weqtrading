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



# TODO create a cron job to send sms messages to my api
# TODO or try the scheduler the one where i can schedule a job
# TODO to be sent after

class SMSMessage (ndb.Expando):
    id = ndb.StringProperty() 
    uid = ndb.StringProperty() 
    message = ndb.StringProperty() 
    from_cell = ndb.StringProperty()
    from_cell = ndb.StringProperty()
    date_created = ndb.StringProperty() 
    scheduled_datetime = ndb.StringProperty()
    date_time_sent = ndb.StringProperty()
    delivered = ndb.BooleanProperty(default=False) 

    def create_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))

    def addSMSmessage(self,sms_message):
        
        this_message = SMSMessage()
        this_message.id = self.create_id()
        this_message.uid = sms_message['uid']
        this_message.message = sms_message['message']
        this_message.to_cell = sms_message['to_cell']
        this_message.from_cell = sms_message['from_cell']
        today = datetime.datetime.now()

        this_message.date_created = str(datetime.date(year=today.year,month=today.month,day=today.day))
        this_message.scheduled_datetime = str(today)

        this_message.put()

        return this_message


class SMSBalances(ndb.Expando):
    uid = ndb.StringProperty()
    total_sms = ndb.StringProperty(default='0')
    free_sms = ndb.StringProperty(default='0')
    sms_value = ndb.StringProperty(default='0')

    
    # balances will be synced with those in sasms api
    def checkBalances(self,uid):

        this_request = SMSBalances.query(SMSBalances.uid == uid)
        this_balances_list = this_request.fetch()

        if len(this_balances_list) > 0:
            this_balance = this_balances_list[0]

            return this_balance
        else:
            return SMSBalances()


    def addBalance(self,uid,total_sms,sms_value):
        this_request = SMSBalances.query(SMSBalances.uid == uid)
        this_balances_list = this_request.fetch()

        if (len(this_balances_list) > 0):
            this_balance = this_balances_list[0]
        else:
            this_balance = SMSBalances()
        
        this_balance.uid = uid
        this_balance.total_sms = str(int(this_balance.total_sms) + int(total_sms))
        this_balance.sms_value = str(int(this_balance.sms_value) + int(sms_value))
        this_balance.put()

        return this_balance

    # a call back from calling send sms should call this function to subtract credit for every successfull message
    def subTractBalance(self,uid,total_sms,sms_value):
        this_request = SMSBalances.query(SMSBalances.uid == uid)
        this_balances_list = this_request.fetch()

        if (len(this_balances_list) > 0):
            this_balance = this_balances_list[0]
        else:
            this_balance = SMSBalances()

        this_balance.uid = uid
        this_balance.total_sms = str(int(this_balance.total_sms) - int(total_sms))
        this_balance.sms_value = str(int(this_balance.sms_value) - int(sms_value))
        this_balance.put()


class SMSBundles(ndb.Expando):
    id = ndb.StringProperty()
    name = ndb.StringProperty()
    description = ndb.StringProperty()
    total_sms = ndb.StringProperty(default='0')
    purchase_price = ndb.StringProperty(default='0')

    def create_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))

    def addBundle(self,bundle):

        this_bundle = SMSBundles()        
        this_bundle.id = self.create_id()
        this_bundle.name = bundle['name']
        this_bundle.description = bundle['description']
        this_bundle.total_sms = bundle['total_sms']
        this_bundle.purchase_price = bundle['purchase_price']
        this_bundle.put()
        return this_bundle

    def removeBundle(self,id):

        bundle_requests = SMSBundles.query(SMSBundles.id == id)
        bundle_list = bundle_requests.fetch()
        isdeleted = False
        for bundle in bundle_list:
            bundle.key.delete()
            isdeleted = True

        return isdeleted

    def fetchBundles(self):

        bundles_query = SMSBundles.query()
        bundles_list = bundles_query.fetch()
        return bundles_list


class SMSPayments(ndb.Expando):
    uid = ndb.StringProperty()
    id = ndb.StringProperty()
    bundle_id = ndb.StringProperty()
    payment_method = ndb.StringProperty()
    payment_amount = ndb.StringProperty()
    payment_date = ndb.StringProperty()
    payment_time = ndb.StringProperty()
    approved = ndb.BooleanProperty(default=False)


    def create_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))


    
    def addPayment(self,payment):
        return payment


class ContactLists(ndb.Expando):
    uid = ndb.StringProperty()
    id = ndb.StringProperty() 
    name = ndb.StringProperty()  
    description = ndb.StringProperty() 
    total_contacts = ndb.StringProperty(default='0') 

    def create_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))


    def addList(self,contact_list):

        this_contact_list = ContactLists()
        this_contact_list.uid = contact_list['uid']
        this_contact_list.id = self.create_id()
        this_contact_list.name = contact_list['name']
        this_contact_list.description = contact_list['description']
        this_contact_list.total_contacts = contact_list['total_contacts']
        this_contact_list.put()

        return this_contact_list

    def getContactList(self,uid):

        contact_list_query = ContactLists.query(ContactLists.uid == uid)
        contacts_list = contact_list_query.fetch()
        return contacts_list


class SMSContacts(ndb.Expando):
    # SMS Contact ID
    id = ndb.StringProperty()
    uid = ndb.StringProperty()
    list_id = ndb.StringProperty()
    list_name = ndb.StringProperty()
    name = ndb.StringProperty() 
    surname = ndb.StringProperty()
    relationship = ndb.StringProperty()
    tel = ndb.StringProperty()
    cell = ndb.StringProperty()
    email = ndb.StringProperty()

    def addContact(self,contact):
        contacts_query = SMSContacts.query(SMSContacts.cell == contact['cell'])
        contacts_list = contacts_query.fetch()
        if len(contacts_list) > 0:
            return ''
        else:
            contacts = SMSContacts()
            contacts.id = contact['id']
            contacts.uid = contact['uid']
            contacts.list_id = contact['list_id']
            contacts.list_name = contact['list_name']
            contacts.name = contact['name']
            contacts.surname = contact['surname']
            contacts.relationship = contact['relationship']
            contacts.tel = contact['tel']
            contacts.cell = contact['cell']
            contacts.email = contact['email']
            contacts.put()
        
        return contact

    def getContactByListName(self,list_name):

        contacts_query = SMSContacts.query(SMSContacts.list_name == list_name)
        return contacts_query.fetch()

    def fetchContactsByListID(self,id):
        contacts_query = SMSContacts.query(SMSContacts.list_id == id)
        return contacts_query.fetch()
            

    def getContactsByContactID(self,id):

        contacts_query = SMSContacts.query(SMSContacts.id == id)
        return contacts_query.fetch()

    def getContactsByUserID(self,uid):
        contacts_query = SMSContacts.query(SMSContacts.uid == uid)
        return contacts_query.fetch()


        



