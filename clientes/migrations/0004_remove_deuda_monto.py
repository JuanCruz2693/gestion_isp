# Generated by Django 4.2.4 on 2023-10-27 19:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0003_deuda_delete_clientedeuda'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='deuda',
            name='monto',
        ),
    ]
