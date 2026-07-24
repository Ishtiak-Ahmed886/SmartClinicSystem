from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Appointment
from .serializers import AppointmentSerializer


class AppointmentListCreateAPIView(generics.ListCreateAPIView):

    queryset = Appointment.objects.all()

    serializer_class = AppointmentSerializer


class AppointmentRetrieveUpdateDestroyAPIView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Appointment.objects.all()

    serializer_class = AppointmentSerializer


class AppointmentStatusUpdateAPIView(APIView):

    def patch(self, request, pk):

        try:
            appointment = Appointment.objects.get(pk=pk)

        except Appointment.DoesNotExist:
            return Response(
                {"error": "Appointment not found"},
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
                {"error": "Invalid status"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        appointment.status = new_status

        # Only update the status field
        appointment.save(update_fields=["status"])

        return Response(
            AppointmentSerializer(appointment).data,
            status=status.HTTP_200_OK,
        )