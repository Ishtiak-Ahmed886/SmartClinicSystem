from django.urls import path

from .views import (
    QueueListAPIView,
    NextPatientAPIView,
    LiveQueueSummaryAPIView,
)

urlpatterns = [
    path('', QueueListAPIView.as_view(), name='queue-list'),
    path('next/', NextPatientAPIView.as_view(), name='queue-next'),
    path('summary/', LiveQueueSummaryAPIView.as_view(), name='queue-summary'),
]