from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    # Django Admin
    path("admin/", admin.site.urls),

    # Dashboard API
    path("dashboard/", include("dashboard.urls")),

    # Accounts API
    path("api/", include("accounts.urls")),
]