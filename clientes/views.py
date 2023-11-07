from django.shortcuts import render, redirect
from .forms import ClienteForm, DeudaForm
from .models import Servicio, Zona, Cliente, Deuda, ClienteDeuda
from django.http.response import JsonResponse
from datetime import datetime
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


# Create your views here.

from .forms import LoginForm


def login_view(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            user = authenticate(request, username=username, password=password)

            if user:
                login(request, user)
                return redirect("home")
            else:
                form.add_error(
                    None,
                    "Usuario y/o Contraseña Incorrecta. Por favor, inténtalo de nuevo.",
                )
    else:
        form = LoginForm()

    return render(request, "users/login.html", {"form": form})


def logout_view(request):
    logout(request)
    return redirect("login")


@login_required(login_url="login")
def home(request):
    clientes = Cliente.objects.count()
    return render(request, "home.html", {"clientes": clientes})


def cargar_clientes(request):
    clientes_deudas = ClienteDeuda.objects.select_related("cliente", "deuda")
    data = []
    processed_client_ids = set()
    for cliente_deuda in clientes_deudas:
        cliente = cliente_deuda.cliente
        if cliente.id not in processed_client_ids:
            deudas_data = []
            for cd in ClienteDeuda.objects.filter(cliente=cliente):
                deuda_info = {
                    "mes_deuda": cd.deuda.mes_deuda,
                    "año_deuda": cd.deuda.año_deuda,
                    "fecha_pago": cd.fecha_pago,
                    "monto_pagado": cd.monto_pagado,
                    "pagado": cd.pagado,
                    "monto": cd.monto
                }
                deudas_data.append(deuda_info)

            cliente_data = {
                "id": cliente.id,
                "dni": cliente.dni,
                "apellido": cliente.apellido,
                "nombre": cliente.nombre,
                "direccion": cliente.direccion,
                "telefono": cliente.telefono,
                "estado": cliente.estado,
                "router": cliente.router,
                "n_serie": cliente.n_serie,
                "observaciones": cliente.observaciones,
                "fecha_alta": cliente.fecha_alta,
                "servicio__tipo_plan": cliente.servicio.tipo_plan,
                "servicio__monto": cliente.servicio.monto,
                "zona__nombre": cliente.zona.nombre,
                "deudas": deudas_data,
            }
            data.append(cliente_data)
            processed_client_ids.add(cliente.id)
    return JsonResponse({"clientes": data})


@login_required(login_url="login")
def registrar(request):
    form_deuda = DeudaForm(request.POST or None)
    formulario = ClienteForm(request.POST or None)
    servicios = Servicio.objects.all()
    zonas = Zona.objects.all()
    if formulario.is_valid():
        formulario.save()
        return JsonResponse({"success": "Cliente guardado con exito"}, status=200)
    contexto = {
        "formulario": formulario,
        "servicios": servicios,
        "zonas": zonas,
        "form_deuda": form_deuda,
    }
    return render(request, "Clientes.html", contexto)


def editar(request):
    id = request.POST.get("form-edicion-id")
    cliente = Cliente.objects.get(id=id)
    formulario = ClienteForm(request.POST, instance=cliente)
    if formulario.is_valid():
        formulario.save()
        return JsonResponse({"success": "Cliente editado con exito"})
    print(formulario.errors)
    return redirect("clientes")


def baja_logica(request, id):
    if request.method == "POST":
        cliente = Cliente.objects.get(id=id)
        cliente.estado = "B"
        cliente.save()
        return JsonResponse({"message": "Baja realizada correctamente"})


def alta(request, id):
    if request.method == "POST":
        cliente = Cliente.objects.get(id=id)
        cliente.estado = "A"
        cliente.save()
        return JsonResponse({"message": "Alta exitosa"})


def suspender_cliente(request, id):
    if request.method == "POST":
        cliente = Cliente.objects.get(id=id)
        cliente.estado = "S"
        cliente.save()
        return JsonResponse({"message": "Suspendido exitosamente"})


def generar_dedua(request):
    form_deuda = DeudaForm(request.POST or None)
    if form_deuda.is_valid():
        mes = form_deuda.cleaned_data["mes_deuda"]
        año = form_deuda.cleaned_data["año_deuda"]
        clientes = Cliente.objects.all()
        deuda = Deuda(mes_deuda=mes, año_deuda=año)
        deuda.save()
        for cliente in clientes:
            cliente.deudas.add(
                deuda, through_defaults={"monto": cliente.servicio.monto}
            )
        response_data = {"success": "Deuda generada exitosamente"}
        return JsonResponse(response_data, status=200)
    else:
        response_data = {"error": "Error al generar la deuda"}
        return JsonResponse(response_data, status=400)
