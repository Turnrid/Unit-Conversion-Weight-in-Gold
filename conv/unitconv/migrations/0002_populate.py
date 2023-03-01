from django.db import migrations


def populate_db(apps, schema_editor):
    unit_conv = apps.get_model('unitconv', 'unitConvFactors')

    unit = unit_conv(unit_name='T',
                     unit_conv_factor=0.00110231)
    unit.save()

    unit = unit_conv(unit_name='g',
                     unit_conv_factor=1000)
    unit.save()

    unit = unit_conv(unit_name='t_oz',
                     unit_conv_factor=32.1507)
    unit.save()

    unit = unit_conv(unit_name='kg',
                     unit_conv_factor=1)
    unit.save()

    unit = unit_conv(unit_name='lb',
                     unit_conv_factor=2.2046)
    unit.save()

    unit = unit_conv(unit_name='oz',
                     unit_conv_factor=35.274)
    unit.save()


class Migration(migrations.Migration):
    dependencies = [
        ('unitconv', '0001_initial')
    ]

    operations = [
        migrations.RunPython(populate_db)
    ]
