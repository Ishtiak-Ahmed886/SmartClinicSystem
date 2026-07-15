from django.db import models
from doctors.models import Doctor


class DoctorSchedule(models.Model):

    DAY_CHOICES = (
        ("Saturday", "Saturday"),
        ("Sunday", "Sunday"),
        ("Monday", "Monday"),
        ("Tuesday", "Tuesday"),
        ("Wednesday", "Wednesday"),
        ("Thursday", "Thursday"),
        ("Friday", "Friday"),
    )

    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name="schedules",
    )

    day = models.CharField(
        max_length=20,
        choices=DAY_CHOICES,
    )

    start_time = models.TimeField()

    end_time = models.TimeField()

    max_patients = models.PositiveIntegerField()

    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.doctor} - {self.day}"
