from rest_framework import generics

from .models import Patient
from .serializers import PatientSerializer


class PatientListCreateAPIView(generics.ListCreateAPIView):

    queryset = Patient.objects.all()

    serializer_class = PatientSerializer


class PatientRetrieveUpdateDestroyAPIView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Patient.objects.all()

    serializer_class = PatientSerializer


