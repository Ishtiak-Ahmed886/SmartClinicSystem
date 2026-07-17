from rest_framework import generics

from .models import Doctor
from .serializers import DoctorSerializer


class DoctorListCreateAPIView(generics.ListCreateAPIView):

    queryset = Doctor.objects.all()

    serializer_class = DoctorSerializer

    search_fields = [
        "user__first_name",
        "user__last_name",
        "user__username",
        "specialization",
    ]

    filterset_fields = [
        "department",
    ]

    ordering_fields = [
        "consultation_fee",
        "experience",
    ]

    ordering = [
        "id",
    ]


class DoctorRetrieveUpdateDestroyAPIView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Doctor.objects.all()

    serializer_class = DoctorSerializer