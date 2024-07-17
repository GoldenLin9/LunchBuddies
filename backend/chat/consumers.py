import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from base.models import Message, Booking


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
        message = text_data_json["message"]
        room_id = text_data_json['room_id']

        message_obj = Message.objects.create(
            author=self.scope['user'],
            content=message,
            booking=Booking.objects.get(id=room_id)
        )

        message_obj.save()

        print("RECEIVED: ", message)

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat_message", "content": message}
        )
    
    def chat_message(self, event):
        message = event["content"]

        self.send(text_data=json.dumps({"message": message}))