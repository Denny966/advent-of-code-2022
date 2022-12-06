import fs from "fs";
import { range } from "./range";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const split = text.split("\r\n");

const rangePairs: { firstRange: number[]; secondRange: number[] }[] = [];
split.forEach((row) => {
    const pairs = row.split(",");
    const firstPair = pairs[0].split("-");
    const secondPair = pairs[1].split("-");

    const firstRange = range(+firstPair[0], +firstPair[1]);
    const secondRange = range(+secondPair[0], +secondPair[1]);

    rangePairs.push({ firstRange, secondRange });
});

let result = 0;
rangePairs.forEach((pair) => {
    result += pair.firstRange.every((r) => pair.secondRange.includes(r)) || pair.secondRange.every((r) => pair.firstRange.includes(r)) ? 1 : 0;
});

console.log(result);
