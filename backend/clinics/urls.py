from django.urls import path

from .views import (
    ClinicListCreateAPIView,
    ClinicRetrieveUpdateDestroyAPIView,
)

urlpatterns = [
    path(
        "",
        ClinicListCreateAPIView.as_view(),
        name="clinic-list-create",
    ),
    path(
        "<int:pk>/",
        ClinicRetrieveUpdateDestroyAPIView.as_view(),
        name="clinic-detail",
    ),
]