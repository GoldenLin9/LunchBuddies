from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.views import APIView
from rest_framework import permissions

from .serializers import BookingSerializer

from .models import Booking, User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['age'] = user.age
        token['major'] = user.major
        token['bio'] = user.bio
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.

def test(request):
    return HttpResponse("Hello, world!")


class Join(APIView):
    
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        return Booking.objects.all()
    

    def post(self, request):

        booking = Booking.objects.get(id=request.data['id'])
        user = User.objects.get(id=request.data['user_id'])
        booking.members.add(user)
        return HttpResponse("User joined", status=201)


class Leave(APIView):

    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        return Booking.objects.all()
    

    def post(self, request):

        print(request.data)

        booking = Booking.objects.get(id=request.data['id'])
        user = User.objects.get(id=request.data['user_id'])
        booking.members.remove(user)
        return HttpResponse("User left", status=201)

class Book(APIView):

    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        return Booking.objects.all()
    
    def get(self, request):
        booking = self.get_queryset().filter(pk = request.data['id'])
        serializer = BookingSerializer(booking, many=True)
        return HttpResponse(serializer.data, status=200)

    def post(self, request):

        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse("Booking created", status=201)
        else:
            return HttpResponse("Booking not created", status=400)

    def put(self, request):
        booking = Booking.objects.get(id=request.data['id'])
        serializer = BookingSerializer(booking, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse("Booking updated", status=200)
        else:
            return HttpResponse("Booking not updated", status=400)
        
    def delete(self, request):
        booking = Booking.objects.get(id=request.data['id'])
        booking.delete()
        return HttpResponse("Booking deleted", status=200)

