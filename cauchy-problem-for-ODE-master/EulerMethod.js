export function eulerMethod(m, l, U) {
    let UnArray = [];
    for (let i = 0; i < 5; i++) {
        let U_0 = U + 0.2 * (1 + m * U * Math.sin(0.1 * (i + 1)) + U * U);
        let Un = 0;
        for (let j = 0; j < 5; j++) {
            Un = U + 0.1 * (1 + m * U * Math.sin((i + 1) * 0.1) + U * U + 1 + m * U_0 * Math.sin((i + 1) * 0.1)  + U_0 * U_0);
            let difference = Un - U_0;
            if (difference < 1e-2) {
                UnArray.push(Un);
                break;
            }
            U_0 = Un;
        }
        U = Un;
    }
    return UnArray;
}