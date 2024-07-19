import random
from django.utils import timezone
from base.models import User, Booking, Message

# Define the data
names = [
    'Olivia', 'Liam', 'Noah', 'Emma', 'Ava', 'Elijah', 'Sophia',
    'Isabella', 'Mason', 'James', 'Harper', 'Amelia', 'Evelyn',
    'Jack', 'Henry', 'Lucas', 'Mia', 'Aiden'
]
majors = [
    'Computer Science', 'Business', 'Psychology', 'Biology',
    'Engineering', 'Art', 'History', 'Mathematics'
]
bios = [
    'Living my best life.', 'Dream big!', 'Making moves.',
    'Here for a good time.', 'Just vibing.', 'On the grind.'
]
genders = ['Male', 'Female', 'Non-binary', 'Other']
locations = ['Knightros', '63 South']
titles = ['Study Session', 'Project Meeting', 'Coffee Chat', 'Brainstorming']
descriptions = [
    'Getting together to discuss the upcoming project.',
    'Casual meet-up to talk about coursework.',
    'Brainstorming session for the new assignment.',
    'Group study for the upcoming exams.'
]
contents = [
    'Hey, looking forward to our meeting!',
    'Can we reschedule?',
    'I have some ideas to discuss.',
    'What time works for everyone?',
    'Don’t forget to bring your notes!',
    'I’ll be a bit late.'
]

# Generate users
for _ in range(50):
    user = User.objects.create_user(
        username=f'user_{random.randint(1000, 9999)}',
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
