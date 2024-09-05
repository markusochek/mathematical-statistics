export function findPositiveRootsOfEquation(m) {
    let e = Math.pow(10, -4);
    let a = 3 + 0.1 * m
    let b = 0.4 + 0.03 * m

    let f = 'x^5-a*x+b';
    let intervals = getInterval(f, a, b);
    return [Newton(intervals, f, a, b, e), e];
}

function getInterval(f, a, b) {
    let i = -99;

    let intervals = [];
    let x = -100
    let prevMeaning = math.evaluate(f, {x, a, b});
    x = -99
    let meaning = math.evaluate(f, {x, a, b});
    let difference = prevMeaning - meaning;

    for (; i < 100; i += 0.1) {
        x = i;
        prevMeaning = meaning;
        meaning = math.evaluate(f, {x, a, b})
        if (prevMeaning - meaning > 0 && difference < 0 || prevMeaning - meaning < 0 && difference > 0) {
            intervals.push([i-1, i])
        }
        difference = prevMeaning - meaning;
        ++i;

    }
    return intervals;
}

function Newton(intervals, f, a, b, e) {
    let derivatives = [f, math.derivative(f, 'x').toString()];
    let points = [];
    for (let i = 0; i < intervals.length; i++) {
        let interval = intervals[i]
        let x1 = interval[1];
        let x = x1;
        let xn1 = interval[0];
        while (Math.abs(x - xn1) > e) {
            x = x1;
            xn1 = x1 - math.evaluate(derivatives[0], {x, a, b})
                / math.evaluate(derivatives[1], {x, a, b});
            x1 = xn1;
        }
        points.push(xn1);
    }
    return points;
}

