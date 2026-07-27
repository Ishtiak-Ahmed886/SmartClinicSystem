from django.contrib import admin
from .models import Department


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "clinic",
        "name",
        "is_active",
    )

    search_fields = (
        "name",
        "clinic__name",
    )

    list_filter = (
        "clinic",
        "is_active",
    )

    ordering = (
        "clinic",
        "name",
    )