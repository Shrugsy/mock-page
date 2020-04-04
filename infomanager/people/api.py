from people.models import Person
from rest_framework import viewsets, permissions
from .serializers import PersonSerializer

# Person Viewset
class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PersonSerializer