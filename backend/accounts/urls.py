from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    UserListAPIView,
    CurrentUserAPIView,
    PatientRegistrationAPIView,
)

urlpatterns = [
    # User List API
    path(
        "users/",
        UserListAPIView.as_view(),
        name="user-list",
    ),
    
    path(
    "me/",
    CurrentUserAPIView.as_view(),
    name="current-user",
    ),
    # Patient Registration API
    path(
        "register/patient/",
        PatientRegistrationAPIView.as_view(),
        name="patient-registration",
    ),

    # JWT Login API
    path(
        "token/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),

    # JWT Refresh API
    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),
]