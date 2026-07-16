from django.db.models.signals import post_save
from django.dispatch import receiver

from appointments.models import Appointment
from .models import Notification


@receiver(post_save, sender=Appointment)
def create_appointment_notification(sender, instance, created, **kwargs):

    if created:

        Notification.objects.create(
            user=instance.patient.user,
            notification_type="appointment",
            title="Appointment Confirmed",
            message=(
                f"Your appointment with "
                f"{instance.doctor} "
                f"has been booked successfully.\n"
                f"Date: {instance.appointment_date}\n"
                f"Token: {instance.token_number}"
            ),
        )