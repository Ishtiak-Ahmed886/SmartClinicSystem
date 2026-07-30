from datetime import datetime
from django.utils import timezone

from rest_framework import serializers

from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appointment
        fields = "__all__"

    def validate(self, data):

        clinic = data.get("clinic")
        doctor = data.get("doctor")
        schedule = data.get("schedule")
        appointment_date = data.get("appointment_date")
        appointment_time = data.get("appointment_time")

        # ==========================
        # Doctor belongs to Clinic
        # ==========================
        if doctor and clinic:
            if doctor.user.clinic_id != clinic.id:
                raise serializers.ValidationError(
                    "Selected doctor does not belong to the selected clinic."
                )

        # ==========================
        # Schedule belongs to Doctor
        # ==========================
        if schedule and doctor:
            if schedule.doctor_id != doctor.id:
                raise serializers.ValidationError(
                    "Selected schedule does not belong to the selected doctor."
                )

        # ==========================
        # Past Date Block
        # ==========================
        today = timezone.localdate()

        if appointment_date < today:
            raise serializers.ValidationError(
                "You cannot book an appointment in the past."
            )

        # ==========================
        # Past Time Block
        # ==========================
        if appointment_date == today:

            current_time = timezone.localtime().time()

            if appointment_time <= current_time:
                raise serializers.ValidationError(
                    "Appointment time has already passed."
                )

        # ==========================
        # Schedule Time Validation
        # ==========================
        if schedule:

            if (
                appointment_time < schedule.start_time
                or appointment_time > schedule.end_time
            ):
                raise serializers.ValidationError(
                    "Appointment time is outside the doctor's schedule."
                )

        # ==========================
        # Double Booking
        # ==========================
        queryset = Appointment.objects.filter(
            doctor=doctor,
            appointment_date=appointment_date,
            appointment_time=appointment_time,
        )

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "This doctor already has an appointment at this time."
            )

        return data