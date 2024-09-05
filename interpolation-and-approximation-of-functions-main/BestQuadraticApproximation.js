export function bestQuadraticApproximation(inputs) {
    let X = inputs[0].value.split(" ")
    let Y = inputs[1].value.split(" ")

    X.splice(5)
    let yAll = []
    for(let i = 0; i < Y.length; i++) {
        yAll.push(Math.exp(X[i]));
    }

    let matrixC = []

    for (let i = 0; i < X.length; i++) {
        let array = [];
        for(let j = 0; j < X.length; j++) {
            let sum = 0;
            for(let k = 0; k < X.length; k++) {
                sum += Math.pow(X[k], i) * (1 - X[k]) *
                    Math.pow(X[k], j) * (1 - X[k]);
            }
            array.push(sum)
        }
        matrixC.push(array);
    }

    let matrixB = [];

    for(let j = 0; j < X.length; j++) {
        let sum = 0;
        for (let k = 0; k < X.length; k++) {
            sum += Math.pow(X[k], j) * (1 - X[k]) * yAll[k];
        }
        matrixB.push(sum);
    }
    return math.multiply(math.inv(matrixC), matrixB)
}