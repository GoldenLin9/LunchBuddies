import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from base.models import Message, Booking, User


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)

        print("MYYYY INFOOOO: ", text_data_json)
        message = text_data_json["message"]
        room_id = text_data_json['room_id']
        authorID = text_data_json['author']



        user = User.objects.get(id=authorID)

        print("USER: ", user)

        message_obj = Message.objects.create(
            author=user,
            content=message,
            booking=Booking.objects.get(id=room_id)
        )

        message_obj.save()

        print("RECEIVED: ", message)

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat_message", "content": message, "author": user.username}
        )
    
    def chat_message(self, event):
        print("MY EVENT: ", event)
        message = event["content"]
        author = event["author"]

        self.send(text_data=json.dumps({"message": message, "author": author}))