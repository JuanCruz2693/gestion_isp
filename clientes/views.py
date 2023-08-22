from django.shortcuts import render,redirect
from .forms import ClienteForm
from .models import Servicio,Zona,Cliente
from django.http.response import JsonResponse

# Create your views here.
def home(request):
    return render(request,'home.html')

def cargar_clientes(request):
    clientes= list(Cliente.objects.select_related('zona', 'idServicio').values('id','dni', 'apellido', 'nombre', 'direccion', 'telefono', 'estado', 'observaciones', 'fecha_alta', 'idServicio__tipo_plan', 'zona__nombre'))
    data={'clientes': clientes}
    return JsonResponse(data)


def form_clientes(request):
    formulario = ClienteForm(request.POST or None)
    servicios = Servicio.objects.all()
    zonas = Zona.objects.all()
    if formulario.is_valid():
        formulario.save()
        return redirect('clientes')
    contexto= {'formulario': formulario, 'servicios': servicios, 'zonas': zonas}
    return render(request, 'Clientes.html', contexto)

