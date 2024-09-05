export function findSolutionsToSystemBySimpleIteration(m) {
    let e = Math.pow(10, -2);
    let a = 1 + 0.5 * m
    let f = 'a * x^3 - y^2 - 1';
    let g = 'x * y^3 - y - 4';

    let [x, y] = getPoints();

    let coefficients = calculateMatrix(f, g, a, x, y);

    return [calculateXY(f, g, a, e, coefficients), e];
}

function calculateMatrix(f, g, a, x, y) {
    let matrixA = [
        [
            math.evaluate(math.derivative(f, 'x').toString(), {a, x, y}),
            math.evaluate(math.derivative(g, 'x').toString(), {a, x, y}),
            0,
            0,
        ],

        [
            math.evaluate(math.derivative(f, 'y').toString(), {a, x, y}),
            math.evaluate(math.derivative(g, 'y').toString(), {a, x, y}),
            0,
            0,
        ],

        [
            0,
            0,
            math.evaluate(math.derivative(f, 'x').toString(), {a, x, y}),
            math.evaluate(math.derivative(g, 'x').toString(), {a, x, y}),
        ],

        [
            0,
            0,
            math.evaluate(math.derivative(f, 'y').toString(), {a, x, y}),
            math.evaluate(math.derivative(g, 'y').toString(), {a, x, y}),
        ],
    ];
    let matrixB = [-1, 0, 0, -1];
    return math.multiply(math.inv(matrixA), matrixB)
}

function getPoints() {
    return [-10, 10]
}

function calculateXY(f, g, a, e, coefficients) {
    let x = 0.5;
    let y = 0.5;
    for (let i = 0; i < 10; i++) {
        let [Xn, Yn] = calculateXnYn(f, g, a, x, y, coefficients);

        if (Math.abs(x - Xn) + Math.abs(y - Yn) < e*0.95/(1-0.95)) {
            return [Xn, Yn];
        }
        x = Xn;
        y = Yn;
    }
}

function calculateXnYn(f, g, a, x, y, coefficients) {
    let Xn = math.evaluate(f, {a, x, y}) * coefficients[0] +
             math.evaluate(g, {a, x, y}) * coefficients[1];

    let Yn = math.evaluate(f, {a, x, y}) * coefficients[2] +
             math.evaluate(g, {a, x, y}) * coefficients[3];
    return [Xn, Yn];
}


