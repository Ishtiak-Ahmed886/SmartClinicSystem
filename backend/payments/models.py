from django.db import models

from appointments.models import Appointment


class Payment(models.Model):

    PAYMENT_STATUS = (
        ("pending", "Pending"),
        ("paid", "Paid"),
        ("failed", "Failed"),
        ("refunded", "Refunded"),
    )

    PAYMENT_METHOD = (
        ("cash", "Cash"),
        ("bkash", "Bkash"),
        ("nagad", "Nagad"),
        ("card", "Card"),
    )

    appointment = models.OneToOneField(
        Appointment,
        on_delete=models.CASCADE,
        related_name="payment",
    )

    consultation_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    amount_paid = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    due_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        editable=False,
    )

    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS,
        default="pending",
    )

    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHOD,
        default="cash",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def save(self, *args, **kwargs):

        # Due Amount Auto Calculate
        self.due_amount = self.consultation_fee - self.amount_paid

        # Auto Update Payment Status
        if self.amount_paid >= self.consultation_fee:
            self.payment_status = "paid"

        elif self.amount_paid == 0:
            self.payment_status = "pending"

        else:
            self.payment_status = "pending"

        super().save(*args, **kwargs)

    def __str__(self):
        return (
            f"{self.appointment.patient} - "
            f"{self.payment_status}"
        )
