from django.contrib import admin
from django.utils.html import format_html
from .models import Product, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    list_display = (
        "image_preview",
        "name",
        "brand",
        "category",
        "price",
        "is_active",
    )

    list_filter = (
        "category",
        "brand",
        "is_active",
    )

    search_fields = (
        "name",
        "brand",
    )

    fieldsets = (

        ("Product Information", {
            "fields": (
                "name",
                "brand",
                "category",
                "price",
            )
        }),

        ("Description", {
            "fields": (
                "description",
            )
        }),

        ("Related Products", {
            "fields": (
                "related_products",
            )
        }),

        ("Settings", {
            "fields": (
                "is_active",
            )
        }),
    )

    inlines = [ProductImageInline]

    def image_preview(self, obj):
        if obj.pk and obj.images.exists():
            return format_html(
                '<img src="{}" width="70" height="70" style="border-radius:8px;object-fit:cover;" />',
                obj.images.first().image.url,
            )
        return "-"

    image_preview.short_description = "Image"


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):

    list_display = (
        "preview",
        "product",
    )

    def preview(self, obj):
        return format_html(
            '<img src="{}" width="80" height="80" style="border-radius:8px;" />',
            obj.image.url,
        )

    preview.short_description = "Preview"