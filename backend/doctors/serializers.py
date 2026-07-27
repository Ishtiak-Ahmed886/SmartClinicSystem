from rest_framework import serializers

from .models import Doctor


class DoctorSerializer(serializers.ModelSerializer):

    doctor_name = serializers.CharField(
        source="user.get_full_name",
        read_only=True,
    )

    clinic_name = serializers.CharField(
        source="clinic.name",
        read_only=True,
    )

    department_name = serializers.CharField(
        source="department.name",
        read_only=True,
    )

    class Meta:
        model = Doctor

        fields = [
            "id",
            "doctor_name",
            "clinic",
            "clinic_name",
            "department",
            "department_name",
            "specialization",
            "bmdc_number",
            "experience",
            "consultation_fee",
            "chamber",
            "is_available",
        ]