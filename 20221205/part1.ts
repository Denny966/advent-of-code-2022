import fs from "fs";
import { chunk } from "../lib/chunk";
import { range } from "../lib/range";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const split = text.split("\r\n");

const movements: { amount: number; from: string; to: string }[] = [];
const rows: string[][] = [];

split.forEach((row) => {
    if (row.indexOf("move") > -1) {
        const words = row.split(" ");
        movements.push({ amount: +words[1], from: words[3], to: words[5] });
    } else if (row.indexOf("[") > -1) {
        const splitted = chunk<string>(row.split(""), 4).map((s) => s.join("").trim());
        rows.push(splitted);
    }
});

const maxLength = Math.max(...rows.map((el) => el.length));
const stack: { [key: string]: string[] } = {};

range(1, maxLength).forEach((col) => {
    stack[col.toString()] = [];
});

rows.forEach((row) => {
    row.forEach((column, index) => {
        if (column !== "") {
            stack[(index + 1).toString()].push(column);
        }
    });
});

Object.keys(stack).forEach((s) => {
    stack[s].reverse();
});

const move = (from: string, to: string) => {
    const lastItem = stack[from].pop();
    stack[to].push(lastItem);
};

movements.forEach((movement) => {
    range(1, movement.amount).forEach(() => {
        move(movement.from, movement.to);
    });
});

const result: string[] = [];

for (const [key, value] of Object.entries(stack)) {
    const upperCrate = value.slice(-1)[0];
    if (upperCrate != null) result.push(upperCrate);
}
console.log(stack);
console.log(result.join("").replace(/\[/g, "").replace(/\]/g, ""));