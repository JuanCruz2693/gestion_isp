# Generated by Django 4.2.4 on 2023-08-14 23:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0001_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='clientedeuda',
            unique_together={('cliente', 'deuda')},
        ),
    ]