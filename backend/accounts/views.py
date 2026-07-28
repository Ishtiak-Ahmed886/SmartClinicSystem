from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializers import (
    UserSerializer,
    PatientRegistrationSerializer,
)


class UserListAPIView(APIView):

    def get(self, request):

        users = User.objects.all()

        serializer = UserSerializer(
            users,
            many=True,
        )

        return Response(serializer.data)


class CurrentUserAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request):

        serializer = UserSerializer(
            request.user,
        )

        return Response(serializer.data)


class PatientRegistrationAPIView(
    generics.CreateAPIView
):

    serializer_class = PatientRegistrationSerializer   