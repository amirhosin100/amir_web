from django.urls import path

from apps.account.views import LoginView

app_name = "account"

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
]
