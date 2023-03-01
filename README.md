# Unit Conversion App

When running your django server locally the url for the unit conversion API is localhost:8000/unitconv

## Basics
- The unit conversions that this currently supports is, Ton, lb, kg, troy ounce, gram, ounce.
- The conversion factors for each are to kilograms and goes from the 'from' unit to kg and then to the 'to' unit.
- url schema is '/convert?from=${unit}&to=${unit}&value=${yourValue}'
- Abbreviations are: Ton - T, Pounds - lb, Kilograms - kg, Troy Ounce - t_oz, Gram - g, Ounce - oz.
- Will return a json object with the current unit and the converted value.
