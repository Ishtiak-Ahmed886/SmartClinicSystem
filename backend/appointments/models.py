from django.db import models
from django.core.exceptions import ValidationError

from doctors.models import Doctor
from patients.models import Patient
from schedules.models import DoctorSchedule


class Appointment(models.Model):

    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    )

    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name="appointments",
    )

    schedule = models.ForeignKey(
        DoctorSchedule,
        on_delete=models.CASCADE,
        related_name="appointments",
        null=True,
        blank=True,
    )

    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name="appointments",
    )

    appointment_date = models.DateField()

    appointment_time = models.TimeField()

    token_number = models.PositiveIntegerField(
        null=True,
        blank=True,
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending",
    )

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):

        # Required fields check
        if not self.doctor_id or not self.patient_id or not self.appointment_date:
            return

        # Duplicate Appointment Check
        if Appointment.objects.filter(
            doctor_id=self.doctor_id,
            patient_id=self.patient_id,
            appointment_date=self.appointment_date,
        ).exclude(pk=self.pk).exists():

            raise ValidationError(
                "This patient already has an appointment with this doctor on this date."
            )

        # Maximum Patient Check
        if self.schedule_id:

            total_patients = Appointment.objects.filter(
                schedule_id=self.schedule_id,
                appointment_date=self.appointment_date,
            ).exclude(pk=self.pk).count()

            if total_patients >= self.schedule.max_patients:
                raise ValidationError(
                    f"Maximum {self.schedule.max_patients} patients are allowed for this schedule."
                )

            # Doctor & Schedule Match Check
            if self.schedule.doctor_id != self.doctor_id:
                raise ValidationError(
                    "Selected schedule does not belong to the selected doctor."
                )

    def save(self, *args, **kwargs):

        # Validation
        self.full_clean()

        # Auto Token
        if not self.token_number:

            last_token = Appointment.objects.filter(
                doctor=self.doctor,
                appointment_date=self.appointment_date,
            ).count()

            self.token_number = last_token + 1

        # Save Appointment
        super().save(*args, **kwargs)

        # Auto Create Queue
        from queues.models import Queue

        Queue.objects.get_or_create(
            appointment=self,
            defaults={
                "queue_number": self.token_number,
            }
        )

    def __str__(self):
        return (
            f"Token {self.token_number} | "
            f"{self.patient} → {self.doctor} "
            f"({self.appointment_date})"
        )