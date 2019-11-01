from django.contrib.auth.hashers import make_password
from django.contrib.gis.geos import Polygon, MultiPolygon
from rest_framework_gis import serializers as gis_serializers
from rest_framework import serializers
from .models import Driver, Client, Ride


class DriverReadSerializer(gis_serializers.GeoModelSerializer):
    class Meta:
        model = Driver
        exclude = ('password',)


class DriverWriteSerializer(gis_serializers.GeoModelSerializer):
    class Meta:
        model = Driver
        fields = '__all__'

    @classmethod
    def validate_home_area(cls, home_area):
        if home_area and isinstance(home_area, Polygon):
            home_area = MultiPolygon(home_area)
        return home_area

    @classmethod
    def validate_password(cls, password):
        if not password:
            raise ValidationError(code='required')
        return make_password(password)


class ClientReadSerializer(gis_serializers.GeoModelSerializer):
    class Meta:
        model = Client
        exclude = ('password',)


class ClientWriteSerializer(gis_serializers.GeoModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

    @classmethod
    def validate_password(cls, password):
        if not password:
            raise serializers.ValidationError(code='required')
        return make_password(password)


class RideSerializer(gis_serializers.GeoModelSerializer):
    ordered_at = serializers.DateTimeField(input_formats=['%d.%m.%Y %H:%M'])

    class Meta:
        model = Ride
        fields = '__all__'
