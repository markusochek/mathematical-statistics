export function findPositiveRootsOfEquation(f, e) {

    let intervals = getInterval(f);
    return Newton(intervals, f, e);
}

function getInterval(f) {
    let i = -99;

    let intervals = [];
    let x = -100
    let prevMeaning = math.evaluate(f, {x});
    x = -99
    let meaning = math.evaluate(f, {x});
    let difference = prevMeaning - meaning;

    for (; i < 100; i += 0.1) {
        x = i;
        prevMeaning = meaning;
        meaning = math.evaluate(f, {x})
        if (prevMeaning - meaning > 0 && difference < 0 ||
            prevMeaning - meaning < 0 && difference > 0) {
            intervals.push([i-1, i])
        }
        difference = prevMeaning - meaning;
        ++i;
    }
    return intervals;
}

function Newton(intervals, f, e) {
    let derivatives = [f, math.derivative(f, 'x').toString()];
    let points = [];
    for (let i = 0; i < intervals.length; i++) {
        let interval = intervals[i]
        let x1 = interval[1];
        let x = x1;
        let xn1 = interval[0];
        while (Math.abs(x - xn1) > e) {
            x = x1;
            xn1 = x1 - math.evaluate(derivatives[0], {x})
                / math.evaluate(derivatives[1], {x});
            x1 = xn1;
        }
        points.push(xn1);
    }
    return points;
}

