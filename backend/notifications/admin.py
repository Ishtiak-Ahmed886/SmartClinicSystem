from django.contrib import admin

from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "notification_type",
        "title",
        "short_message",
        "is_read",
        "created_at",
    )

    list_display_links = (
        "id",
        "title",
    )

    list_filter = (
        "notification_type",
        "is_read",
        "created_at",
    )

    search_fields = (
        "user__username",
        "title",
        "message",
    )

    ordering = (
        "-created_at",
    )

    readonly_fields = (
        "created_at",
    )

    fields = (
        "user",
        "notification_type",
        "title",
        "message",
        "is_read",
        "created_at",
    )

    actions = (
        "mark_as_read",
        "mark_as_unread",
    )

    @admin.display(description="Message")
    def short_message(self, obj):
        if len(obj.message) > 50:
            return obj.message[:50] + "..."
        return obj.message

    @admin.action(description="Mark selected notifications as Read")
    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)

    @admin.action(description="Mark selected notifications as Unread")
    def mark_as_unread(self, request, queryset):
        queryset.update(is_read=False)
