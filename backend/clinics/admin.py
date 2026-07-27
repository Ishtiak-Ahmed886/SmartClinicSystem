from django.contrib import admin

from .models import Clinic


@admin.register(Clinic)
class ClinicAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "email",
        "phone",
        "subscription_plan",
        "status",
    )

    list_filter = (
        "status",
        "subscription_plan",
    )

    search_fields = (
        "name",
        "email",
        "phone",
    )

    ordering = (
        "id",
    )