
import os,logging,json,random,string,datetime
from google.appengine.ext import ndb


class Transactions(ndb.Expando):
    uid = ndb.StringProperty() 
    id = ndb.StringProperty() 
    date = ndb.StringProperty()  
    amount = ndb.StringProperty()
    processed = ndb.BooleanProperty(default=False)
    transaction_type = ndb.StringProperty(default='deposit')
    deposit_slip_url = ndb.StringProperty(default='https://via.placeholder.com/300/09f/fff.png')


    def create_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))

    def addTransaction(self,transaction):  
        
        self.uid = transaction['uid']
        self.id = self.create_id()
        today = datetime.datetime.now()
        self.date = str(datetime.date(year=today.year,month=today.month,day=today.day))
        self.amount = transaction['amount']
        self.processed = transaction['processed'] == 'true'
        self.transaction_type = transaction['transaction_type']
        self.deposit_slip_url = transaction['deposit_slip_url']
        
        return self.put()

    def fetchTransactions(self,uid):

        transactions_requests = Transactions.query(Transactions.uid == uid)
        transactions_list = transactions_requests.fetch()

        return transactions_list

    
    def removeTransaction(self,id,uid):
        transactions_requests = Transactions.query(Transactions.uid == uid)
        transactions_list = transactions_requests.fetch()

        for transaction in transactions_list:
            if (transaction.id == id):
                transaction.key.delete()

        return self.fetchTransactions(uid)
