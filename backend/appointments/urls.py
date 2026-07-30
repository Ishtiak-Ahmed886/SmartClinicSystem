from django.urls import path

from .views import (
    AppointmentListCreateAPIView,
    AppointmentRetrieveUpdateDestroyAPIView,
    AppointmentStatusUpdateAPIView,
    MyAppointmentAPIView,
)

urlpatterns = [
    path(
        "",
        AppointmentListCreateAPIView.as_view(),
        name="appointment-list-create",
    ),

     path(
        "my/",
        MyAppointmentAPIView.as_view(),
        name="my-appointments",
    ),

    path(
        "<int:pk>/",
        AppointmentRetrieveUpdateDestroyAPIView.as_view(),
        name="appointment-detail",
    ),

    path(
        "<int:pk>/status/",
        AppointmentStatusUpdateAPIView.as_view(),
        name="appointment-status-update",
    ),
]