from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics
from rest_framework.filters import OrderingFilter, SearchFilter

from core.mixins import ClinicQuerySetMixin
from core.create_mixins import ClinicCreateMixin

from .models import Doctor
from .serializers import DoctorSerializer


class DoctorListCreateAPIView(
    ClinicQuerySetMixin,
    ClinicCreateMixin,
    generics.ListCreateAPIView,
):

    queryset = Doctor.objects.all()

    serializer_class = DoctorSerializer

    clinic_field = "clinic"

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "department",
        "is_available",
    ]

    search_fields = [
        "user__first_name",
        "user__last_name",
        "user__username",
        "specialization",
    ]

    ordering_fields = [
        "consultation_fee",
        "experience",
    ]

    ordering = [
        "id",
    ]


class DoctorRetrieveUpdateDestroyAPIView(
    ClinicQuerySetMixin,
    generics.RetrieveUpdateDestroyAPIView,
):

    queryset = Doctor.objects.all()

    serializer_class = DoctorSerializer

    clinic_field = "clinic"

   