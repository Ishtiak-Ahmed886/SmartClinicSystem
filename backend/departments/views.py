from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics
from rest_framework.filters import OrderingFilter, SearchFilter
from core.mixins import ClinicQuerySetMixin
from core.create_mixins import ClinicCreateMixin

from .models import Department
from .serializers import DepartmentSerializer


class DepartmentListCreateAPIView( ClinicQuerySetMixin,ClinicCreateMixin,
generics.ListCreateAPIView):

    queryset = Department.objects.all()

    serializer_class = DepartmentSerializer
    clinic_field = "clinic"

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "clinic",
        "is_active",
    ]

    search_fields = [
        "name",
        "description",
        "clinic__name",
    ]

    ordering_fields = [
        "name",
        "created_at",
    ]

    ordering = [
        "name",
    ]

    
    


class DepartmentRetrieveUpdateDestroyAPIView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Department.objects.all()

    serializer_class = DepartmentSerializer