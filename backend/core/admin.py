from django.contrib.gis import admin
from .models import Driver, Client, Ride


class BaseGeoAdmin(admin.OSMGeoAdmin):
    default_lon = 3500000
    default_lat = 6300000
    default_zoom = 5


@admin.register(Driver)
class DriverAdmin(BaseGeoAdmin):
    list_display = ('id', 'first_name', 'last_name',)
    search_fields = ('first_name', 'last_name',)
    exclude = ('password', )


@admin.register(Client)
class ClientAdmin(BaseGeoAdmin):
    list_display = ('id', 'first_name', 'last_name',)
    search_fields = ('first_name', 'last_name',)
    exclude = ('password',)


@admin.register(Ride)
class RideAdmin(BaseGeoAdmin):
    list_display = ('__str__', 'client',)
    search_fields = ('client', )
