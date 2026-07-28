class ClinicCreateMixin:

    clinic_field = "clinic"

    def perform_create(self, serializer):

        user = self.request.user

        if user.is_superuser:
            serializer.save()
            return

        serializer.save(
            **{
                self.clinic_field: user.clinic
            }
        )