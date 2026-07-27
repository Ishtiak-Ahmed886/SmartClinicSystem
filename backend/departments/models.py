from django.db import models
from clinics.models import Clinic


class Department(models.Model):

    clinic = models.ForeignKey(
        Clinic,
        on_delete=models.CASCADE,
        related_name="departments",
        null=True,
        blank=True,
    )

    name = models.CharField(
        max_length=100,
    )

    description = models.TextField(
        blank=True,
    )

    is_active = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["name"]

        constraints = [
            models.UniqueConstraint(
                fields=["clinic", "name"],
                name="unique_department_name_per_clinic",
            ),
        ]

    def __str__(self):
        return self.name