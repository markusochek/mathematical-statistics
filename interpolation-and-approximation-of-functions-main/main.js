import {calculateInterpolationPolynomial} from "./CalculateInterpolationPolynomial.js";
import {spline} from "./Spline.js";
import {bestQuadraticApproximation} from "./BestQuadraticApproximation.js";
import {determineValueOfFunctionAtAnArbitraryPoint} from "./DetermineValueOfFunctionAtAnArbitraryPoint.js";

let names = ["введите все X ",
    "введите все Y "]

let N = 25;
let k = 5;
let m = 8
let values = [`0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1.0`,
    `${0.2 * N} ${0.3 * m} ${0.5 * k} ${0.6 * N} ${0.7 * m} ${k} ${0.8 * N} ${1.2 * k} ${1.3 * m} ${N}`]

let inputs = []

for(let i = 0; i < 2; i++) {
    let div = document.createElement("div");

    let label = document.createElement("label");
    label.textContent = names[i];

    inputs.push(document.createElement("input"));
    inputs[i].placeholder = names[i];
    inputs[i].defaultValue = values[i];

    document.body.append(div);
    div.style.flexDirection = "row"
    div.append(label, inputs[i])
}

names = ["calculate interpolation polynomial",
    "spline",
    "best quadratic approximation"];

let functions = [(div) => showCalculateInterpolationPolynomial(div, calculateInterpolationPolynomial(inputs)),
    (div) => showSpline(div, spline(inputs)),
    (div) => showBestQuadraticApproximation(div, bestQuadraticApproximation(inputs))];

for (let i = 0; i < functions.length; i++) {
    let div = document.createElement("div")

    let button = document.createElement("button");
    button.textContent = names[i]
    button.onclick = () => functions[i](div)
    div.append(button)
    document.body.append(div)
}



function showCalculateInterpolationPolynomial(div, Lx) {
    Lx.reverse()
    let str = "L(x) = " + Lx[0] + "\n";
    for (let i = 1; i < Lx.length; i++) {
        if (Lx[i] > 0) {
            str += "+"
        }
        str += Lx[i]  + " * " + "x^" + i + "\n";
    }

    getTextarea(div, str)

    for (let node of div.childNodes) {
        if(node.nodeName === "DIV") {
            node.remove();
        }
    }

    let divNew = document.createElement("div");

    let label = document.createElement("label");
    label.textContent = "определить значение функции в произвольной точке";

    let input = document.createElement("input");
    input.placeholder = "введите x";
    input.defaultValue = "5";

    let button = document.createElement("button");
    button.id = "determine";
    button.textContent = "determine value of function at an arbitrary point";

    divNew.append(label, input, button)
    div.append(divNew)

    button.onclick = () => showDetermineValueOfFunctionAtAnArbitraryPoint(divNew,
        determineValueOfFunctionAtAnArbitraryPoint(input, Lx))
}

function showDetermineValueOfFunctionAtAnArbitraryPoint(divNew, y) {
    let str = "y = " + y;
    getTextarea(divNew, str);
}

function showSpline(div, elements) {
    let [bAll, aAll, X, Y] = elements;

    let str = "";
    for(let i = 0; i < Y.length-1; i++) {
        if (aAll[i]) {
            str += `${aAll[i]} * (x-${X[i]})^2`;
        }
        if (bAll[i]) {
            str += ` + ${bAll[i]} * (x-${X[i]})`;
        }
        str += ` + ${Y[i]}, при x принадлежащем [${X[i]}, ${X[i+1]}]` + "\n";
    }
    getTextarea(div, str);
}


function showBestQuadraticApproximation(div, A) {

    let str = "φ(x) = " + A[0]
    for (let i = 1; i < A.length; i++) {
        str += ` + ${A[i]} * x^` + i;
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