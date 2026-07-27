from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics
from rest_framework.filters import OrderingFilter, SearchFilter

from .models import Clinic
from .serializers import ClinicSerializer


class ClinicListCreateAPIView(generics.ListCreateAPIView):

    queryset = Clinic.objects.all()

    serializer_class = ClinicSerializer

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "is_active",
        "subscription_plan",
    ]

    search_fields = [
        "name",
        "email",
        "phone",
        "address",
    ]

    ordering_fields = [
        "name",
        "created_at",
    ]

    ordering = [
        "name",
    ]


class ClinicRetrieveUpdateDestroyAPIView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Clinic.objects.all()

    serializer_class = ClinicSerializer