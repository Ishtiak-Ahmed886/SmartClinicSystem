from django.core.exceptions import ImproperlyConfigured


class ClinicQuerySetMixin:

    clinic_field = None

    def get_queryset(self):

        if self.clinic_field is None:
            raise ImproperlyConfigured(
                "clinic_field must be defined."
            )

        queryset = super().get_queryset()

        user = self.request.user

        if not user.is_authenticated:
            return queryset.none()

        if user.is_superuser:
            return queryset

        if user.clinic is None:
            return queryset.none()

        filtered_queryset = queryset.filter(
            **{
                self.clinic_field: user.clinic
            }
        ).distinct()

        return filtered_queryset