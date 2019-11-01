from django.contrib.gis.geos import MultiPolygon, Polygon, Point, LineString
from django.core.management import BaseCommand
from django.db import IntegrityError

from ...models import Driver, Client, Ride


class Command(BaseCommand):
    def handle(self, *args, **options):
        self.stdout.write("Drivers creation...")
        try:
            Driver.objects.bulk_create([
                Driver(
                    first_name="Emily",
                    last_name="Brown",
                    mobile_phone="+1829723864861",
                    password="pass",
                    dest_range=0.0,
                    home_area=MultiPolygon(Polygon([
                        [
                            25.4827880859375,
                            48.151428143221224
                        ],
                        [
                            26.312255859375,
                            48.151428143221224
                        ],
                        [
                            26.312255859375,
                            48.44742209577055
                        ],
                        [
                            25.4827880859375,
                            48.44742209577055
                        ],
                        [
                            25.4827880859375,
                            48.151428143221224
                        ]
                    ]))
                ),
                Driver(
                    first_name="Jack",
                    last_name="Jones",
                    mobile_phone="+182137823813",
                    password="pass",
                    dest_range=0.0,
                    home_area=MultiPolygon(Polygon([
                        [
                            24.1644287109375,
                            48.75981008089207
                        ],
                        [
                            25.1531982421875,
                            48.75981008089207
                        ],
                        [
                            25.1531982421875,
                            49.01985919086641
                        ],
                        [
                            24.1644287109375,
                            49.01985919086641
                        ],
                        [
                            24.1644287109375,
                            48.75981008089207
                        ]
                    ]))
                ),
                Driver(
                    first_name="Grace",
                    last_name="Williams",
                    mobile_phone="+182913818231",
                    password="pass",
                    dest_range=0.0,
                    home_area=MultiPolygon(Polygon([
                        [
                            25.153198242187514,
                            49.42169406084926
                        ],
                        [
                            26.141967773437514,
                            49.42169406084926
                        ],
                        [
                            26.141967773437514,
                            49.67829251994456
                        ],
                        [
                            25.153198242187514,
                            49.67829251994456
                        ],
                        [
                            25.153198242187514,
                            49.42169406084926
                        ]
                    ]))
                ),
                Driver(
                    first_name="Leo",
                    last_name="Johnson",
                    mobile_phone="+13893833443232",
                    password="pass",
                    dest_range=0.0,
                    home_area=MultiPolygon(Polygon([
                        [
                            30.2069091796875,
                            50.198001033269506
                        ],
                        [
                            30.899047851562504,
                            50.198001033269506
                        ],
                        [
                            30.899047851562504,
                            50.61461743826626
                        ],
                        [
                            30.2069091796875,
                            50.61461743826626
                        ],
                        [
                            30.2069091796875,
                            50.198001033269506
                        ]
                    ]))
                ),
            ])
            self.stdout.write("Drivers successfully created")
        except IntegrityError:
            self.stdout.write("Drivers already created")

        self.stdout.write("Clients creation...")
        try:
            Client.objects.bulk_create([
                Client(
                    first_name="Mila",
                    last_name="Jones",
                    mobile_phone="+1111111",
                    password="pass",
                    home=Point([
                        30.526885986328125,
                        50.44263847959072
                    ])
                ),
                Client(
                    first_name="Joshua",
                    last_name="Johnson",
                    mobile_phone="+13989829484343",
                    password="pass",
                    home=Point([
                        25.927734374999996,
                        48.31242790407178
                    ])
                ),
                Client(
                    first_name="Andrew",
                    last_name="Williams",
                    mobile_phone="+16387123984984",
                    password="pass",
                    home=Point([
                        25.576171875,
                        49.468124067331644
                    ])
                ),
                Client(
                    first_name="Victoria",
                    last_name="Brown",
                    mobile_phone="+178327471827",
                    password="pass",
                    home=Point([
                        35.28808593749999,
                        47.635783590864854
                    ])
                ),

            ])
            self.stdout.write("Clients successfully created")
        except IntegrityError:
            self.stdout.write("Clients already created")

        self.stdout.write("Rides creation...")
        if Ride.objects.exists():
            self.stdout.write("Rides already created")
            return

        start, end = Point(31.426998, 48.94038), Point(24.356001, 48.495708)
        Ride.objects.create(
            client=Client.objects.first(),
            source=start,
            destination=end,
            actual_route=LineString((start, end))
        )
        self.stdout.write("Ride successfully created")
