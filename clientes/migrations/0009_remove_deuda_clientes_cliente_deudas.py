# Generated by Django 4.2.4 on 2023-10-31 04:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0008_rename_clientes_clientedeuda_cliente_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='deuda',
            name='clientes',
        ),
        migrations.AddField(
            model_name='cliente',
            name='deudas',
            field=models.ManyToManyField(through='clientes.ClienteDeuda', to='clientes.deuda'),
        ),
    ]
