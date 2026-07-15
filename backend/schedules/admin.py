from django.contrib import admin
from .models import DoctorSchedule


@admin.register(DoctorSchedule)
class DoctorScheduleAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "doctor",
        "day",
        "start_time",
        "end_time",
        "max_patients",
        "is_available",
    )

    list_filter = (
        "day",
        "is_available",
    )

    search_fields = (
        "doctor__user__username",
    )
