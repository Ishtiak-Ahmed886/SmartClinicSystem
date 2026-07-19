from django.urls import path

from .views import (
    AppointmentListCreateAPIView,
    AppointmentRetrieveUpdateDestroyAPIView,
)

urlpatterns = [
    path(
        "",
        AppointmentListCreateAPIView.as_view(),
        name="appointment-list-create",
    ),

    path(
        "<int:pk>/",
        AppointmentRetrieveUpdateDestroyAPIView.as_view(),
        name="appointment-detail",
    ),
]