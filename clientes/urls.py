from django.urls import path
from clientes import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path('clientes/', views.form_clientes, name='clientes'),
    path('cargar_clientes/',views.cargar_clientes,name='carga_clientes')
]
