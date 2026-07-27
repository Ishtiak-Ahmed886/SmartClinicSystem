from django.urls import path

from .views import (
    DepartmentListCreateAPIView,
    DepartmentRetrieveUpdateDestroyAPIView,
)

urlpatterns = [
    path(
        "",
        DepartmentListCreateAPIView.as_view(),
        name="department-list-create",
    ),
    path(
        "<int:pk>/",
        DepartmentRetrieveUpdateDestroyAPIView.as_view(),
        name="department-detail",
    ),
]