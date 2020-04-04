from django.db import models

# Create your models here.
class Person(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    age = models.IntegerField()
    income = models.IntegerField()
