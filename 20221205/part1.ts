import fs from "fs";
import { range } from "./range";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const split = text.split("\r\n");

const movements: { amount: number; from: string; to: string }[] = [];

split.forEach((row) => {
    if (row.indexOf("move") > -1) {
        const words = row.split(" ");
        movements.push({ amount: +words[1], from: words[3], to: words[5] });
    }
});

console.log(movements)
