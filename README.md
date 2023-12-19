# Getting Started
- This is using django to host the api and the website so make sure you have that installed, `pip install django`
- Once installed and in the `/conv` folder run, `python manage.py runserver` to get it started

## Unit Conversion App

When running your django server locally the url for the unit conversion API is localhost:8000/unitconv

## Basics
- The unit conversions that this currently supports is, Ton, lb, kg, troy ounce, gram, ounce.
- The conversion factors for each are to kilograms and goes from the 'from' unit to kg and then to the 'to' unit.
- url schema is '/convert?from=${unit}&to=${unit}&value=${yourValue}'
- Abbreviations are: Ton - T, Pounds - lb, Kilograms - kg, Troy Ounce - t_oz, Gram - g, Ounce - oz.
- Will return a json object with the current unit and the converted value.

# Worth Your Weight In Gold

When running your django server locally the url for the Worth Your Weight In Gold web application is localhost:8000/gold. 

## Basics
- A webpage that pulls the current price of gold per Troy Ounce
- User can input a value and adjust the unit to compute the price of gold for that value
- When computed the date and time when it was computed with the price will appear and can be removed with a left click
