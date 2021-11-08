from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers
from .products import products
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Post, Comment
from .serailizers import PostSerializer
from rest_framework import status

routes = [
  '/api/upload/',

  '/api/posts/',
  '/api/posts/<id>/',
  '/api/posts/<id>/comments/',
]
@api_view(['GET'])
def getRoutes(request):
  return Response(routes)

@api_view(['GET'])
def getPosts(request):
  posts = Post.objects.all()
  serializer = PostSerializer(posts, many=True)
  return Response(serializer.data)

@api_view(['GET'])
def getPost(request, pk):
  post = Post.objects.get(_id=pk)
  serializer = PostSerializer(post, many=False)
  return Response(serializer.data)

# allowed file function so that we only get images
ALLOWED_EXTENSIONS = { 'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and \
    filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS  

@api_view(['POST'])
def createPost(request):
  data = request.data
  uploaded_img = request.FILES.get('image')

  if(allowed_file(uploaded_img.name)):
    if(len(data['title']) > 0 and len(data['title']) < 200 ):
      post = Post.objects.create(
      title=data['title']
      )
      upload_post = Post.objects.get(_id=post._id)
      upload_post.image = request.FILES.get('image')
      upload_post.save()
      serializer = PostSerializer(post, many=False)
      return Response(serializer.data)
    else:
      content = {'detail': 'Please check the character limit for your title'}
      return Response(content, status=status.HTTP_400_BAD_REQUEST)
      
  else:
    content = {'detail': 'You can only upload Jpg, Jpeg, Png, or Gif'}
    return Response(content, status=status.HTTP_400_BAD_REQUEST)
  
  



@api_view(['POST'])
def createPostComment(request, pk):    
    post = Post.objects.get(_id=pk)
    data = request.data

    if(len(data['comment']) > 0 and len(data['comment']) < 200 ):
      comment = Comment.objects.create(        
        post=post,
        comment=data['comment'],
      )
      return Response('Comment Added')
    else:
      content = {'detail': 'Please check the character limit of your comment'}
      return Response(content, status=status.HTTP_400_BAD_REQUEST)
  
    
