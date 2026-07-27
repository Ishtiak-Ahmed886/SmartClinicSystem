from rest_framework import serializers

from .models import DoctorSchedule


class DoctorScheduleSerializer(serializers.ModelSerializer):

    class Meta:
        model = DoctorSchedule
        fields = "__all__"

    def validate(self, data):

        start_time = data.get("start_time")
        end_time = data.get("end_time")
        max_patients = data.get("max_patients")

        # Start time must be before end time
        if start_time >= end_time:
            raise serializers.ValidationError(
                "Start time must be earlier than end time."
            )

        # At least one patient slot
        if max_patients <= 0:
            raise serializers.ValidationError(
                "Maximum patients must be greater than zero."
            )

        return data