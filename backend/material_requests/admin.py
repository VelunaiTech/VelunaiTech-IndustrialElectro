from django.contrib import admin
from .models import MaterialRequest


@admin.register(MaterialRequest)
class MaterialRequestAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "product",
        "quantity",
        "phone",
        "created_at",
    )

    search_fields = (
        "name",
        "phone",
        "email",
    )