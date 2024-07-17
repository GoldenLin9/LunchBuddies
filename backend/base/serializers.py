from rest_framework import serializers
from .models import Booking, User, Message


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
    
    def create(self, validated_data):
        members = validated_data.pop('members')
        booking = Booking.objects.create(**validated_data)
        booking.members.set(members)
        return booking


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
    
    def create(self, validated_data):
        return Message.objects.create(**validated_data)