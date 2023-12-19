from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name="index"),
        path('api/gold-price-proxy', views.gold_price_proxy, name='gold_price_proxy'),
]