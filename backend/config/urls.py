from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),

    path("dashboard/", include("dashboard.urls")),

    path("api/", include("accounts.urls")),

    path("api/doctors/", include("doctors.urls")),

    path("api/patients/", include("patients.urls")),
    
    path("api/appointments/", include("appointments.urls")),

    path("api/queue/", include("queues.urls")),
]
