var inputPin = "<a href='#' class='pin input-pin' onClick='ConnectionClick(event)'></a>";
var outputPin = "<a href='#' class='pin output-pin' onClick='ConnectionClick(event)'></a>";
var inputNumberXWithLabel = "<label>X <input type='number' value='0' /></label>";
var inputNumberYWithLabel = "<label>Y <input type='number' value='0' /></label>";
var closeButton = "<a href='#' class='close-button' onClick='deleteNode(this.parentElement)'>X</a>";
var moveHandle = "<a href='#' class='drag-handle'>@</a>";
var createContainer = function(elements) {
    var result = "<div class='node-container'>";
    result += elements.join("\n");
    result += "</div>";
    return result;
}
var  templates = {
    "dodawanie" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        createContainer([inputPin, inputNumberYWithLabel]),
        outputPin,
        moveHandle
        ],
    "odejmowanie" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        createContainer([inputPin, inputNumberYWithLabel]),
        outputPin,
        moveHandle
        ],
    "mnozenie" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        createContainer([inputPin, inputNumberYWithLabel]),
        outputPin,
        moveHandle
        ],
    "dzielenie" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        createContainer([inputPin, inputNumberYWithLabel]),
        outputPin,
        moveHandle
        ],
    "negacja" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        outputPin,
        moveHandle
        ],
    "potegowanie" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        createContainer([inputPin, inputNumberYWithLabel]),
        outputPin,
        moveHandle
        ],
    "pierwiastkowanie" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        createContainer([inputPin, inputNumberYWithLabel]),
        outputPin,
        moveHandle
        ],
    "logarytm" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        createContainer([inputPin, inputNumberYWithLabel]),
        outputPin,
        moveHandle
        ],
    "silnia" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        outputPin,
        moveHandle
        ],
    "modulo" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        createContainer([inputPin, inputNumberYWithLabel]),
        outputPin,
        moveHandle
        ],
    "sinus" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        outputPin,
        moveHandle
        ],
    "cosinus" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        outputPin,
        moveHandle
        ],
    "tangens" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        outputPin,
        moveHandle
        ],
    "cotangens" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        outputPin,
        moveHandle
        ],
    "secans" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        outputPin,
        moveHandle
        ],
    "cosecans" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        outputPin,
        moveHandle
        ],
    "stala_pi" : [
        closeButton,
        outputPin,
        moveHandle
        ],
    "stala_epsilon" : [
        closeButton,
        outputPin,
        moveHandle
        ]
};

var functions = {
  "dodawanie" : function(args) {
    var result = 0;
    for(var i = 0; i < args.length; i++) {
      result += args[i];
    }
    return result;
  },
  "odejmowanie" : function(args) {
    var result = args[0];
    for (var i = 1; i < args.length; i++) {
      result-=args[i];
    }
    return result;
  },
  "mnozenie" : function(args) {
    var result = 1;
    for (var i = 0; i < args.length; i++) {
      result*=args[i];
    }
    return result;
  },
  "dzielenie" : function(args) {
    var result = args[0];
    for (var i = 1; i < args.length; i++) {
      result /=args[i];
    }
    return result;
  },
  "negacja" : function(args) {
    return -args[0];
  },
  "potegowanie" : function(args) {
    var result = 1;
    for (var i = 0; i < args[1]; i++) {
      result *= args[0];
    }
    return result;
  },
  "pierwiastkowanie" : function(args) {
    if(args[0]>=0) {
      return Math.sqrt(args[0]);
    } else {
      return 0;
    }
  },
  "logarytm" : function(args) {
    return Math.log(args[0]);
  },
  "silnia" : function(args) {
    result = args[0];
    var sign = args[0] < 0 ? -1 : 1;
    for (var i = Math.abs(args[0])-1; i > 0; i--) {
      result*=i*sign;
    }
    return result;
  },
  "modulo" : function(args) {
    return args[0]%args[1];
  },
  "sinus" : function(args) {
    return Math.sin(args[0]);
  },
  "cosinus" : function(args) {
    return Math.cos(args[0]);
  },
  "tangens" : function(args) {
    return Math.tan(args[0]);
  },
  "cotangens" : function(args) {
    return Math.ctg(args[0]);
  },
  "secans" : function(args) {
    return this.cosinus(args)/1;
  },
  "cosecans" : function(args) {
    return this.sinus(args)/1;
  },
  "stala_pi" : function(args) {
    return Math.PI;
  },
  "stala_epsilon" : function(args) {
    return Math.E;
  }
};
