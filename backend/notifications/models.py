from django.db import models

from accounts.models import User


class Notification(models.Model):

    TYPE_CHOICES = (
        ("appointment", "Appointment"),
        ("queue", "Queue"),
        ("payment", "Payment"),
        ("prescription", "Prescription"),
        ("system", "System"),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="notifications",
    )

    notification_type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
    )

    title = models.CharField(
        max_length=255,
    )

    message = models.TextField()

    is_read = models.BooleanField(
        default=False,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return (
            f"{self.user.username} | "
            f"{self.title}"
        )