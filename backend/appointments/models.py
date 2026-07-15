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

        # একই Patient একই Doctor-এর কাছে একই দিনে একবারই Appointment নিতে পারবে
        if Appointment.objects.filter(
            doctor=self.doctor,
            patient=self.patient,
            appointment_date=self.appointment_date,
        ).exclude(pk=self.pk).exists():
            raise ValidationError(
                "This patient already has an appointment with this doctor on this date."
            )

        # Maximum Patient Check
        if self.schedule:

            total_patients = Appointment.objects.filter(
                schedule=self.schedule,
                appointment_date=self.appointment_date,
            ).exclude(pk=self.pk).count()

            if total_patients >= self.schedule.max_patients:
                raise ValidationError(
                    f"Maximum {self.schedule.max_patients} patients are allowed for this schedule."
                )

        # Doctor এবং Schedule মিলতে হবে
        if self.schedule and self.schedule.doctor != self.doctor:
            raise ValidationError(
                "Selected schedule does not belong to the selected doctor."
            )

    def save(self, *args, **kwargs):

        # সব Validation চালাবে
        self.full_clean()

        # Auto Token Generate
        if not self.token_number:
            last_token = Appointment.objects.filter(
                doctor=self.doctor,
                appointment_date=self.appointment_date,
            ).count()

            self.token_number = last_token + 1

        super().save(*args, **kwargs)

    def __str__(self):
        return (
            f"Token {self.token_number} | "
            f"{self.patient} → {self.doctor} "
            f"({self.appointment_date})"
        )