from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    list_display = (
        "id",
        "username",
        "dev_password",
        "email",
        "phone",
        "role",
        "clinic",
        "is_active",
    )

    list_filter = (
        "role",
        "clinic",
        "is_active",
    )

    search_fields = (
        "username",
        "email",
        "phone",
    )

    ordering = (
        "id",
    )

    fieldsets = UserAdmin.fieldsets + (
        (
            "Additional Information",
            {
                "fields": (
                    "phone",
                    "role",
                    "clinic",
                    "dev_password",
                )
            },
        ),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (
            None,
            {
                "fields": (
                    "phone",
                    "role",
                    "clinic",
                    "dev_password",
                )
            },
        ),
    )