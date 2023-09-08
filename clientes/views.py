from django.shortcuts import render, redirect
from .forms import ClienteForm
from .models import Servicio, Zona, Cliente
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404 

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
            "router",
            "n_serie",
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

def suspender_cliente(request, id):
    # Busca al cliente por su ID o cualquier otro identificador único que estés utilizando
    cliente = get_object_or_404(Cliente, id=id)

    try:
        # Realiza la lógica de suspensión aquí
        # Esto puede incluir la actualización del estado del cliente u otras acciones necesarias
        # Por ejemplo, puedes cambiar el estado de 'activo' a 'suspendido'
        cliente.estado = 'Suspendido'
        cliente.save()

        # Devuelve una respuesta JSON para indicar que la suspensión fue exitosa
        return JsonResponse({'mensaje': 'Cliente suspendido exitosamente.'})
    except Exception as e:
        # Maneja cualquier error que pueda ocurrir durante la suspensión del cliente
        # Devuelve una respuesta JSON de error en caso de error
        return JsonResponse({'error': str(e)}, status=500)
