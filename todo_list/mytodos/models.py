from django.db import models

from django.contrib.auth.models import User

# Create your models here.

class Task(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    title = models.CharField(max_length=300)

    description = models.TextField(null=True, blank=True)

    completed = models.BooleanField(default=False)

    date_created = models.DateTimeField(auto_now_add=True)


    class Meta:

        ordering = ['completed']


    def __str__(self):

        return self.title
    

    