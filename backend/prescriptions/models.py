from django.db import models

from appointments.models import Appointment


class Prescription(models.Model):

    appointment = models.OneToOneField(
        Appointment,
        on_delete=models.CASCADE,
        related_name="prescription",
    )

    diagnosis = models.TextField()

    advice = models.TextField(
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return (
            f"Prescription - "
            f"{self.appointment.patient}"
        )


class PrescriptionMedicine(models.Model):

    prescription = models.ForeignKey(
        Prescription,
        on_delete=models.CASCADE,
        related_name="medicines",
    )

    medicine_name = models.CharField(
        max_length=255,
    )

    dosage = models.CharField(
        max_length=100,
    )

    duration = models.CharField(
        max_length=100,
    )

    instructions = models.TextField(
        blank=True,
    )

    def __str__(self):
        return (
            f"{self.medicine_name} - "
            f"{self.prescription.appointment.patient}"
        )