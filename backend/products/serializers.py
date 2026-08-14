from rest_framework import serializers

from .models import Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImage
        fields = [
            "id",
            "image",
        ]


class RelatedProductSerializer(serializers.ModelSerializer):

    images = ProductImageSerializer(
        many=True,
        read_only=True
    )

    category = serializers.SerializerMethodField()

    class Meta:
        model = Product

        fields = [
            "id",
            "name",
            "brand",
            "price",
            "category",
            "images",
        ]

    def get_category(self, obj):
        return {
            "id": obj.category.id,
            "name": obj.category.name,
            "slug": obj.category.slug,
        }


class ProductSerializer(serializers.ModelSerializer):

    images = ProductImageSerializer(
        many=True,
        read_only=True
    )

    category = serializers.SerializerMethodField()

    related_products = serializers.SerializerMethodField()

    class Meta:
        model = Product

        fields = [
            "id",
            "name",
            "brand",
            "price",
            "category",
            "description",
            "images",
            "related_products",
        ]

    def get_category(self, obj):

        return {
            "id": obj.category.id,
            "name": obj.category.name,
            "slug": obj.category.slug,
        }

    def get_related_products(self, obj):

        products = (
            Product.objects
            .filter(
                category=obj.category,
                is_active=True
            )
            .exclude(id=obj.id)
            .prefetch_related("images")
            .order_by("-created_at")[:8]
        )

        return RelatedProductSerializer(
            products,
            many=True,
            context=self.context
        ).data