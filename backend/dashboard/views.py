from datetime import date

from django.http import JsonResponse

from doctors.models import Doctor
from patients.models import Patient
from appointments.models import Appointment
from queues.models import Queue
from payments.models import Payment
from notifications.models import Notification


def dashboard_summary(request):

    today = date.today()

    data = {

        "total_doctors": Doctor.objects.count(),

        "total_patients": Patient.objects.count(),

        "today_appointments": Appointment.objects.filter(
            appointment_date=today
        ).count(),

        "waiting_patients": Queue.objects.filter(
            status="waiting"
        ).count(),

        "in_progress": Queue.objects.filter(
            status="in_progress"
        ).count(),

        "completed": Queue.objects.filter(
            status="completed"
        ).count(),

        "paid_payments": Payment.objects.filter(
            payment_status="paid"
        ).count(),

        "unread_notifications": Notification.objects.filter(
            is_read=False
        ).count(),
    }

    return JsonResponse(data)