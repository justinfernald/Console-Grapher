function f(x) {
    // return x;
    // return 5 * Math.sin(x * (2/3)) + 5 * Math.sin(x);
    // return Math.pow(x, 2) / 5 - 3;
    // return 1.5 * Math.atan(x * (1/5));
    return x+5;
}

const domain = {
    lower: -80,
    upper: 80
};

const range = {
    lower: -10,
    upper: 10
};

const width = 350;
const height = 40

function graph() {
    let points = [];
    for (let x = 0; x < width; x++) {
        let position = positionToPoint(x);
        points.push(pointToPosition(position.x, position.y));
    }

    console.log(points);
    let output = ""
    for (let y = height - 1; y >= 0; y--) {
        let line = "";
        for (let x = 0; x < width; x++) {
            if (points[x].y == y) {
                line += "x";
            } else {
                line += " ";
            }
        }
        if (y == height - 1) {
            line += range.upper;
        } else if (y == 0) {
            line += range.lower;
        }
        output += line + "\n";

    }
    let space = "";
    for (let i = 0; i < width - (domain.lower + "").length - (domain.upper + "").length; i++) {
        space += " ";
    }
    output += domain.lower + space + domain.upper;
    console.log(output);
}

function graph2() {
    let points = [];
    for (let x = 0; x < width; x++) {
        let position = positionToPoint(x);
        points.push({
            x: position.x,
            y: position.y
        });
    }

    console.log(points);
    let output = ""
    for (let y = height - 1; y >= 0; y--) {
        let line = "";
        for (let x = 0; x < width; x++) {
            let atPoint = false;
            const xPoint = map(x, {
                upper: width - 1,
                lower: 0
            }, domain);

            const yPoint = map(y, {
                upper: height - 1,
                lower: 0
            }, range);

            for (let i = 0; i < points.length; i++) {
                if (aboutEqual(xPoint, points[i].x, .3) && aboutEqual(yPoint, points[i].y, .3)) {
                    line += "x";
                    atPoint = true;
                    break;
                }
            }
            if (!atPoint) {
                line += " ";
            }
        }
        if (y == height - 1) {
            line += range.upper;
        } else if (y == 0) {
            line += range.lower;
        }
        output += line + "\n";

    }
    let space = "";
    for (let i = 0; i < width - (domain.lower + "").length - (domain.upper + "").length; i++) {
        space += " ";
    }
    output += domain.lower + space + domain.upper;
    console.log(output);
}

function graph3() {
    let points = [];
    for (let x = 0; x < width; x++) {
        let position = positionToPoint(x);
        points.push(pointToPosition(position.x, position.y));
    }

    let positions = [];
    for (let x = 0; x < width; x++) {
        let position = positionToPoint(x);
        positions.push({
            x: position.x,
            y: position.y
        });
    }

    let output = ""
    for (let y = height - 1; y >= 0; y--) {
        let line = "";
        for (let x = 0; x < width; x++) {
            let atPoint = false;
            const xPoint = map(x, {
                upper: width - 1,
                lower: 0
            }, domain);

            const yPoint = map(y, {
                upper: height - 1,
                lower: 0
            }, range);


            for (let i = 0; i < positions.length; i++) {
                const d = .01;
                const slope = (f(positions[i].x + d) - f(positions[i].x - d)) / (2 * d);

                if (aboutEqual(xPoint, positions[i].x, .25) && aboutEqual(yPoint, positions[i].y, Math.abs(slope) / 4 + .15)) {
                    if (slope < .5 && slope > -.5) {
                        line += "-";
                    } else if (slope > 0) {
                        if (slope > 200) {
                            line += " ";
                        }else if (slope > 2.5) {
                            line += "|";
                        } else {
                            line += "/";
                        }
                    } else {
                        if (slope < -200) {
                            line += " ";
                        } else if (slope < -2.5) {
                            line += "|";
                        } else {
                            line += "\\";
                        }
                    }
                    atPoint = true;
                    break;
                }
            }
            if (!atPoint) {
                line += " ";
            }
        }
        if (y == height - 1) {
            line += range.upper;
        } else if (y == 0) {
            line += range.lower;
        }
        output += line + "\n";

    }
    let space = "";
    for (let i = 0; i < width - (domain.lower + "").length - (domain.upper + "").length; i++) {
        space += " ";
    }
    output += domain.lower + space + domain.upper;
    console.log("%c" + output, "font-size: .5em; padding: 0; margin: 0");
}

function aboutEqual(x1, x2, d) {
    return x1 > x2 - d && x1 < x2 + d;
}

function pointToPosition(x, y) {
    return {
        x: Math.round(map(x, domain, {
            upper: width - 1,
            lower: 0
        })),
        y: Math.round(map(y, range, {
            upper: height - 1,
            lower: 0
        }))
    }
}

function positionToPoint(x) {
    const xPoint = map(x, {
        upper: width - 1,
        lower: 0
    }, domain);
    return {
        x: xPoint,
        y: f(xPoint)
    }
}

function map(input, inputBound, outputBound) {
    return (input - inputBound.lower) / (inputBound.upper - inputBound.lower) * (outputBound.upper - outputBound.lower) + outputBound.lower;
}

graph3();