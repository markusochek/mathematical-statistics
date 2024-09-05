export function sequentialDifferentiationMethod(m, l) {
    let y = 0;
    let x = 0;
    let Derivatives = [];
    Derivatives.push(derivative1(m, l, y, x));
    Derivatives.push(derivative2(m, l, y, x, Derivatives[0]));
    Derivatives.push(derivative3(m, l, y, x, Derivatives[0], Derivatives[1]));
    Derivatives.push(derivative4(m, l, y, x, Derivatives[0], Derivatives[1], Derivatives[2]));
    return Derivatives;
}

function derivative1(m, l, y, x) {
    return 1 + m * y * Math.sin(x) - l * y**2;
}

function derivative2(m, l, y, x, Derivative1) {
    return m * Math.sin(x) * Derivative1 - 2 * l * Derivative1 * y + m * y * Math.cos(x);
}

function derivative3(m, l, y, x, Derivative1, Derivative2) {
    return m * Math.cos(x) * Derivative1 - m * y * Math.sin(x) + m * Math.sin(x) * Derivative2 - 2 * l * Derivative2 * y
           + m * Derivative1 * Math.cos(x) - 2 * l * Derivative1**2;

}

function derivative4(m, l, y, x, Derivative1, Derivative2, Derivative3) {
    return -m * Math.sin(x) * Derivative1 - m * y * Math.cos(x) + m * Math.cos(x) * Derivative2
           - m * Derivative1 * Math.sin(x) - 4 * l * Derivative2 * Derivative1 + m * Math.cos(x) * x * Derivative2
           - m * Derivative1 * Math.sin(x) + m * Math.sin(x) * Derivative3 - 2 * l * Derivative3 * y
           - 2 * l * Derivative2 * Derivative1 + m * Derivative2 * Math.cos(x);
}
