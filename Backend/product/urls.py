from django.urls import path

app_name = 'product'

urlpatterns = [
    path('<slug:category_slug>/')

]