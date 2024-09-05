export function determineValueOfFunctionAtAnArbitraryPoint(input, Lx) {
    let y = 0
    let x = input.value
    for (let i = 0; i < Lx.length; i++) {
        y += Lx[i] * Math.pow(x, i);
    }
    return y;
}