from django.contrib import admin
from .models import HeroBanner


@admin.register(HeroBanner)
class HeroBannerAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "order",
        "is_active",
    )