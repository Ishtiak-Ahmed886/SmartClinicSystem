from django.contrib import admin
from .models import Doctor


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "clinic",
        "department",
        "specialization",
        "consultation_fee",
        "is_available",
    )

    search_fields = (
        "user__username",
        "user__first_name",
        "user__last_name",
        "clinic__name",
        "department",
        "specialization",
        "bmdc_number",
    )

    list_filter = (
        "clinic",
        "department",
        "is_available",
    )

    ordering = (
        "id",
    )
