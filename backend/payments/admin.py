from django.contrib import admin
from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "patient",
        "doctor",
        "consultation_fee",
        "amount_paid",
        "due_amount",
        "payment_status",
        "payment_method",
        "created_at",
    )

    list_filter = (
        "payment_status",
        "payment_method",
    )

    search_fields = (
        "appointment__patient__user__username",
        "appointment__doctor__user__username",
    )

    readonly_fields = (
        "due_amount",
    )

    @admin.display(description="Patient")
    def patient(self, obj):
        return obj.appointment.patient

    @admin.display(description="Doctor")
    def doctor(self, obj):
        return obj.appointment.doctor