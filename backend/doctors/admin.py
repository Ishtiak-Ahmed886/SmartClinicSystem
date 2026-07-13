from django.contrib import admin
from .models import Doctor


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "department",
        "specialization",
        "consultation_fee",
        "is_available",
    )

    search_fields = (
        "user__username",
        "department",
        "specialization",
        "bmdc_number",
    )

    list_filter = (
        "department",
        "is_available",
    )
