from rest_framework import routers
from .api import PersonViewSet

router = routers.DefaultRouter()
router.register('api/people', PersonViewSet, 'people')

urlpatterns = router.urls