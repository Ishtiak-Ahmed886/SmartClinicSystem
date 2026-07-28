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

        print("\n========== DEBUG ==========")
        print("Username:", user.username)
        print("Authenticated:", user.is_authenticated)
        print("Superuser:", user.is_superuser)
        print("Clinic ID:", user.clinic_id)
        print("Clinic Field:", self.clinic_field)
        print("Query Count Before:", queryset.count())

        if not user.is_authenticated:
            print("User not authenticated")
            return queryset.none()

        if user.is_superuser:
            print("Superuser detected")
            return queryset

        if user.clinic is None:
            print("User has no clinic")
            return queryset.none()

        filtered_queryset = queryset.filter(
            **{
                self.clinic_field: user.clinic
            }
        )

        print("Query Count After:", filtered_queryset.count())
        print("===========================\n")

        return filtered_queryset