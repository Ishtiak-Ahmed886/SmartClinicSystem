from django.db import transaction

from rest_framework import serializers

from patients.models import Patient

from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "phone",
            "role",
            "clinic",
        )

        read_only_fields = (
            "id",
        )


class PatientRegistrationSerializer(serializers.ModelSerializer):

    confirm_password = serializers.CharField(
        write_only=True,
    )

    class Meta:
        model = User

        fields = (
            "username",
            "first_name",
            "last_name",
            "email",
            "phone",
            "password",
            "confirm_password",
            "clinic",
        )

        extra_kwargs = {
            "password": {
                "write_only": True,
            }
        }

    def validate(self, attrs):

        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {
                    "password": "Passwords do not match."
                }
            )

        if User.objects.filter(username=attrs["username"]).exists():
            raise serializers.ValidationError(
                {
                    "username": "This username already exists."
                }
            )

        if User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError(
                {
                    "email": "This email already exists."
                }
            )

        if User.objects.filter(phone=attrs["phone"]).exists():
            raise serializers.ValidationError(
                {
                    "phone": "This phone number already exists."
                }
            )

        return attrs

    @transaction.atomic
    def create(self, validated_data):

        validated_data.pop("confirm_password")

        password = validated_data.pop("password")

        user = User(**validated_data)

        user.role = "patient"

        # Development Only
        user.dev_password = password

        user.set_password(password)

        user.save()

        Patient.objects.create(
            user=user,
        )

        return user   