from django.db import models

from appointments.models import Appointment


class Queue(models.Model):

    STATUS_CHOICES = (
        ("waiting", "Waiting"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
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

    class Meta:
        ordering = ["queue_number"]

    def save(self, *args, **kwargs):
        """
        Ensure that only one queue can be 'In Progress' at a time.
        """

        if self.status == "in_progress":
            Queue.objects.filter(
                status="in_progress"
            ).exclude(
                pk=self.pk
            ).update(
                status="waiting"
            )

        super().save(*args, **kwargs)

    def call_next(self):
        """
        Complete current queue and move next waiting queue
        to In Progress.
        """

        # Current Queue Completed
        self.status = "completed"
        self.save()

        # Find Next Waiting Queue
        next_queue = Queue.objects.filter(
            appointment__doctor=self.appointment.doctor,
            status="waiting",
            queue_number__gt=self.queue_number,
        ).order_by("queue_number").first()

        # Move Next Queue to In Progress
        if next_queue:
            next_queue.status = "in_progress"
            next_queue.save()

        return next_queue

    def __str__(self):
        return (
            f"Queue {self.queue_number} | "
            f"{self.appointment.patient} | "
            f"{self.status}"
        )