from django.contrib import admin

from .models import Queue


@admin.action(description="Mark selected queues as Waiting")
def mark_waiting(modeladmin, request, queryset):
    queryset.update(status="waiting")


@admin.action(description="Mark selected queues as In Progress")
def mark_in_progress(modeladmin, request, queryset):
    queryset.update(status="in_progress")


@admin.action(description="Mark selected queues as Completed")
def mark_completed(modeladmin, request, queryset):
    queryset.update(status="completed")


@admin.action(description="Mark selected queues as Skipped")
def mark_skipped(modeladmin, request, queryset):
    queryset.update(status="skipped")


@admin.register(Queue)
class QueueAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "token_number",
        "get_patient",
        "get_doctor",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "created_at",
    )

    search_fields = (
        "appointment__patient__user__username",
        "appointment__doctor__user__username",
    )

    ordering = (
        "token_number",
    )

    actions = (
        mark_waiting,
        mark_in_progress,
        mark_completed,
        mark_skipped,
    )

    @admin.display(description="Patient")
    def get_patient(self, obj):
        return obj.appointment.patient

    @admin.display(description="Doctor")
    def get_doctor(self, obj):
        return obj.appointment.doctor