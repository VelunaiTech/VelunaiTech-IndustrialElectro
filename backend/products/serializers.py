from rest_framework import serializers

from .models import Product, ProductImage
from categories.serializers import CategorySerializer


class ProductImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImage
        fields = [
            "id",
            "image",
        ]


class RelatedProductSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()

    class Meta:
        model = Product

        fields = [
            "id",
            "name",
            "brand",
            "price",
            "image",
        ]

    def get_image(self, obj):

        image = obj.images.first()

        if not image:
            return None

        request = self.context.get("request")

        if request:
            return request.build_absolute_uri(
                image.image.url
            )

        return image.image.url


class ProductSerializer(serializers.ModelSerializer):

    category = CategorySerializer(
        read_only=True
    )

    images = ProductImageSerializer(
        many=True,
        read_only=True
    )

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

    def get_related_products(self, obj):

        products = Product.objects.filter(
            category=obj.category,
            is_active=True
        ).exclude(
            id=obj.id
        )

        return RelatedProductSerializer(
            products,
            many=True,
            context=self.context
        ).data