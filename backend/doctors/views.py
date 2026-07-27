from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics
from rest_framework.filters import OrderingFilter, SearchFilter

from .models import Doctor
from .serializers import DoctorSerializer


class DoctorListCreateAPIView(generics.ListCreateAPIView):

    queryset = Doctor.objects.all()

    serializer_class = DoctorSerializer

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "clinic",
        "department",
        "is_available",
    ]

    search_fields = [
        "user__first_name",
        "user__last_name",
        "user__username",
        "specialization",
    ]

    filterset_fields = [
        "department",
        "user__clinic",
    ]

    ordering_fields = [
        "consultation_fee",
        "experience",
    ]

    ordering = [
        "id",
    ]

    def get_queryset(self):

        queryset = Doctor.objects.all()
        clinic = self.request.query_params.get("clinic")
        department = self.request.query_params.get("department")
        if clinic:
            queryset = queryset.filter(clinic_id=clinic)
        if department:
            queryset = queryset.filter(department_id=department)
        return queryset


class DoctorRetrieveUpdateDestroyAPIView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Doctor.objects.all()

    serializer_class = DoctorSerializer


   