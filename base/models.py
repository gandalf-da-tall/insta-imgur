from django.db import models
from django.contrib.auth.models import User
# Create your models for post and comments


class Post(models.Model):
    title = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,default='/placeholder.png')
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.comment)
