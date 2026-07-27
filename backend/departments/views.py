from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics
from rest_framework.filters import OrderingFilter, SearchFilter

from .models import Department
from .serializers import DepartmentSerializer


class DepartmentListCreateAPIView(generics.ListCreateAPIView):

    queryset = Department.objects.all()

    serializer_class = DepartmentSerializer

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

    
    def get_queryset(self):

        queryset = Department.objects.all()
        clinic_id = self.request.query_params.get("clinic_id")
        if clinic_id:
            queryset = queryset.filter(clinic_id=clinic_id)
        return queryset


class DepartmentRetrieveUpdateDestroyAPIView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Department.objects.all()

    serializer_class = DepartmentSerializer