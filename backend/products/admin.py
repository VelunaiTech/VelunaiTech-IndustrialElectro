from django.contrib import admin
from .models import Product, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ("image",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "brand",
        "category",
        "price",
        "is_active",
        "created_at",
    )

    list_filter = (
        "category",
        "brand",
        "is_active",
    )

    search_fields = (
        "name",
        "brand",
        "description",
    )

    ordering = (
        "-created_at",
    )

    fields = (
        "name",
        "category",
        "brand",
        "price",
        "description",
        "is_active",
    )

    inlines = [
        ProductImageInline,
    ]