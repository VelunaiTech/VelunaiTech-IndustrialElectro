from django.contrib import admin

from .models import ContactInfo


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "mobile",
        "email",
        "is_active",
        "updated_at",
    )

    list_filter = (
        "is_active",
    )

    search_fields = (
        "name",
        "mobile",
        "email",
        "address",
    )

    ordering = (
        "-updated_at",
    )