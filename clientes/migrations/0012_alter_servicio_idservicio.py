# Generated by Django 4.2.4 on 2023-11-07 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0011_alter_servicio_idservicio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='servicio',
            name='idServicio',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
