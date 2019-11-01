from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.gis.db import models
from django.utils.timezone import now as tz_now
from djchoices import ChoiceItem, DjangoChoices
from .validators import MobilePhoneValidator


class Driver(AbstractBaseUser):
    class Meta:
        db_table = 'drivers'

    USERNAME_FIELD = 'mobile_phone'
    mobile_phone = models.CharField(max_length=32, validators=(MobilePhoneValidator(),), unique=True)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    home_area = models.MultiPolygonField()
    dest_range = models.DecimalField(decimal_places=3, max_digits=8, default=0)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Client(AbstractBaseUser):
    class Meta:
        db_table = 'clients'

    USERNAME_FIELD = 'mobile_phone'
    mobile_phone = models.CharField(max_length=32, validators=(MobilePhoneValidator(),), unique=True)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    home = models.PointField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Ride(models.Model):
    class Meta:
        db_table = 'rides'

    class Statuses(DjangoChoices):
        CREATED_BY_CLIENT = ChoiceItem()
        CONFIRMED_BY_CLIENT = ChoiceItem()
        VISIBLE_FOR_DRIVERS = ChoiceItem()
        ACCEPTED_BY_DRIVER = ChoiceItem()
        DRIVER_IS_COMING = ChoiceItem()
        DRIVER_IS_WAITING = ChoiceItem()
        RIDING = ChoiceItem()
        FINISHED = ChoiceItem()

    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='rides')
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, related_name='rides', null=True)
    source = models.PointField()
    destination = models.PointField()
    actual_route = models.LineStringField(null=True, blank=True)
    distance = models.DecimalField(decimal_places=3, max_digits=8, default=0)
    ordered_at = models.DateTimeField(default=tz_now)
    started_at = models.DateTimeField(null=True, blank=True)
    finished_at = models.DateTimeField(null=True, blank=True)
    total_price = models.DecimalField(decimal_places=2, max_digits=7, default=0)
    status = models.CharField(max_length=32, choices=Statuses.choices, default=Statuses.CREATED_BY_CLIENT)

    def __str__(self):
        return f"Ride #{self.pk}"
