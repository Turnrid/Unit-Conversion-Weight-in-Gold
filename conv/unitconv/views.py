from django.http import JsonResponse
from .models import unitConvFactors


# Create your views here.

def convert(request):
    for k, v in request.GET.items():
        print(f" GET parameter {k} => {v}")
    resp = {}

    if "from" not in request.GET:
        resp['error'] = "Usage: from=[valid unit type needed]"
    elif "to" not in request.GET:
        resp['error'] = "Usage: to=[valid unit type needed]"
    elif "value" not in request.GET:
        resp['error'] = "Usage: value=[non-negative float needed]"
    elif not request.GET['value'].isdigit():
        resp['error'] = "Usage: value=[non-negative float needed]"
    else:
        f = request.GET['from']
        to = request.GET['to']
        value = request.GET['value']
        value = float(value)

        unitFrom = unitConvFactors.objects.filter(unit_name=f)
        unitTo = unitConvFactors.objects.filter(unit_name=to)

        if unitFrom.exists() and unitTo.exists():

            value = value / unitFrom.values("unit_conv_factor").get().get("unit_conv_factor")
            value = value * unitTo.values("unit_conv_factor").get().get("unit_conv_factor")

            resp = {
                'units': to,
                'value': value
            }
        else:
            resp['error'] = 'Usage: Conversion not in db'

    j = JsonResponse(resp)

    if 'Origin' in request.headers:
        j["Access-Control-Allow-Origin"] = request.headers['Origin']
    else:
        j["Access-Control-Allow-Origin"] = '*'

    return j
