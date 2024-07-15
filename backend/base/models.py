from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    age = models.PositiveIntegerField(null=True, blank=True)
    major = models.CharField(max_length=100, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    year = models.PositiveIntegerField(null=True, blank=True)
    blocked_users = models.ManyToManyField('self', blank=True)


class Booking(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=100)
    
    meeting_time = models.DateTimeField()
    members = models.ManyToManyField(User, related_name='members')
    description = models.TextField()

    def __str__(self):
        return f"{self.owner.username} - {self.location} - {self.meeting_time} - {self.description}"
    
    