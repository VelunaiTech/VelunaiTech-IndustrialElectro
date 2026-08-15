from django.db import models


class ContactInfo(models.Model):

    name = models.CharField(
        max_length=150
    )

    profile_image = models.ImageField(
        upload_to="contact/",
        blank=True,
        null=True
    )

    mobile = models.CharField(
        max_length=20
    )

    email = models.EmailField()

    address = models.TextField()

    whatsapp_number = models.CharField(
        max_length=20,
        help_text="Enter number with country code. Example: 919876543210"
    )

    location_url = models.URLField(
        help_text="Google Maps location URL"
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.name