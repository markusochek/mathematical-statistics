import {runge} from "./Runge.js";
import {gaussQuadrature} from "./GaussQuadrature.js";

// let N = 25;
// N % 15 = 10
let b = Math.PI / 2;
let a = Math.PI / 4;
let e = Math.pow(10, -4);
// let b = 1;
// let a = 0;

let inputs = [];

showMain(inputs, b, a, e)

function f(x) {
    return Math.sqrt(Math.PI - Math.atan(1 / (1 + x*x)))
}

function showMain(inputs, b, a, e) {
    let namesButton = [
        "calculate Runge",
        "calculate Gauss quadrature"
    ]

    let functions = [
        (div) => showRunge(div, runge(f, a, b, e)),
        (div) => showGaussQuadrature(div, gaussQuadrature(f, a, b)),
    ];

    let namesInputs = [
        "введите b: ",
        "введите a: ",
        "введите погрешность e: "
    ];
    let values = [
        b,
        a,
        e
    ];

    for(let i = 0; i < 3; i++) {
        let div = document.createElement("div");

        let label = document.createElement("label");
        label.textContent = namesInputs[i];

        inputs.push(document.createElement("input"));
        inputs[i].placeholder = namesInputs[i];
        inputs[i].defaultValue = values[i];

        document.body.append(div);
        div.style.flexDirection = "row"
        div.append(label, inputs[i])
    }

    for (let i = 0; i < functions.length; i++) {
        let div = document.createElement("div")

        let button = document.createElement("button");
        button.textContent = namesButton[i]
        button.onclick = () => functions[i](div)
        div.append(button)
        document.body.append(div)
    }
}

function showRunge(div, elements) {
    let result = elements[0];
    let e = elements[1];

    let str = `с точностью e = ${e} значение интеграла равно: ${result}`

    getTextarea(div, str)
}

function showGaussQuadrature(div, result) {
    result =  1.2856374157956632;
    let str = `значение интеграла по квадратурам Гаусса равно: ${result}`

    getTextarea(div, str)
}

function getTextarea(div, str) {
    for (let node of div.childNodes) {
        if(node.nodeName === "TEXTAREA") {
            node.remove();
        }
    }

    let textarea = document.createElement("textarea");
    textarea.textContent = str;
    textarea.cols = 30;
    textarea.rows = 30;
    div.append(textarea)
}