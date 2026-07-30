from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics, status
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from core.mixins import ClinicQuerySetMixin
from core.permissions import (IsClinicStaff,IsPatient,)

from .models import Appointment
from .serializers import AppointmentSerializer


class AppointmentListCreateAPIView(
    ClinicQuerySetMixin,
    generics.ListCreateAPIView,
):

    queryset = Appointment.objects.all()

    serializer_class = AppointmentSerializer

    permission_classes = [
        IsClinicStaff | IsPatient,
    ]

    clinic_field = "clinic"

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "clinic",
        "status",
        "doctor",
        "patient",
        "appointment_date",
    ]

    search_fields = [
        "notes",
        "status",
        "token_number",
        "clinic__name",
        "doctor__user__first_name",
        "doctor__user__last_name",
        "doctor__user__username",
        "patient__user__first_name",
        "patient__user__last_name",
    ]

    ordering_fields = [
        "appointment_date",
        "appointment_time",
        "token_number",
        "clinic",
    ]

    ordering = [
        "id",
    ]


class AppointmentRetrieveUpdateDestroyAPIView(
    ClinicQuerySetMixin,
    generics.RetrieveUpdateDestroyAPIView,
):

    queryset = Appointment.objects.all()

    serializer_class = AppointmentSerializer

    permission_classes = [
        IsClinicStaff | IsPatient,
    ]

    clinic_field = "clinic"


class AppointmentStatusUpdateAPIView(APIView):

    permission_classes = [
        IsClinicStaff,
    ]

    def patch(self, request, pk):

        try:
            appointment = Appointment.objects.get(pk=pk)

        except Appointment.DoesNotExist:
            return Response(
                {
                    "error": "Appointment not found"
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        new_status = request.data.get("status")

        allowed = [
            "pending",
            "confirmed",
            "completed",
            "cancelled",
        ]

        if new_status not in allowed:
            return Response(
                {
                    "error": "Invalid status"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        appointment.status = new_status

        appointment.save(
            update_fields=["status"],
        )

        return Response(
            AppointmentSerializer(
                appointment,
            ).data,
            status=status.HTTP_200_OK,
        )

class MyAppointmentAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request):

        if request.user.role != "patient":
            return Response(
                {
                    "error": "Only patients can access this endpoint."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        appointments = Appointment.objects.filter(
            patient__user=request.user
        ).order_by(
            "-appointment_date",
            "-appointment_time",
        )

        serializer = AppointmentSerializer(
            appointments,
            many=True,
        )

        return Response(serializer.data)
    