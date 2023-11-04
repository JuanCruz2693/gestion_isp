# Generated by Django 4.2.4 on 2023-10-30 00:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0005_remove_cliente_idservicio_cliente_servicio_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='deuda',
            name='fecha_pago',
        ),
        migrations.RemoveField(
            model_name='deuda',
            name='monto_pagado',
        ),
        migrations.RemoveField(
            model_name='deuda',
            name='pagado',
        ),
        migrations.RemoveField(
            model_name='deuda',
            name='cliente',
        ),
        migrations.CreateModel(
            name='ClienteDeuda',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('monto', models.DecimalField(decimal_places=2, max_digits=10, null=True)),
                ('monto_pagado', models.DecimalField(decimal_places=2, max_digits=10, null=True)),
                ('pagado', models.BooleanField(default=False)),
                ('fecha_pago', models.DateField(null=True)),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clientes.cliente')),
                ('deuda', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clientes.deuda')),
            ],
        ),
        migrations.AddField(
            model_name='deuda',
            name='cliente',
            field=models.ManyToManyField(through='clientes.ClienteDeuda', to='clientes.cliente'),
        ),
    ]
