from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


from django.contrib import admin

admin.site.site_header = "IndustrialElectro Administration"
admin.site.site_title = "IndustrialElectro Admin"
admin.site.index_title = "Welcome to IndustrialElectro Dashboard"
urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/products/", include("products.urls")),
     path("api/categories/", include("categories.urls")),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )