from django.urls import path
from . import views

urlpatterns = [
  path('',views.getRoutes, name="routes"),
  path('upload/',views.createPost, name="post-create"),
  path('posts/',views.getPosts, name="posts"),
  
  path('posts/<str:pk>/',views.getPost, name="post"),
  path('posts/<str:pk>/comments/',views.createPostComment, name="comments"),
]