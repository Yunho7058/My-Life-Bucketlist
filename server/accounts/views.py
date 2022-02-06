from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import authentication, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from drf_spectacular.types import OpenApiTypes
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.
@extend_schema(
    request=UserSerializer,
    responses={
        201: None,
        400: None,
    },
    tags=['사용자'],
    summary='회원가입',
)
@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)
