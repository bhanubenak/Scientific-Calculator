document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('calc-display');
    // console.log(display);
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
    // shift-layout-end

    //basic-calculations-will-appear-as-default
    // Set 123 button as default on page load



    // 
    var fxBtn = document.getElementById("Fx");
    var numBtn = document.getElementById("123");

    // Set 123 button as default on page load
    numBtn.style.outline = "none";
    numBtn.style.backgroundColor = "#66a3ff";
    numBtn.style.color = "#0047b3";

    numBtn.addEventListener("click", function () {
        layout2.style.display = "none";
        layout1.style.display = "block";
        numBtn.style.backgroundColor = "#31a3c7";
        fxBtn.style.backgroundColor = "";
        numBtn.style.color = "#0047b3";
        fxBtn.style.color = "";
        numBtn.style.border = "2px solid #3385ff";
        fxBtn.style.outline = "";
    });

    fxBtn.addEventListener("click", function () {
        layout1.style.display = "none";
        layout2.style.display = "block";
        fxBtn.style.color = "#0047b3";
        numBtn.style.color = "";
        fxBtn.style.border = "2px solid #3385ff";
        numBtn.style.outline = "";
        fxBtn.style.backgroundColor = "#31a3c7";
        numBtn.style.backgroundColor = "";
    });
    //basic-calculations-will-appear-as-default------

    // Inverse-buttons
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

    // factorial
    function factorial(num) {
        if (num === 0 || num === 1) {
            return 1;
        } else {
            return num * factorial(num - 1);
        }
    }


    let curr_val = "";

    function evaluateResult() {
        const convertedVal = curr_val
            .replace("×", "*")
            .replace("÷", "/")
            .replace("%", "*0.01")
            .replace('sin', 'Math.sin')
            .replace('sin⁻¹', 'Math.asin')
            .replace('cos', 'Math.cos')
            .replace('cos⁻¹', 'Math.acos')
            .replace('π', 'Math.PI')
            .replace('log', 'Math.log10')
            .replace('ln', 'Math.log')
            .replace('e', 'Math.E')
            .replace('e^', 'Math.exp')
            .replace('tan', 'Math.tan')
            .replace('tan⁻¹', 'Math.atan')
            .replace('√', 'Math.sqrt')
            .replace('10^', 'Math.pow(10,')
            .replace('^2', '**2')
            .replace(/(\d+)!\^(-?1)/g, function (match, num) {
                return Math.pow(factorial(parseInt(num)), -1);
            })
            .replace(/(\d+)!/g, function (match, num) {
                return factorial(parseInt(num));
            })
            .replace(/(\d+\.?\d*)\^(\d+\.?\d*)/g, function (match, num1, num2) {
                return Math.pow(parseFloat(num1), parseFloat(num2));
            })
            .replace(/(\d+)√(\d+)/g, function (match, num1, num2) {
                return Math.pow(parseFloat(num2), 1 / parseFloat(num1));
            });

        const result = eval(convertedVal);
        curr_val = result.toString();
        display.value = curr_val;
    }




    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.addEventListener('click', function () {
            // console.log('button clicked', button.innerHTML);
            const value = button.innerHTML;

            if (value === "AC") {
                curr_val = "";
                display.value = curr_val;

            } else if (value == "Fx") {
                console.log("Fx")

            } else if (value == "123") {
                console.log("123")
            }
            else if (value == "Inv") {
                console.log("Inv")
            }

            else if (value == "=") {
                evaluateResult()
            } else {
                curr_val += value;
                display.value = curr_val;
            }
        })
    }
})