from django.db import models

from appointments.models import Appointment


class Queue(models.Model):

    STATUS_CHOICES = (
        ("waiting", "Waiting"),
        ("called", "Called"),
        ("completed", "Completed"),
        ("skipped", "Skipped"),
    )

    appointment = models.OneToOneField(
        Appointment,
        on_delete=models.CASCADE,
        related_name="queue",
    )

    queue_number = models.PositiveIntegerField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="waiting",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return (
            f"Queue {self.queue_number} - "
            f"{self.appointment.patient}"
        )