from django.db.models import Subquery

from rest_framework_gis.filterset import GeoFilterSet
from rest_framework_gis.filters import GeometryFilter
from django_filters import filters

from .models import Client, Driver


class ClientFilter(GeoFilterSet):
    first_name = filters.CharFilter(lookup_expr='istartswith')
    contained = GeometryFilter(field_name='home', lookup_expr='contained')
    contained_by_area_of_driver = filters.NumberFilter(method='contained_by_driver_filter')

    class Meta:
        model = Client
        fields = ['first_name', 'contained']

    def contained_by_driver_filter(self, queryset, _, driver_id):
        return queryset.filter(home__intersects=Subquery(
            Driver.objects.filter(pk=driver_id).values('home_area')[:1]
        ))
