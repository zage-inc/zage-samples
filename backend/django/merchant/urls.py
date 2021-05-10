from django.urls import path

from . import views

app_name = "merchant"
urlpatterns = [
    path("payment-create-intent", views.payment_create_intent, name="create_intent"),
    path("payment-submit-intent", views.payment_submit_intent, name="submit_intent"),
]
