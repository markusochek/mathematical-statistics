import {findPositiveRootsOfEquation} from "./FindPositiveRootsOfEquation.js";

export function danilevskyMethod(AMatrix, e) {
    // AMatrix = [
    //      [ 5, 1,  1 ],
    //      [-4, 10, 1 ],
    //      [ 1, 1,  12]];

    let M2Matrix = [
        [1, 0, 0, 0],
        [-AMatrix[3][0] / AMatrix[3][1], 1 / AMatrix[3][1], -AMatrix[3][2] / AMatrix[3][1], -AMatrix[3][3] / AMatrix[3][1]],
        [0, 0, 1, 0],
        [0, 0, 0, 1]];

    let M2MatrixInverse = math.inv(M2Matrix)

    let multiply = math.multiply(math.multiply(M2MatrixInverse, AMatrix), M2Matrix);

    let M1Matrix = [
        [1/multiply[1][0], -multiply[1][1]/multiply[1][0], -multiply[1][2]/multiply[1][0], -multiply[1][3]/multiply[1][0]],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]];

    let M1MatrixInverse = math.inv(M1Matrix);

    let multiply2 = math.multiply(math.multiply(math.multiply(math.multiply(M1MatrixInverse, M2MatrixInverse),
        AMatrix), M2Matrix), M1Matrix);

    let f = `x^3 + ${-multiply2[0][0]} * x^2 + ${-multiply2[0][1]} * x + ${-multiply2[0][2]}`;
    let roots = findPositiveRootsOfEquation(f, e);

    let checks = [];
    for (let i = 0; i < roots.length; i++) {
        let y = [roots[i]**3, roots[i]**2, roots[i], 1]
        let x = math.multiply(math.multiply(M2Matrix, M1Matrix), y);
        let check = math.add(math.multiply(AMatrix, x), math.multiply(-roots[i], x));
        checks.push(check);
    }
    return checks;
}