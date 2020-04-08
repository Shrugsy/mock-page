import json
from django.test import TestCase, Client
from rest_framework import status
from people.models import Person
from people.serializers import PersonSerializer


# Create your tests here.

# initialize the APIClient app
client = Client()

# CREATE/READ
class GetAllPeopleTestCase(TestCase):
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

    # VALID
    def test_get_all_people(self):
        # get API response
        response = client.get('/api/people/')
        # print(response.data)
        # print(response.status_code)

        # get data from db
        people = Person.objects.all()
        serializer = PersonSerializer(people, many=True)
        # print(serializer.data)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    # INVALID
    def test_invalid_parameters(self):
        response = client.get('/api/people/fakeparams')
        # print(response)
        # print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_301_MOVED_PERMANENTLY)
    
    def test_invalid_path(self):
        response=client.get('/api/fakepath/')
        # print(response)
        # print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class GetSinglePersonTest(TestCase):
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

    # VALID
    def test_get_valid_single_person(self):
        response = client.get(f"/api/people/{self.jane.pk}/")
        # print(response.data)
        # print(response.status_code)
        person = Person.objects.get(pk=self.jane.pk)
        serializer = PersonSerializer(person)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    # INVALID
    def test_get_invalid_single_person(self):
        response = client.get(f"/api/people/9999/")
        # print(response.data)
        # print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

# CREATE
class CreateNewPersonTest(TestCase):
    def setUp(self):
        self.valid_payload = {
            'firstname': 'Mark',
            'lastname': 'Markington',
            'email': 'mark@email.com',
            'age': 30,
            'income': 100000
        }
        self.invalid_payload = {
            'firstname': '',
            'lastname': 'Markington',
            'email': 'mark2@email.com',
            'age': 30,
            'income': 100000
        }

    # VALID
    def test_create_valid_person(self):
        response = client.post(
            '/api/people/', data=json.dumps(self.valid_payload), content_type='application/json')
        # print(response.data)
        # print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # INVALID
    def test_create_invalid_person(self):
        response = client.post(
            '/api/people/', data=json.dumps(self.invalid_payload), content_type='application/json')
        # print(response.data)
        # print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # INVALID
    def test_create_repeat_person(self):
        response = client.post(
            '/api/people/', data=json.dumps(self.valid_payload), content_type='application/json')
        # print(response.data)
        # print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = client.post(
            '/api/people/', data=json.dumps(self.valid_payload), content_type='application/json')
        # print(response.data)
        # print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

# UPDATE
class UpdateSinglePersonTest(TestCase):
    def setUp(self):
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
        self.valid_payload = {
            "firstname": "Mark",
            "lastname": "Markington",
            "email": "mark@newemail.com",
            "age": 31,
            "income": 120000
        }
        self.invalid_payload = {
            "firstname": "Mark",
            "lastname": "",
            "email": "mark@newemail.com",
            "age": 31,
            "income": 120000
        }
        self.invalid_payload_existing = {
            "firstname": "Mark",
            "lastname": "Markington",
            "email": "jane@email.com",
            "age": 31,
            "income": 120000
        }

    # VALID
    def test_valid_update_person(self):
        response = client.put(f"/api/people/{self.mark.pk}/", data=json.dumps(
            self.valid_payload), content_type='application/json')
        # print(response.data)
        # print(response.status_code)
        payloadWithID = self.valid_payload
        payloadWithID["id"] = self.mark.pk
        # print(payloadWithID)
        self.assertEqual(payloadWithID, response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # INVALID
    def test_invalid_update_person(self):
        response = client.put(f"/api/people/{self.mark.pk}/", data=json.dumps(
            self.invalid_payload), content_type='application/json')
        # print(response.data)
        # print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # INVALID
    def test_invalid_update_person_existing(self):
        # test attempting to change email of existing user to same email as another existing user
        response = client.put(f"/api/people/{self.mark.pk}/", data=json.dumps(
            self.invalid_payload_existing), content_type='application/json')
        # print(response.data)
        # print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

# DELETE
class DeleteSinglePersonTest(TestCase):
    def setUp(self):
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
    
    # VALID
    def test_valid_delete_person(self):
        response = client.delete(f"/api/people/{self.mark.pk}/")
        # print(response.data)
        # print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        # INVALID
        response1 = client.get(f"/api/people/{self.mark.pk}/")
        # print(response1.data)
        # print(response1.status_code)
        self.assertEqual(response1.status_code, status.HTTP_404_NOT_FOUND)
        

    # INVALID
    def test_invalid_delete_person(self):
        response = client.get(f"/api/people/9999/")
        # print(response.data)
        # print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        
        
        