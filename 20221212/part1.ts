import fs from "fs";
import { Coord, getSides, MatrixValue } from "../lib/matrix";
import { range } from "../lib/range";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");
const data = text.split("\r\n").filter((s) => !s.startsWith("//"));

const alphabet = "SabcdefghijklmnopqrstuvwxyzE".split("");
const visited: { [name: string]: boolean } = {};

const isAvailable = (from: string, to: string) => {
    if (!to || alphabet.indexOf(to) === -1) return false;

    return [0, 1].includes(alphabet.indexOf(to) - alphabet.indexOf(from));
};
const matrix: [string[]] = [[]];
let allMarks: { [name: string]: string[] } = {};

function Graph(marks: string[]) {
    marks.forEach((cave) => {
        allMarks[cave] = [];
    });
}

function addEdge(fromMark: string, toMark: string) {
    const marks: string[] = allMarks[fromMark];
    if (!marks.some((c) => c === toMark)) {
        marks.push(toMark);
    }
}

let marks: string[] = [];

data.forEach((row: string, rowIndex) => {
    matrix[rowIndex] = row.split("").map((letter) => letter);
    marks.push(...row.split("").map((_, index) => `${rowIndex}-${index}`));
});

Graph(marks);

data.forEach((row: string, rowIndex) => {
    row.split("").forEach((letter, columnIndex) => {
        const { bottom, left, right, top } = getSides(matrix, rowIndex, columnIndex);

        [top, left, bottom, right]
            .filter((v) => v.value != null)
            .forEach((elem) => {
                if (isAvailable(letter, elem.value)) {
                    addEdge(`${rowIndex}-${columnIndex}`, `${elem.rowIndex}-${elem.columnIndex}`);
                }
            });
    });
});

const findPosition = (letter: string): Coord => {
    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        const row = matrix[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            const element = row[columnIndex];
            if (element === letter) {
                return { x: columnIndex, y: rowIndex };
            }
        }
    }
};

// const print = (path: MatrixValue<Mark>[]) => {
//     console.log(`################ ${path.length} #################`);
//     for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
//         const row = matrix[rowIndex];

//         console.log(
//             row
//                 .map((r, columnIndex) => {
//                     if (path.some((p) => p.rowIndex === rowIndex && p.columnIndex === columnIndex)) {
//                         return `[${r.letter}]`;
//                     } else {
//                         return ` ${r.letter} `;
//                     }
//                 })
//                 .join("")
//         );
//     }
// };

const start = findPosition("S");
const end = findPosition("E");

const path: string[] = [];
const allPaths: string[][] = [];

const navigate = (rowIndex: number, columnIndex: number) => {
    //const { top, bottom, left, right } = getSides(matrix, rowIndex, columnIndex);
    const nextMarks = allMarks[`${rowIndex}-${columnIndex}`];
    const current = matrix[rowIndex]?.[columnIndex];
    if (current == null) {
        return;
    }
    nextMarks.forEach((name) => {
        //const name = `${elem.rowIndex}-${elem.columnIndex}`;
        const [y, x] = name.split("-");
        const value = matrix[parseInt(y)][parseInt(x)];
        const $isAvailable = isAvailable(current, value);
        if ($isAvailable && name === `${end.y}-${end.x}`) {
            allPaths.push([...path]);
        } else if ($isAvailable && !visited[name]) {
            visited[name] = true;
            path.push(name);
            navigate(parseInt(y), parseInt(x));
            path.pop();
            visited[name] = false;
        }
    });
};

navigate(start.y, start.x);
//console.log(totalPath.map((p) => p.value));
//allPaths.forEach(element => print(element));
console.log(allPaths.map((p) => p.length).sort((a, b) => a - b));
