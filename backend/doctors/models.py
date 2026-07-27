from django.db import models

from accounts.models import User
from clinics.models import Clinic
from departments.models import Department


class Doctor(models.Model):

    clinic = models.ForeignKey(
        Clinic,
        on_delete=models.CASCADE,
        related_name="doctors",
        null=True,
        blank=True,
    )

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.PROTECT,
        related_name="doctors",
    )

    specialization = models.CharField(
        max_length=100,
    )

    bmdc_number = models.CharField(
        max_length=50,
        unique=True,
    )

    experience = models.PositiveIntegerField()

    consultation_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    chamber = models.CharField(
        max_length=255,
    )

    is_available = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return self.user.get_full_name() or self.user.username