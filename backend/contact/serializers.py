from rest_framework import serializers

from .models import ContactInfo


class ContactInfoSerializer(serializers.ModelSerializer):

    class Meta:

        model = ContactInfo

        fields = [
            "id",
            "name",
            "profile_image",
            "mobile",
            "email",
            "address",
            "whatsapp_number",
            "location_url",
        ]