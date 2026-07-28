from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from core.mixins import ClinicQuerySetMixin

from .models import Patient
from .serializers import PatientSerializer


class PatientListCreateAPIView(
    ClinicQuerySetMixin,
    generics.ListCreateAPIView,
):

    queryset = Patient.objects.all()

    serializer_class = PatientSerializer

    permission_classes = [
        IsAuthenticated,
    ]

    clinic_field = "user__clinic"


class PatientRetrieveUpdateDestroyAPIView(
    ClinicQuerySetMixin,
    generics.RetrieveUpdateDestroyAPIView,
):

    queryset = Patient.objects.all()

    serializer_class = PatientSerializer

    permission_classes = [
        IsAuthenticated,
    ]

    clinic_field = "user__clinic"


