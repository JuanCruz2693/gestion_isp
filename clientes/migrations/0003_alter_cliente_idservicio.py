# Generated by Django 4.2.4 on 2023-08-15 01:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0002_alter_clientedeuda_unique_together'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='idServicio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clientes.servicio'),
        ),
    ]