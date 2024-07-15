from rest_framework import serializers
from .models import Booking, User


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
    
    def create(self, validated_data):
        members = validated_data.pop('members')
        booking = Booking.objects.create(**validated_data)
        booking.members.set(members)
        return booking

