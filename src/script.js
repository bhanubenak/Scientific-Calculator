document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById('calc-display');
  const buttons = document.getElementsByClassName('btn');


  // shift-layout-start
  var fxBtn = document.getElementById("Fx");
  var layout1 = document.getElementById("layout1");
  var layout2 = document.getElementById("layout2");

  fxBtn.addEventListener("click", function () {
    layout1.style.display = "none";
    layout2.style.display = "block";
  });

  var numBtn = document.getElementById("123");

  numBtn.addEventListener("click", function () {
    layout2.style.display = "none";
    layout1.style.display = "block";
  });

  layout2.style.display = "none";
  layout1.style.display = "block";


  // var fxBtn = document.getElementById("Fx");
  // var numBtn = document.getElementById("123");

  // Set 123-button as default on page load
  numBtn.style.outline = "none";
  numBtn.style.backgroundColor = "#0d6efd";
  numBtn.style.color = "#ffffff ";

  numBtn.addEventListener("click", function () {
    layout2.style.display = "none";
    layout1.style.display = "block";
    numBtn.style.backgroundColor = "#0d6efd";
    fxBtn.style.backgroundColor = "";
    numBtn.style.color = "#ffffff";
    fxBtn.style.color = "";
    numBtn.style.border = "2px solid #0d6efd";
    fxBtn.style.outline = "";
  });

  fxBtn.addEventListener("click", function () {
    layout1.style.display = "none";
    layout2.style.display = "block";
    fxBtn.style.color = "#ffffff";
    numBtn.style.color = "";
    fxBtn.style.border = "2px solid #0d6efd";
    numBtn.style.outline = "";
    fxBtn.style.backgroundColor = "#0d6efd";
    numBtn.style.backgroundColor = "";
  });
  //basic-calculations-will-appear-as-default------

  // --------Inverse-buttons-------------
  var invBtn = document.getElementById("Inv");
  // console.log("invbtn", invBtn);
  var buttonsHide = document.querySelectorAll(".d-hid");
  var buttonsDefault = document.querySelectorAll(".d-def");
  // console.log("button_hide", buttonsHide);

  invBtn.addEventListener("click", function () {
    for (var i = 0; i < buttonsDefault.length; i++) {
      var button = buttonsDefault[i];
      if (button.classList.contains("d-def")) {
        button.classList.remove("d-def");
        button.classList.add("d-hid");
      } else if (button.classList.contains("d-hid")) {
        button.classList.remove("d-hid");
        button.classList.add("d-def");
      }
    }
    for (var i = 0; i < buttonsHide.length; i++) {
      var button = buttonsHide[i];
      if (button.classList.contains("d-def")) {
        button.classList.remove("d-def");
        button.classList.add("d-hid");
      } else if (button.classList.contains("d-hid")) {
        button.classList.remove("d-hid");
        button.classList.add("d-def");
      }
    }
  });

  // calculation-operation
  function buttonClick(val) {
    let display = document.querySelector('#display');
    display.value += val;
  }
  function clearDisplay() {
    let display = document.querySelector('#display');
    display.value = '';
  }

  function evaluate() {
    let display = document.querySelector('#display');
    try {
      let result = eval(display.value);
      display.value = result;
    } catch (error) {
      display.value = 'Error';
    }
  }

  let curr_val = "";

  //   toggle-function-for-Rad-|-Deg-buttons
  const radBtn = document.querySelector('.rad-btn');
  const degBtn = document.querySelector('.deg-btn');
  // Adding-active-class-to-the-radBtn-by-default
  radBtn.classList.add('active');
  // Add-event-listeners-to-the-buttons
  radBtn.addEventListener('click', toggleRadDeg);
  degBtn.addEventListener('click', toggleRadDeg);
  //It-will-toggle-the-button-and-update-the-class
  function toggleRadDeg(event) {
    const clickedBtn = event.target;
    if (!clickedBtn.classList.contains('active')) {
      radBtn.classList.toggle('active');
      degBtn.classList.toggle('active');
    }
  }

  function evaluateResult() {
    console.log('currentValue:', curr_val);

    // function to convert various mathematical expressions to valid JavaScript syntax
    function convertValues(curr_val) {
      curr_val = curr_val.replace(/π/g, 'Math.PI'); // replace π with Math.PI
      curr_val = curr_val.replace(/e/gi, 'Math.E'); // replace e with Math.E
      curr_val = curr_val.replace(/\u221A([\d\.]+)/gi, 'Math.sqrt($1)'); // replace square root symbol with Math.sqrt function
      curr_val = curr_val.replace(/\^/g, "**"); // replace ^ with **
      curr_val = curr_val.replace(/(\d)x\^2/g, '$1*Math.pow(x,2)'); // replace x^2 with Math.pow(x,2)

      // Add case for x^y operation
      curr_val = curr_val.replace(/(\d+)x\^y/g, '$1*Math.pow(x,'); // replace x^y with Math.pow(x, y)

      // Convert degrees to radians
      if (degBtn.classList.contains('active')) {
        curr_val = curr_val.replace(/asin/gi, 'Math.asin');
        curr_val = curr_val.replace(/acos/gi, 'Math.acos');
        curr_val = curr_val.replace(/atan/gi, 'Math.atan');
        curr_val = curr_val.replace(/sin\(([^)]+)\)/gi, 'Math.sin($1/180*Math.PI)');
        console.log("value of current-value:   ", curr_val);
        curr_val = curr_val.replace(/cos\(([^)]+)\)/gi, 'Math.cos($1/180*Math.PI)');
        curr_val = curr_val.replace(/tan\(([^)]+)\)/gi, 'Math.tan($1/180*Math.PI)');
      } else {
        curr_val = curr_val.replace(/asin/gi, 'Math.asin');
        console.log("value of current-value:   ", curr_val);
        curr_val = curr_val.replace(/acos/gi, 'Math.acos');
        curr_val = curr_val.replace(/atan/gi, 'Math.atan');
        curr_val = curr_val.replace(/sin/gi, 'Math.sin');
        curr_val = curr_val.replace(/cos/gi, 'Math.cos');
        curr_val = curr_val.replace(/tan/gi, 'Math.tan');
      }

      curr_val = curr_val.replace(/log/gi, 'Math.log10');
      console.log("logging the value:", curr_val);
      curr_val = curr_val.replace(/ln/gi, 'Math.log'); // replace ln with Math.log
      curr_val = curr_val.replace(/(\d+)d/gi, '($1*Math.PI/180)'); // replace degrees with radians
      curr_val = curr_val.replace(/(\d+\.\d+)?π(\d+\.\d+)?/gi, function (match, p1, p2) {
        const num1 = p1 ? parseFloat(p1) : 1;
        const num2 = p2 ? parseFloat(p2) : 1;
        return num1 * Math.PI * num2;
      });
      console.log("logg-2:", curr_val);
      curr_val = curr_val.replace(/(\d+\.\d+)?√(\d+\.\d+)?/gi, function (match, p1, p2) {
        const num = p1 || p2;
        console.log("logg-2:", curr_val);
        return 'Math.sqrt(' + num + ')';
      });
      console.log("logg-3:", curr_val);
      curr_val = curr_val.replace(/\%/g, '/100'); // replace % with /100
      console.log("logg-4:", curr_val);
      curr_val = curr_val.replace(/(\d+)\s?\/\s?(\d+)/g, '($1/$2)'); // add parentheses around division
      console.log("logg-5:", curr_val);
      // curr_val = curr_val.replace(/(\d+)(\()/g, '$1*$2'); // add multiplication sign before opening parenthesis
      // console.log("logg-6:", curr_val);
      curr_val = curr_val.replace(/(\))(\d+)/g, '$1*$2'); // add multiplication sign after closing parenthesis
      console.log("logg-7:", curr_val);
      curr_val = curr_val.replace(/\u00D7/g, '*'); // replace × with *
      console.log("logg-8:", curr_val);
      curr_val = curr_val.replace(/\u00F7/g, '/'); // replace ÷ with /
      console.log("logg-9:", curr_val);
      curr_val = curr_val.replace(/(\d+)!/g, 'factorial($1)'); // replace factorial symbol with the corresponding function
      console.log("logg-10:", curr_val);

      // for yth root of x
      curr_val = curr_val.replace(/([0-9.]+)√([0-9.]+)/gi, function (match, p1, p2) {
        const x = parseFloat(p2);
        const y = parseFloat(p1);
        const result = Math.pow(x, 1/y);
        return result.toFixed(2); // Return result rounded to 2 decimal places
      });
      
      // Replace inverse trigonometric function symbols with valid syntax
      curr_val = curr_val.replace(/([a-z]+)⁻¹\(([^)]+)\)/gi, function (match, p1, p2) {
        console.log("logg-11:", curr_val);
        const func = 'Math.' + p1 + '(' + p2 + ')';
        console.log("log-12", curr_val);
        return 'PI/2 - Math.asin(' + func + ')';
        console.log("returning trig:", curr_val);
      });

      console.log("Returning value:", curr_val);
      return curr_val;
    }

    // function to calculate the factorial of a number
    function factorial(num) {
      let res = 1;
      for (let i = 2; i <= num; i++) {
        res *= i;
      }
      return res;
    }

    // function to convert degrees to radians
    function convertToRadians(degrees) {
      return degrees * (Math.PI / 180);
    }

    const convertedValue = convertValues(curr_val);
    console.log('convertedValue:', convertedValue);

    let result;
    try {
      result = eval(convertedValue); // evaluate the expression using eval function
    } catch (error) {
      console.log('Error:', error);
      curr_val = 'Error';
      display.value = curr_val;
      return;
    }

    if (curr_val.includes("rad")) {
      const value = parseFloat(curr_val);
      const result = convertToRadians(value); // convert degrees to radians
      curr_val = result.toString();
      display.value = curr_val;
    } else {
      curr_val = result.toString();
      display.value = curr_val;
    }
  }


  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener('click', function () {
      const value = button.innerHTML;

      switch (value) {
        case "AC":
          curr_val = "";
          display.value = curr_val;
          break;
        case "Fx":
          console.log("Fx");
          break;
        case "123":
          console.log("123");
          break;
        case "Inv":
          console.log("Inv");
          break;
        case "Rad":
          console.log("Rad");
          break;
        case "Deg":
          console.log("Deg");
          break;
        case "=":
          evaluateResult();
          break;
        default:
          curr_val += value;
          display.value = curr_val;
          break;
      }
    });
  }


  /*

  function evaluateResult() {
      const operators = {
          '\u207B': '-',
          '×': '*',
          '÷': '/',
          '%': '*0.01',
          'π': 'Math.PI',
      };

      const functions = {
          'sin': 'Math.sin',
          'cos': 'Math.cos',
          'tan': 'Math.tan',
          'asin': 'Math.asin',
          'acos': 'Math.acos',
          'atan': 'Math.atan',
          'log': 'Math.log10',
          'ln': 'Math.log',
          'exp': 'Math.exp',
          'sqrt': 'Math.sqrt',
          'pow': 'Math.pow.bind(null, 10)'
      };

      const replacedOperators = curr_val
          .replace(/[\u207B]|×|÷|%|sin⁻¹|cos⁻¹|tan⁻¹|π|log|ln|e|e^|√|10\^|\^2/g, function (match) {
              return operators[match] || functions[match] || match;
          });

      function factorial(num) {
          if (num < 0) return;
          if (num === 0) return 1;
          let result = 1;
          for (let i = 1; i <= num; i++) {
              result *= i;
          }
          return result;
      }

      const replacedFactorial = replacedOperators
          .replace(/(\d+)!\^(-?1)|(\d+)!|(\d+\.?\d*)\^(\d+\.?\d*)|(\d+)√(\d+)/g, function (match, num1, power, factorial, num2, num3) {
              if (factorial) {
                  return factorial(parseInt(factorial));
              }
              if (power) {
                  return Math.pow(parseFloat(num1), parseFloat(power));
              }
              if (num3) {
                  return Math.pow(parseFloat(num2), 1 / parseFloat(num3));
              }
              return match;
          });

      const convertedVal = replacedFactorial;

      const result = eval(convertedVal);
      curr_val = result.toString();
      display.value = curr_val;
  }

  for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      button.addEventListener('click', function () {
          const value = button.innerHTML;

          switch (value) {
              case "AC":
                  curr_val = "";
                  display.value = curr_val;
                  break;
              case "Fx":
                  console.log("Fx");
                  break;
              case "123":
                  console.log("123");
                  break;
              case "Inv":
                  console.log("Inv");
                  break;
              case "Rad":
                  console.log("Rad");
                  break;
              case "deg":
                  console.log("Deg");
                  break;


              case "=":
                  evaluateResult();
                  break;
              default:
                  curr_val += value;
                  display.value = curr_val;
                  break;
          }
      });
  }

  */
})