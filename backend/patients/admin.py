from django.contrib import admin
from .models import Patient


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "blood_group",
        "emergency_contact",
    )

    search_fields = (
        "user__username",
        "blood_group",
        "emergency_contact",
    )