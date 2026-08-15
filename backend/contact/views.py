from rest_framework import generics

from .models import ContactInfo
from .serializers import ContactInfoSerializer


class ContactInfoView(generics.RetrieveAPIView):

    serializer_class = ContactInfoSerializer

    def get_object(self):

        contact = (
            ContactInfo.objects
            .filter(is_active=True)
            .order_by("-updated_at")
            .first()
        )

        return contact