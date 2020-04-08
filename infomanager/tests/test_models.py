from django.test import TestCase
from people.models import Person

# Create your tests here.

class PersonTestCase(TestCase):
    def setUp(self):
        # Create some Persons to test with
        self.john = Person.objects.create(
            firstname="john",
            lastname="SMITH",
            email="john@smith.com",
            age=21,
            income=60000
        )
        self.jane = Person.objects.create(
            firstname="Jane",
            lastname="Doe",
            email="jane@email.com",
            age=18,
            income=40000
        )
        self.mark = Person.objects.create(
            firstname="Mark",
            lastname="Markington",
            email="mark@email.com",
            age=30,
            income=100000
        )

    def test_retrieving_Person(self):
        self.assertEqual(self.mark.firstname, "Mark")
        self.assertEqual(self.mark.lastname, "Markington")
        self.assertEqual(self.mark.email, "mark@email.com")
        self.assertEqual(self.mark.age, 30)
        self.assertEqual(self.mark.income, 100000)