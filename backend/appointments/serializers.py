from rest_framework import serializers

from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appointment
        fields = "__all__"

    def validate(self, data):

        doctor = data.get("doctor")
        appointment_date = data.get("appointment_date")
        appointment_time = data.get("appointment_time")

        queryset = Appointment.objects.filter(
            doctor=doctor,
            appointment_date=appointment_date,
            appointment_time=appointment_time,
        )

        # Update করার সময় নিজের record বাদ দিবে
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        # Duplicate booking block
        if queryset.exists():
            raise serializers.ValidationError(
                "This doctor already has an appointment at this time."
            )

        return data