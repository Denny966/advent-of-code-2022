import fs from "fs";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const split = text.split("\r\n\r\n");

const sums = split.map((s) =>
    s
        .split("\r\n")
        .map((n) => Number(n))
        .reduce((sum, num) => sum + num, 0)
);

console.log(
    sums
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((sum, num) => sum + num, 0)
);
