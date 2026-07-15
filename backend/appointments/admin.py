from django.contrib import admin
from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "patient",
        "doctor",
        "schedule",
        "appointment_date",
        "appointment_time",
        "token_number",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "appointment_date",
        "doctor",
        "schedule",
    )

    search_fields = (
        "doctor__user__username",
        "patient__user__username",
        "doctor__user__first_name",
        "patient__user__first_name",
    )

    ordering = (
        "-appointment_date",
        "appointment_time",
        "token_number",
    )

    readonly_fields = (
        "token_number",
        "created_at",
        "updated_at",
    )