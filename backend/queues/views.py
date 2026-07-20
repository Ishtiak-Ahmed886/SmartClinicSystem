from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Queue
from .serializers import QueueSerializer


class QueueListAPIView(generics.ListAPIView):

    queryset = Queue.objects.all().order_by("token_number")

    serializer_class = QueueSerializer


class NextPatientAPIView(APIView):

    def post(self, request):

        current_patient = Queue.objects.filter(
            status="in_progress"
        ).first()

        if current_patient:
            current_patient.status = "completed"
            current_patient.save()

        next_patient = Queue.objects.filter(
            status="waiting"
        ).order_by("token_number").first()

        if next_patient:
            next_patient.status = "in_progress"
            next_patient.save()

            serializer = QueueSerializer(next_patient)

            return Response({
                "message": "Next patient called successfully",
                "patient": serializer.data,
            })

        return Response({
            "message": "No waiting patients in queue"
        })