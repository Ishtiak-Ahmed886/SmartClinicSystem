from django.urls import path

from .views import (
    DoctorScheduleListCreateAPIView,
    DoctorScheduleRetrieveUpdateDestroyAPIView,
)

urlpatterns = [
    path(
        "",
        DoctorScheduleListCreateAPIView.as_view(),
        name="schedule-list-create",
    ),

    path(
        "<int:pk>/",
        DoctorScheduleRetrieveUpdateDestroyAPIView.as_view(),
        name="schedule-detail",
    ),
]