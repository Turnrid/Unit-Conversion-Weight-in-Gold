from django.shortcuts import render
from django.http import JsonResponse
import requests

# Create your views here.


def index(request):
    return render(request, 'gold/index.html')


def gold_price_proxy(request):
    # Extract parameters from the incoming request
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')

    print(request)

    # Construct the NASDAQ API URL
    api_url = f"https://data.nasdaq.com/api/v3/datasets/LBMA/GOLD.json?&start_date={start_date}&end_date={end_date}&api_key=dttPFDoxJexSHpTUxGYM"

    # Make the request to the NASDAQ API
    response = requests.get(api_url)

    # Return the response as JSON
    return JsonResponse(response.json())