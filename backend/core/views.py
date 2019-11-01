from django.contrib.gis.db.models.functions import Area

from django_filters import rest_framework as filters
from rest_framework.viewsets import ModelViewSet

from .models import Driver, Client, Ride
from .filters import ClientFilter
from .serializers import (
    DriverReadSerializer, ClientReadSerializer, RideSerializer,
    DriverWriteSerializer, ClientWriteSerializer,
)


class ApiMixin:
    serializers = {}

    def get_serializer_class(self):
        return self.serializers.get(self.action, self.serializer_class)


class DriverViewSet(ApiMixin, ModelViewSet):
    queryset = Driver.objects.annotate(area=Area('home_area')).order_by('-area')
    serializer_class = DriverReadSerializer
    serializers = {
        'create': DriverWriteSerializer
    }


class ClientViewSet(ApiMixin, ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientReadSerializer
    serializers = {
        'create': ClientWriteSerializer
    }
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ClientFilter


class RideViewSet(ApiMixin, ModelViewSet):
    queryset = Ride.objects.all()
    serializer_class = RideSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('client',)

