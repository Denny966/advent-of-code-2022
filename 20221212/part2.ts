import fs from "fs";
import { getSides, Point } from "../lib/matrix";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");
const data = text.split("\r\n").filter((s) => !s.startsWith("//"));
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const matrix: [string[]] = [[]];

data.forEach((row: string, rowIndex) => {
    matrix[rowIndex] = row.split("").map((letter) => letter);
});

const isAvailable = (from: Point, to: Point) => {
    if (!to || matrix[to[0]]?.[to[1]] == null) return false;

    let fromValue = matrix[from[0]][from[1]];
    let toValue = matrix[to[0]][to[1]];

    return alphabet.indexOf(toValue === "E" ? "z" : toValue) - alphabet.indexOf(fromValue === "S" ? "a" : fromValue) <= 1;
};

const findPositions = (letter: string): Point[] => {
    const result: Point[] = [];
    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        const row = matrix[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            const element = row[columnIndex];
            if (element === letter) {
                result.push([rowIndex, columnIndex]);
            }
        }
    }
    return result;
};

const end = findPositions("E")[0];

const navigate = (start: Point) => {
    let queue: [Point, number][] = [[start, 0]];
    const visited: Set<string> = new Set();
    while (queue.length) {
        const [currentPoint, steps] = queue.shift();
        if (visited.has(currentPoint.toString())) {
            continue;
        }
        visited.add(currentPoint.toString());
        if (currentPoint.toString() === end.toString()) {
            return steps;
        }
        const { top, bottom, left, right } = getSides(matrix, currentPoint[0], currentPoint[1]);
        const possibleValues: Point[] = [top, bottom, right, left].filter((point) => isAvailable(currentPoint, [point.rowIndex, point.columnIndex])).map((p) => [p.rowIndex, p.columnIndex]);
        queue = queue.concat(possibleValues.map((p) => [p, steps + 1]));
    }
    return Number.MAX_SAFE_INTEGER;
};

const paths: number[] = [];
findPositions("a").forEach((point) => {
    paths.push(navigate(point));
});

console.log(paths.sort((a, b) => a - b)[0]);
