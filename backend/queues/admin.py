from django.contrib import admin
from .models import Queue


@admin.action(description="Mark selected queues as Waiting")
def mark_waiting(modeladmin, request, queryset):
    for queue in queryset:
        queue.status = "waiting"
        queue.save()


@admin.action(description="Mark selected queues as In Progress")
def mark_in_progress(modeladmin, request, queryset):
    for queue in queryset:
        queue.status = "in_progress"
        queue.save()


@admin.action(description="Mark selected queues as Completed")
def mark_completed(modeladmin, request, queryset):
    for queue in queryset:
        queue.status = "completed"
        queue.save()


@admin.action(description="Mark selected queues as Cancelled")
def mark_cancelled(modeladmin, request, queryset):
    for queue in queryset:
        queue.status = "cancelled"
        queue.save()


@admin.action(description="Call Next Patient")
def call_next_patient(modeladmin, request, queryset):
    for queue in queryset:
        queue.call_next()


@admin.register(Queue)
class QueueAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "queue_number",
        "get_patient",
        "get_doctor",
        "status",
        "current_token",
        "next_token",
        "waiting_patients",
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

    actions = (
        mark_waiting,
        mark_in_progress,
        mark_completed,
        mark_cancelled,
        call_next_patient,
    )

    @admin.display(description="Patient")
    def get_patient(self, obj):
        return obj.appointment.patient

    @admin.display(description="Doctor")
    def get_doctor(self, obj):
        return obj.appointment.doctor

    @admin.display(description="Current Token")
    def current_token(self, obj):
        if obj.status == "in_progress":
            return obj.queue_number
        return "-"

    @admin.display(description="Next Token")
    def next_token(self, obj):
        next_queue = Queue.objects.filter(
            appointment__doctor=obj.appointment.doctor,
            status="waiting",
            queue_number__gt=obj.queue_number,
        ).order_by("queue_number").first()

        if next_queue:
            return next_queue.queue_number

        return "-"

    @admin.display(description="Waiting Patients")
    def waiting_patients(self, obj):
        return Queue.objects.filter(
            appointment__doctor=obj.appointment.doctor,
            status="waiting",
        ).count()