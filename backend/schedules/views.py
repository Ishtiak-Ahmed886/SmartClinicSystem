from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics
from rest_framework.filters import OrderingFilter

from .models import DoctorSchedule
from .serializers import DoctorScheduleSerializer


class DoctorScheduleListCreateAPIView(generics.ListCreateAPIView):

    queryset = DoctorSchedule.objects.all()

    serializer_class = DoctorScheduleSerializer

    filter_backends = [
        DjangoFilterBackend,
        OrderingFilter,
    ]

    filterset_fields = [
        "doctor",
        "day",
        "is_available",
    ]

    ordering_fields = [
        "day",
        "start_time",
    ]

    ordering = [
        "doctor",
        "day",
        "start_time",
    ]


class DoctorScheduleRetrieveUpdateDestroyAPIView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = DoctorSchedule.objects.all()

    serializer_class = DoctorScheduleSerializer