from rest_framework.routers import DefaultRouter
from .views import DriverViewSet, ClientViewSet, RideViewSet


router = DefaultRouter()

router.register('drivers', DriverViewSet, basename='driver')
router.register('clients', ClientViewSet, basename='client')
router.register('rides', RideViewSet, basename='ride')

urlpatterns = router.urls
