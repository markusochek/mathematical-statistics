export function scalarProductMethod(AMatrix, e) {
    // AMatrix = [
    //      [ 8, 1, 1 ],
    //      [-1, 4, 1 ],
    //      [ 1, 1, 25],
    // ];
    let ATMatrix = math.transpose(AMatrix);

    // let x0 = [1, 1, 1];
    // let y0 = [1, 1, 1];

    let x0 = [1, 1, 1, 1];
    let y0 = [1, 1, 1, 1];

    let [y1, x1] = calculateX1Y1(ATMatrix);

    let Xn = x1;
    let Yn = y1;

    let lambda = calculateLambda(x1, x0, y0);

    for (let i = 0; i < 10; i++) {
        let prevXn = Xn;
        let prevYn = Yn;
        [Xn, Yn] = calculateXnYn(ATMatrix, AMatrix, Xn, Yn);
        let newLambda = calculateLambda(Xn, prevXn, prevYn);
        let difference = Math.abs(newLambda - lambda);
        if (difference < e) {
            return [newLambda, difference];
        }
        lambda = newLambda;
    }
}

function calculateX1Y1(ATMatrix) {
    let y1 = [];
    for (let AiArray of ATMatrix) {
        let sum = 0;
        for (let AiElement of AiArray) {
            sum += AiElement;
        }
        y1.push(sum)
    }

    let x1 = new Array(ATMatrix.length).fill(0);
    for (let AiArray of ATMatrix) {
        for (let i = 0; i < AiArray.length; i++) {
            x1[i] += AiArray[i];
        }
    }
    return [y1, x1];
}

function calculateLambda(x1, x0, y0) {
    let numerator = 0;
    let denominator = 0;
    for (let i = 0; i < x1.length; i++) {
        numerator += (x1[i] * y0[i]);
        denominator += (x0[i] * y0[i]);
    }
    return numerator / denominator;
}

function calculateXnYn(AiMatrix, AMatrix, x1, y1) {
    let x2 = math.multiply(AMatrix, x1);
    let y2 = math.multiply(AiMatrix, y1);
    return [x2, y2];
}