from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.views import APIView
from rest_framework import permissions

from .serializers import BookingSerializer, UserSerializer, MessageSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework import permissions

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework.response import Response

from .models import Booking, User, Message

from django.db.models import Q

from django.views.decorators.csrf import csrf_exempt


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

        booking = Booking.objects.get(id=request.data['book_id'])
        booking.members.add(request.user)
        return HttpResponse("User joined", status=201)


class Leave(APIView):

    authentication_classes = (JWTAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Booking.objects.all()
    

    def post(self, request):

        booking = Booking.objects.get(id=request.data['book_id'])
        booking.members.remove(request.user)
        return HttpResponse("User left", status=201)
    

class Books(APIView):

    authentication_classes = (JWTAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Booking.objects.all()
    
    def get(self, request):

        booking = self.get_queryset().filter(Q(members__in=[request.user]) | Q(owner = request.user)).distinct()


        serializer = BookingSerializer(booking, many=True)
        return HttpResponse(serializer.data, status=200)

class AllBooks(APIView):

    authentication_classes = (JWTAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Booking.objects.all()
    

    def get(self, request):

        booking = self.get_queryset()

        serializer = BookingSerializer(booking, many = True)
        return HttpResponse(serializer.data, status = 200)


class Create(APIView):

    authentication_classes = (JWTAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Booking.objects.all()
    
    def post(self, request):
        owner = request.user
        title = request.data['title']
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



class Book(APIView):

    authentication_classes = (JWTAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Booking.objects.all()
    
    def get(self, request, pk):
        print("GETTING A BOOK")
        booking = self.get_queryset().filter(pk = pk).first()
        serializer = BookingSerializer(booking)
        return Response(serializer.data, status=200)

    def post(self, request):
        print("ENTERED")
        owner = request.user
        print(owner)
        location = request.data['location']
        meeting_time = request.data['meeting_time']
        members = request.data['members']
        description = request.data['description']

        booking = Booking(owner=owner, location=location, meeting_time=meeting_time, description=description)
        booking.save()

        booking.members.set(members)

        return Response("Booking created", status=201)

        # serializer = BookingSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return HttpResponse("Booking created", status=201)
        # else:
        #     return HttpResponse("Booking not created", status=400)

    def put(self, request, pk):
        booking = Booking.objects.get(id = pk)


        if booking.owner != request.user:
            return Response("You are not the owner of this booking", status=403)

        serializer = BookingSerializer(booking, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("Booking updated", status=200)
        else:
            return Response("Booking not updated", status=400)
        
    def delete(self, request, pk):
        booking = Booking.objects.get(id=pk)

        if booking.owner != request.user:
            return Response("You are not the owner of this booking", status = 403)
        
        booking.delete()
        return Response("Booking deleted", status=200)



class RegisterView(APIView):

    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        return User.objects.all()
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("User created", status=201)
        else:
            return Response("User not created", status=400)

class Messages(APIView):

    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def get_queryset(self):
        return Message.objects.all()
    
    def get(self, request, pk):
        booking = Booking.objects.get(id=pk)
        messages = self.get_queryset().filter(booking=booking)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status=200)
    
class UserView(APIView):

    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def get_queryset(self):
        return User.objects.all()
    
    
    def put(self, request):
        user = User.objects.get(id=request.user.id)
        user.age = request.data['age']
        user.major = request.data['major']
        user.bio = request.data['bio']
        user.year = request.data['year']
        user.save()

        return Response("User updated", status=200)

        
    def delete(self, request):
        user = User.objects.get(id=request.user.id)
        user.delete()
        return Response("User deleted", status=200)
    
    def get(self, request):
        user = User.objects.get(id=request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=200)
    
class GetUserView(APIView):

    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def get_queryset(self):
        return User.objects.all()
    
    def get(self, request, pk):
        user = User.objects.get(id=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=200)