# Generated by Django 4.2.4 on 2023-11-16 08:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0014_mapa_cliente_ubicacion_en_mapa'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cliente',
            name='ubicacion_en_mapa',
        ),
        migrations.DeleteModel(
            name='Mapa',
        ),
    ]
