import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import json
import logging



class ChatUsers(ndb.Expando):
    chat_id = ndb.StringProperty()
    author = ndb.StringProperty()

    def getChatUsers(self,chat_id):

        chat_users_query = ChatUsers.query(ChatUsers.chat_id == chat_id)
        chat_users = chat_users_query.fetch()

        return chat_users

class ChatMessages(ndb.Expando):
    message_id = ndb.StringProperty()
    chat_id = ndb.StringProperty()
    author = ndb.StringProperty()
    message = ndb.StringProperty()
    timestamp = ndb.StringProperty()
    attachments = ndb.StringProperty()


    def getChatMessages(self,chat_id):

        chat_messages_query = ChatMessages.query(ChatMessages.chat_id == chat_id)
        chat_messages = chat_messages_query.fetch()

        return chat_messages

    
class ChatRoom (ndb.Expando):
    chat_id = ndb.StringProperty()
    created_by = ndb.StringProperty()    


    def getChatRoom(self,chat_id):

        chat_room_query = ChatRoom.query(ChatRoom.chat_id == chat_id)
        chat_rooms = chat_room_query.fetch()
        if len(chat_rooms) > 0:
            chat_room = chat_rooms[0]
        else:
            chat_room = ''

        return chat_room
