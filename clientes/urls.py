from django.urls import path
from clientes import views
from . import views

urlpatterns = [
    path('', views.login_view, name='login'),
    path('home/', views.home, name='home'),
    path('clientes/', views.registrar, name='clientes'),
    path('cargar_clientes/',views.cargar_clientes,name='carga_clientes'),
    path('editar/', views.editar,name='editar'),
    path('baja/<int:id>/', views.baja_logica,name='baja_logica' ),
    path('alta/<int:id>/', views.alta, name='alta'),
    path('suspender/<int:id>/', views.suspender_cliente, name='suspender_cliente'),
    path('users/logout/', views.logout_view, name='logout'),
    path('generar_deuda/', views.generar_deuda, name='generar_deuda'),
    path('pagar_deuda/', views.registrar_pago, name='pagar'),
    path('servicios/', views.servicios, name='servicios'),
    path('eliminar_servicio/<int:servicio_id>/', views.eliminar_servicio, name='eliminar_servicio'),
    path('editar_servicio/<int:servicio_id>/', views.editar_servicio, name='editar_servicio'),
]