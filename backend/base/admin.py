from django.contrib import admin

# Register your models here.
from .models import Booking, User

class MyUserAdmin(admin.ModelAdmin):
    model = User
    list_display = ['username', 'email', 'age', 'major', 'bio', 'year']


admin.site.register(User, MyUserAdmin)
admin.site.register(Booking)