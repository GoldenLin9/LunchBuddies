from django.contrib import admin
from django.urls import path, include
from . import views

from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path("", views.test, name="test"),
    path("book/<int:pk>", views.Book.as_view(), name="get-book"),
    path("book/", views.Book.as_view(), name = "book"),

    path("create/", views.Create.as_view(), name="create"),

    path("myBooks/", views.Books.as_view(), name="books"),
    path("allBooks/", views.AllBooks.as_view(), name = "all-books"),

    path("chat/messages/<int:pk>", views.Messages.as_view(), name="messages"),

    path("join/", views.Join.as_view(), name="join"),
    path("leave/", views.Leave.as_view(), name="leave"),

    path("register/", views.RegisterView.as_view(), name="register"),

    path("user/", views.UserView.as_view(), name="update-user"),

    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]