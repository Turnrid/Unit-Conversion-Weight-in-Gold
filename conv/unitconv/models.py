from django.db import models


# Create your models here.

class unitConvFactors(models.Model):
    unit_name = models.CharField(max_length=100)
    unit_conv_factor = models.FloatField()
