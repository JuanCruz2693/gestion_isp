from django.shortcuts import render, redirect
from .forms import ClienteForm
from .models import Servicio, Zona, Cliente
from django.http.response import JsonResponse


# Create your views here.
def home(request):
    clientes = Cliente.objects.count()
    return render(request, "home.html", {"clientes": clientes})


def cargar_clientes(request):
    clientes = list(
        Cliente.objects.select_related("zona", "idServicio").values(
            "id",
            "dni",
            "apellido",
            "nombre",
            "direccion",
            "telefono",
            "estado",
            "observaciones",
            "fecha_alta",
            "idServicio__tipo_plan",
            "idServicio__monto",
            "zona__nombre",
        )
    )
    data = {"clientes": clientes}
    return JsonResponse(data)


def registrar(request):
    formulario = ClienteForm(request.POST or None)
    servicios = Servicio.objects.all()
    zonas = Zona.objects.all()
    if formulario.is_valid():
        formulario.save()
        return redirect("clientes")
    contexto = {"formulario": formulario, "servicios": servicios, "zonas": zonas}
    return render(request, "Clientes.html", contexto)

def editar(request):
    id = request.POST.get('form-edicion-id')
    cliente = Cliente.objects.get(id=id)
    formulario = ClienteForm(request.POST or None, instance=cliente)
    if formulario.is_valid() and request.method == 'POST':
        formulario.save()
        return redirect('clientes')
    return render(request,"Clientes.html", {'formulario': formulario})

def baja_logica(request,id):
    if request.method == 'POST':
        cliente = Cliente.objects.get(id=id)
        cliente.estado = 'B'
        cliente.save()
        return JsonResponse({'message':'Baja realizada correctamente'})


def alta(request,id):
    if request.method == 'POST':
        cliente = Cliente.objects.get(id=id)
        cliente.estado = 'A'
        cliente.save()
        return JsonResponse({'message':'Alta exitosa'})