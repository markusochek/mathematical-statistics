export function spline(inputs) {
    let X = inputs[0].value.split(" ");
    let Y = inputs[1].value.split(" ");

    let prevB = 0;
    let bAll = [0];
    let aAll = [];

    for(let i = 1; i < Y.length; i++) {
        let b = 2*(Y[i] - Y[i-1]) - prevB;
        bAll.push(b);
        prevB = b;
    }

    for(let i = 1; i < Y.length; i++) {
        aAll.push((bAll[i] - bAll[i-1])/2);
    }
    return [bAll, aAll, X, Y];
}