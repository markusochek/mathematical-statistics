// N = 25 = 6k + 1;
import {eulerMethod} from "./EulerMethod.js";
import {sequentialDifferentiationMethod} from "./SequentialDifferentiationMethod.js";

let m = 5e-2;
let l = 8e-1;
let Y0 = 0;
let interval = [0, 1];
let h = 2e-1;

let inputs = [];

showMain(inputs, m);

function showMain(inputs, m) {
    let namesButton = [
        "find positive roots of equation",
        "find solutions to system by simple iteration"
    ]

    let functions = [
        (div) => showEulerMethod(div, eulerMethod(m, l, Y0)),
        (div) => showSequentialDifferentiationMethod(div, sequentialDifferentiationMethod(m, l)),
    ];

    for (let i = 0; i < functions.length; i++) {
        let div = document.createElement("div")

        let button = document.createElement("button");
        button.textContent = namesButton[i]
        button.onclick = () => functions[i](div)
        div.append(button)
        document.body.append(div)
    }
}

function showEulerMethod(div, UnArray) {
    let str = `решение методом Эйлера: `;
    for (const Un of UnArray) {
        str += `
        ${Un}`
    }

    getTextarea(div, str)
}

function showSequentialDifferentiationMethod(div, Derivatives) {
    let str = `представление решения в окерстности точки x = 0 методом последовательного дифференцирования: `;
    for (let i = 0; i < Derivatives.length; i++) {
        str += `
        ${Derivatives[i]} = y(${i})`
    }

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
