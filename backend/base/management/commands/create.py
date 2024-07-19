import random
from django.core.management.base import BaseCommand
from django.utils import timezone
from base.models import User, Booking, Message

class Command(BaseCommand):
    help = 'Generate random users, bookings, and messages for testing'

    def handle(self, *args, **kwargs):
        # Define the data
        names = [
            'Olivia', 'Liam', 'Noah', 'Emma', 'Ava', 'Elijah', 'Sophia',
            'Isabella', 'Mason', 'James', 'Harper', 'Amelia', 'Evelyn',
            'Jack', 'Henry', 'Lucas', 'Mia', 'Aiden', 'Chloe', 'William',
            'Benjamin', 'Charlotte', 'Sebastian', 'Alexander', 'Ella', 'Grace'
        ]
        majors = [
            'Computer Science', 'Business', 'Psychology', 'Biology',
            'Engineering', 'Art', 'History', 'Mathematics'
        ]
        bios = [
            'Living my best life and always chasing new adventures. Love coding and coffee!',
            'Dream big, work hard, stay focused, and surround yourself with good people.',
            'Making moves, breaking barriers, and setting new records every day!',
            'Here for a good time and to make every moment count. Passionate about technology.',
            'Just vibing and enjoying the journey called life. Avid reader and outdoor enthusiast.',
            'On the grind and never backing down from a challenge. Future entrepreneur in the making.'
        ]
        genders = ['Male', 'Female', 'Non-binary', 'Other']
        locations = ['Library', 'Cafe', 'Park', 'Campus', 'Virtual']
        titles = ['Study Session', 'Project Meeting', 'Coffee Chat', 'Brainstorming']
        descriptions = [
            'Getting together to discuss the upcoming project in detail and ensure everyone is on the same page.',
            'Casual meet-up to talk about coursework, share ideas, and help each other understand difficult concepts.',
            'Brainstorming session for the new assignment where we can exchange creative ideas and approaches.',
            'Group study for the upcoming exams, aiming to review key topics and practice past papers together.'
        ]
        contents = [
            'Hey, looking forward to our meeting! Let’s make it productive.',
            'Can we reschedule to another time that suits everyone better?',
            'I have some ideas to discuss that might help us with the project.',
            'What time works for everyone? Let’s finalize the schedule.',
            'Don’t forget to bring your notes and any reference materials!',
            'I’ll be a bit late, but I’ll catch up once I’m there. Thanks for understanding!'
        ]

        # Generate users
        for name in names:
            user = User.objects.create_user(
                username=name.lower(),
                password='password123',
                age=random.randint(18, 25),
                gender=random.choice(genders),
                major=random.choice(majors),
                bio=random.choice(bios),
                year=random.randint(1, 4)
            )
            print(f'Created user: {user.username}')

        # Generate bookings
        users = list(User.objects.all())
        for _ in range(20):
            owner = random.choice(users)
            meeting_time = timezone.now() + timezone.timedelta(days=random.randint(1, 30))

            booking = Booking.objects.create(
                owner=owner,
                location=random.choice(locations),
                title=random.choice(titles),
                meeting_time=meeting_time,
                description=random.choice(descriptions)
            )
            # Adding random members to the booking
            members = random.sample(users, k=random.randint(1, 5))
            booking.members.set(members)
            print(f'Created booking: {booking.title} at {booking.location} by {booking.owner.username}')

        # Generate messages
        bookings = list(Booking.objects.all())
        for _ in range(100):
            author = random.choice(users)
            booking = random.choice(bookings)
            content = random.choice(contents)

            message = Message.objects.create(
                author=author,
                booking=booking,
                content=content
            )
            print(f'Created message: {message.content} by {message.author.username} for booking at {message.booking.location}')
