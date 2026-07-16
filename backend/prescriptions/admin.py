from django.contrib import admin

from .models import Prescription, PrescriptionMedicine


class PrescriptionMedicineInline(admin.TabularInline):
    model = PrescriptionMedicine
    extra = 1


@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "patient",
        "doctor",
        "appointment_date",
        "created_at",
    )

    search_fields = (
        "appointment__patient__user__username",
        "appointment__doctor__user__username",
    )

    list_filter = (
        "created_at",
    )

    inlines = (
        PrescriptionMedicineInline,
    )

    @admin.display(description="Patient")
    def patient(self, obj):
        return obj.appointment.patient

    @admin.display(description="Doctor")
    def doctor(self, obj):
        return obj.appointment.doctor

    @admin.display(description="Appointment Date")
    def appointment_date(self, obj):
        return obj.appointment.appointment_date


@admin.register(PrescriptionMedicine)
class PrescriptionMedicineAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "medicine_name",
        "prescription",
        "dosage",
        "duration",
    )

    search_fields = (
        "medicine_name",
    )