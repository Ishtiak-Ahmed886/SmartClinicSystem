from django.contrib import admin
from .models import Queue


@admin.register(Queue)
class QueueAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "appointment",
        "queue_number",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
    )

    search_fields = (
        "appointment__patient__user__username",
        "appointment__doctor__user__username",
    )

    ordering = (
        "queue_number",
    )