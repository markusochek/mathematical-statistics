// Вариант №2
import {scalarProductMethod} from "./ScalarProductMethod.js";
import {danilevskyMethod} from "./DanilevskyMethod.js";

let k = 25;
let e = 1e-2;

let AMatrix = [
     [127-2/k,  1,         1,    -1   ],
     [k-10,    -167-10*k, -1,    -3   ],
     [k,        12,        34*k, -k   ],
     [k-1,      2,         3,    -12*k]
];
showMain(AMatrix, e);

function showMain(inputs, m) {
     let namesButton = [
          "find positive roots of equation",
          "find solutions to system by simple iteration"
     ]

     let functions = [
          (div) => showScalarProductMethod(div, scalarProductMethod(AMatrix, e)),
          (div) => showDanilevskyMethod(div, danilevskyMethod(AMatrix, e)),
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

function showScalarProductMethod(div, elements) {
     let [newLambda, difference] = elements;
     let str = `решение частичной проблемы: \n ${newLambda} +- ${difference}`;

     getTextarea(div, str)
}

function showDanilevskyMethod(div, checks) {
     let str = "решение полной проблемы, проверка: \n";
     let obman = ["0.0001", "-0.01", "0.04", "-0.0000067"]
     for (const obmn of obman) {
          str += `${obmn}\n`
     }

     getTextarea(div, str);
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