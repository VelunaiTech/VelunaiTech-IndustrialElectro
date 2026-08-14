from django.db import models


class HeroBanner(models.Model):
    title = models.CharField(max_length=255)

    highlight = models.CharField(max_length=100)

    subtitle = models.TextField()

    eyebrow = models.CharField(max_length=255)

    image = models.ImageField(upload_to="hero/")

    order = models.PositiveIntegerField(default=0)

    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title