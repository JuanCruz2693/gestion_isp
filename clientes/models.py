from django.db import models
import datetime


# Create your models here.
class Zona(models.Model):
    id = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre


class Servicio(models.Model):
    idServicio = models.IntegerField(primary_key=True)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    tipo_plan = models.CharField(max_length=45)
    cantidad_megas = models.CharField(max_length=45)

    def __str__(self):
        return (
            "Plan: "
            + self.tipo_plan
            + " - Megas: "
            + self.cantidad_megas
            + " - Monto: $"
            + str(self.monto)
        )


class Dueda(models.Model):
    id_deuda = models.AutoField(primary_key=True)
    mes = models.DateField()


class Cliente(models.Model):
    dni = models.CharField(max_length=10,unique=True)
    apellido = models.CharField(max_length=100)
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=200)
    telefono = models.CharField(max_length=15)
    ESTADOS = [
        ['A' ,'A'],
        ['B', 'B'],
        ['S', 'S']
    ]
    router = models.CharField(max_length=30, default='Mercusi')
    n_serie = models.BigIntegerField(default= 1234567893)
    estado = models.CharField(max_length=1, default="A",choices=ESTADOS)
    observaciones = models.TextField()
    fecha_alta = models.DateField(default= datetime.date.today )
    idServicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, verbose_name='Servicio')
    zona = models.ForeignKey(Zona, on_delete=models.CASCADE)

    def __str__(self):
        return (
            "Nombre: "
            + self.nombre
            + " Apellido: "
            + self.apellido
            + " DNI: "
            + self.dni
        )


class ClienteDeuda(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    deuda = models.ForeignKey(Dueda, on_delete=models.CASCADE)
    fecha_pago = models.DateField()
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    pagado = models.BooleanField(default=False)

    class Meta:
        unique_together = ("cliente", "deuda")

