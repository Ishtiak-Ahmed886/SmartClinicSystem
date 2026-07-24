from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Queue
from .serializers import QueueSerializer


# Queue List API
class QueueListAPIView(generics.ListAPIView):
    queryset = Queue.objects.all().order_by('token_number')
    serializer_class = QueueSerializer
    permission_classes = [permissions.IsAuthenticated]


# Live Queue Summary API
class LiveQueueSummaryAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        waiting_count = Queue.objects.filter(status='waiting').count()
        completed_count = Queue.objects.filter(status='completed').count()

        # Current serving patient
        current_patient = Queue.objects.filter(
            status='in_progress'
        ).order_by('token_number').first()

        # If nobody is in progress, show first waiting patient
        if not current_patient:
            current_patient = Queue.objects.filter(
                status='waiting'
            ).order_by('token_number').first()

        return Response({
            'now_serving': current_patient.token_number if current_patient else None,
            'waiting_count': waiting_count,
            'completed_count': completed_count,
            'total_queue': Queue.objects.count()
        })


# Call Next Patient API
class NextPatientAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):

        # Complete current patient
        current_patient = Queue.objects.filter(
            status='in_progress'
        ).first()

        if current_patient:
            current_patient.status = 'completed'
            current_patient.save()

        # Move next waiting patient to in_progress
        next_patient = Queue.objects.filter(
            status='waiting'
        ).order_by('token_number').first()

        if next_patient:
            next_patient.status = 'in_progress'
            next_patient.save()

            serializer = QueueSerializer(next_patient)

            return Response({
                'message': 'Next patient called successfully',
                'patient': serializer.data,
            })

        return Response({
            'message': 'No waiting patients in queue'
        })