from django.urls import path
from . import views


urlpatterns = [
    path('auth/', views.authorize),
    path('signup/', views.signup),
]
