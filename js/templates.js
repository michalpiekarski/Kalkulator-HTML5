var inputPin = "<div class='pin input-pin'></div>";
var outputPin = "<div class='pin output-pin'></div>";
var inputNumberXWithLabel = "<label>X<input type='number' /></label>";
var inputNumberYWithLabel = "<label>Y<input type='number' /></label>";
var  templates = {
    "dodawanie" : [inputPin, inputNumberXWithLabel, inputPin, inputNumberYWithLabel, outputPin],
    "odejmowanie" : [inputPin, inputNumberXWithLabel, inputPin, inputNumberYWithLabel, outputPin],
    "mnozenie" : [inputPin, inputNumberXWithLabel, inputPin, inputNumberYWithLabel, outputPin],
    "dzielenie" : [inputPin, inputNumberXWithLabel, inputPin, inputNumberYWithLabel, outputPin],
    "negacja" : [inputPin, inputNumberXWithLabel, outputPin],
    "potegowanie" : [inputPin, inputNumberXWithLabel, inputPin, inputNumberYWithLabel, outputPin],
    "pierwiastkowanie" : [inputPin, inputNumberXWithLabel, inputPin, inputNumberYWithLabel, outputPin],
    "logarytm" : [inputPin, inputNumberXWithLabel, inputPin, inputNumberYWithLabel, outputPin],
    "silnia" : [inputPin, inputNumberXWithLabel, outputPin],
    "modulo" : [inputPin, inputNumberXWithLabel, inputPin, inputNumberYWithLabel, outputPin],
    "sinus" : [inputPin, inputNumberXWithLabel, outputPin],
    "cosinus" : [inputPin, inputNumberXWithLabel, outputPin],
    "tangens" : [inputPin, inputNumberXWithLabel, outputPin],
    "cotangens" : [inputPin, inputNumberXWithLabel, outputPin],
    "secans" : [inputPin, inputNumberXWithLabel, outputPin],
    "cosecans" : [inputPin, inputNumberXWithLabel, outputPin],
    "stala_pi" : [outputPin],
    "stala_epsilon" : [outputPin]
};
