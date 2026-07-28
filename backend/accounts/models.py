from django.db import models
from django.contrib.auth.models import AbstractUser
from clinics.models import Clinic


class User(AbstractUser):

    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("doctor", "Doctor"),
        ("patient", "Patient"),
        ("receptionist", "Receptionist"),
    )

    phone = models.CharField(
        max_length=15,
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="patient",
    )

    clinic = models.ForeignKey(
        Clinic,
        on_delete=models.CASCADE,
        related_name="users",
        null=True,
        blank=True,
    )

    # DEVELOPMENT ONLY
    # Project complete হলে এই field remove করা হবে
    dev_password = models.CharField(
        max_length=128,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.get_full_name() or self.username