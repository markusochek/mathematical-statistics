import {findPositiveRootsOfEquation} from "./FindPositiveRootsOfEquation.js";
import {findSolutionsToSystemBySimpleIteration} from "./FindSolutionsToSystemBySimpleIteration.js";

let inputs = [];

// N = 25;
// N % 4 = 1;

let m = 5;
showMain(inputs, m);

function showMain(inputs, m) {
    let namesButton = [
        "find positive roots of equation",
        "find solutions to system by simple iteration"
    ]

    let functions = [
        (div) => showFindPositiveRootsOfEquation(div, findPositiveRootsOfEquation(m)),
        (div) => showFindSolutionsToSystemBySimpleIteration(div, findSolutionsToSystemBySimpleIteration(m)),
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

function showFindPositiveRootsOfEquation(div, elements) {
    let [points, e] = elements;
    let str = `с точностью e = ${e} положительные корни уравнения равны:`;
    for (const point of points) {
        str += `
        ${point}`
    }

    getTextarea(div, str)
}

function showFindSolutionsToSystemBySimpleIteration(div, XYe) {
    let [[Xn, Yn], e] = XYe;
    let str = `с точностью e = ${e} корни уравнения равны:
    ${Xn}
    ${Yn}`

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