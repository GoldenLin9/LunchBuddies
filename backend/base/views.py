from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.views import APIView
from rest_framework import permissions

from .serializers import BookingSerializer, UserSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework import permissions

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework_simplejwt.authentication import JWTAuthentication

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
    
    authentication_classes = (JWTAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Booking.objects.all()
    

    def post(self, request):

        booking = Booking.objects.get(id=request.data['id'])
        booking.members.add(request.user)
        return HttpResponse("User joined", status=201)


class Leave(APIView):

    authentication_classes = (JWTAuthentication)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Booking.objects.all()
    

    def post(self, request):

        booking = Booking.objects.get(id=request.data['id'])
        booking.members.remove(request.user)
        return HttpResponse("User left", status=201)
    

class Books(APIView):

    # authentication_classes = (JWTAuthentication)
    # permission_classes = (permissions.IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        return Booking.objects.all()
    
    def get(self, request):

        booking = self.get_queryset()
        serializer = BookingSerializer(booking, many=True)
        return HttpResponse(serializer.data, status=200)
    
    

class Book(APIView):

    authentication_classes = (JWTAuthentication)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Booking.objects.all()
    
    def get(self, request, pk):
        booking = self.get_queryset().filter(pk = pk)
        serializer = BookingSerializer(booking, many=False)
        return HttpResponse(serializer.data, status=200)

    def post(self, request):
        owner = request.user
        location = request.data['location']
        meeting_time = request.data['meeting_time']
        members = request.data['members']
        description = request.data['description']

        booking = Booking(owner=owner, location=location, meeting_time=meeting_time, description=description)
        booking.save()

        booking.members.set(members)

        return HttpResponse("Booking created", status=201)

        # serializer = BookingSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return HttpResponse("Booking created", status=201)
        # else:
        #     return HttpResponse("Booking not created", status=400)

    def put(self, request):
        booking = Booking.objects.get(id=request.data['id'])


        if booking.owner != request.user:
            return HttpResponse("You are not the owner of this booking", status=403)

        serializer = BookingSerializer(booking, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse("Booking updated", status=200)
        else:
            return HttpResponse("Booking not updated", status=400)
        
    def delete(self, request):
        booking = Booking.objects.get(id=request.data['id'])

        if booking.owner != request.user:
            return HttpResponse("You are not the owner of this booking", status = 403)
        
        booking.delete()
        return HttpResponse("Booking deleted", status=200)



class RegisterView(APIView):

    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        return User.objects.all()
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse("User created", status=201)
        else:
            return HttpResponse("User not created", status=400)