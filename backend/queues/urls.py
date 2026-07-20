from django.urls import path

from .views import QueueListAPIView, NextPatientAPIView

urlpatterns = [
    path(
        "",
        QueueListAPIView.as_view(),
        name="queue-list",
    ),

    path(
        "next/",
        NextPatientAPIView.as_view(),
        name="next-patient",
    ),
]