export function runge(f, a, b, e) {
    let m = 1;
    let s = 1;
    return [Runge(f, m, a, b, s, e), e];
}

function Runge(f, m, a, b, s, e) {
    let Im = getIm(f, m, a, b);
    let I2m = getIm(f,2 * m, a, b);

    let em = Math.abs(Im - I2m) / (Math.pow(2, s) - 1)
    if (em <= e) {
        return I2m;
    } else {
        return Runge(f,m * 2, a, b, s, e);
    }
}

function getIm(f, m, a, b) {
    let h = (b - a) / m;
    let Im = 0;
    for (let i = 1; i < m; i++) {
        Im += h * f(a + i * h);
    }
    return Im;
}