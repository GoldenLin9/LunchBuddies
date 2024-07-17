from django.contrib import admin
from django.urls import path, include
from . import views

from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path("", views.test, name="test"),
    path("book/<int:pk>", views.Book.as_view(), name="book"),
    path("books/", views.Books.as_view(), name="books"),
    path("join/", views.Join.as_view(), name="join"),
    path("leave/", views.Leave.as_view(), name="leave"),

    path("register/", views.RegisterView.as_view(), name="register"),

    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]