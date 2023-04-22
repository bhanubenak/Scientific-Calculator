document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('calc-display');
    // console.log(display);
    const buttons = document.getElementsByClassName('btn');
    
    basicButton = document.querySelector('.rounded-start-pill');
    fxButton = document.querySelector('.rounded-end-pill');

    let shiftMode = false;
    function toggleShift() {
        shiftMode = !shiftMode;
        let shiftButtons = document.querySelectorAll('.shift-buttons');
        if (shiftMode) {
            shiftButtons.forEach(button => button.style.display = 'flex');
        } else {
            shiftButtons.forEach(button => button.style.display = 'none');
        }
    }
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
    // test
    
    
    // test

    let curr_val = "";

    function evaluateResult() {
        const convertedVal = curr_val
                .replace("×","*")
                .replace("÷","/")
                .replace("%","*0.01")

        const result = eval(convertedVal);
        curr_val = result.toString();
        display.value = curr_val;
    }



    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.addEventListener('click', function () {
            console.log('button clicked', button.innerHTML);
            const value = button.innerHTML;

            if (value === "AC") {
                curr_val = "";
                display.value = curr_val;

            } else if (value == "Fx"){

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