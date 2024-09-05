export function gaussQuadrature(f, a, b) {
    let n = 3;

    let numbers = calculationIntegral(n, b, a);

    let rootsMatrix = matrixMultiplication(numbers);

    let nodes = calculationNodes(n, rootsMatrix);

    let coefficients = calculationCoefficients(b, a, n, nodes);

    let sumIntegral = 0;
    for (let i = 0; i < n; i++) {
        sumIntegral += coefficients[i] * f(nodes[i])
    }
    return sumIntegral;
}

function calculationIntegral(n, b, a) {
    let coefficients = []
    for (let i = 1; i < n + 1; i++) {
        coefficients.push([]);
        for (let j = i; j < n + i + 1; j++) {
            coefficients[coefficients.length-1].push(Math.pow(b, j) / j - Math.pow(a, j) / j);
        }
        coefficients[coefficients.length-1] = coefficients[coefficients.length-1].reverse()
    }

    return coefficients;

}

function matrixMultiplication(numbers) {
    let matrixA = []
    let matrixB = []
    for (const number of numbers) {
        matrixB.push(-number[0])
        matrixA.push([])
        for (let i = 1; i < number.length; i++) {
            matrixA[matrixA.length-1].push(number[i])
        }
    }
    return math.multiply(math.inv(matrixA), matrixB)
}

function calculationNodes(n, rootsMatrix) {
    let a = 1;
    let b = -rootsMatrix[0]
    let c = rootsMatrix[1]
    let D = 0;
    switch (n) {
        case 2:
            D = b * b - 4 * a * c;
            if (D < 0) {
                return null;
            } else if (D === 0) {
                return [b / 2*a];
            } else {
                return [
                    (-b + Math.sqrt(D)) / (2*a),
                    (-b - Math.sqrt(D)) / (2*a)
                ]
            }
        case 3:
            let d = -rootsMatrix[2]
            D = -4*b*b*b*d + b*b*c*c - 4*a*c*c*c + 18*a*b*c*d - 27*a*a*d*d
            let p = -(b*b) / (3*a*a) + c / a;
            let q = (2*b*b*b) / (27*a*a*a) - (b*c)/(3*a*a) + d / a;
            let Q = Math.pow(p/3, 3) + Math.pow(q/2, 2);
            let alfa = -q/2 + Math.cbrt(Math.sqrt(-Q));
            let beta = -q/2 - Math.cbrt(Math.sqrt(-Q));
            let yAll = [];
            let xAll = [];
            if (Q === 0) {
                yAll.push(2 * alfa);
                yAll.push(-alfa);
                yAll.push(-alfa);
            } else {
                yAll.push(alfa - beta);
                yAll.push(-(alfa + beta)/2 + (Math.pow(3, 1/2) * (alfa - beta) / 2));
                yAll.push(-(alfa + beta)/2 - (Math.pow(3, 1/2) * (alfa - beta) / 2));

                for (let i = 0; i < n; i++) {
                    xAll.push((yAll[i]-b)/(3*a));
                }
            }
            return xAll;
    }
}

function calculationCoefficients(b, a, n, nodes) {
    let coefficients = [];
    coefficients.push(calculationCoefficient(b, a, nodes[0], nodes[1]))
    for (let i = 1; i < n; i++) {
        coefficients.push(calculationCoefficient(b, a, nodes[i], nodes[i-1]))
    }
    return coefficients;

    function calculationCoefficient(b, a, node0, node1) {
        return ((b - node0) / (node0 - node1)) -
            ((a - node0) / (node0 - node1))
    }
}

