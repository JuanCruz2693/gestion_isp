from django.urls import path
from clientes import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path('clientes/', views.registrar, name='clientes'),
    path('cargar_clientes/',views.cargar_clientes,name='carga_clientes'),
    path('editar/', views.editar,name='editar'),
    path('baja/<int:id>/', views.baja_logica,name='baja_logica' ),
    path('alta/<int:id>/', views.alta, name='alta'),
    path('suspender/<int:id>/', views.suspender_cliente, name='suspender_cliente'),
]
