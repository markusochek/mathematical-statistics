export function calculateInterpolationPolynomial(inputs) {
    let X = inputs[0].value.split(" ")
    let Y = inputs[1].value.split(" ")
    let allL = new Array(X.length).fill(0);

    for (let i = 0; i < X.length; i++) {
        let newX = Array.from(X);
        let x = newX[i];
        newX.splice(i, 1)
        let lx = l(newX, x)
        for (let j = 0; j < X.length; j++) {
            allL[j] += lx[j] * Y[i];
        }
    }
    return allL;
}

function l(X, x) {
    let denominator = 1

    for(let i = 0; i < X.length; i++) {
        denominator *= x - X[i]
    }

    let polynomial = new Array(X.length+1).fill(0);
    let degree2 = Math.pow(2, X.length);
    for (let i = 0; i < degree2; i++) {
        let binaryNumber = i.toString(2).split('').reverse().join('');
        let sum = 1;
        let degreeOfPolynomial = 0
        for (let j = 0; j < binaryNumber.length; j++) {
            if (binaryNumber[j] === "0") continue;
            sum *= -X[j]
            ++degreeOfPolynomial
        }
        sum /= denominator
        polynomial[degreeOfPolynomial] += sum
    }
    return polynomial;
}



