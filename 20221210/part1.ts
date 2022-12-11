import fs from "fs";
import { range } from "../lib/range";
import { sum } from "../lib/sum";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");
const data = text.split("\r\n").filter((s) => !s.startsWith("//"));

const cycle: { no: number; value: { during: number; after: number } }[] = [{ no: 0, value: { during: 0, after: 1 } }];

data.forEach((row) => {
    const lastCycle = cycle[cycle.length - 1];
    if (row === "noop") {
        cycle.push({ no: lastCycle.no + 1, value: { during: lastCycle.value.after, after: lastCycle.value.after } });
    } else {
        cycle.push({ no: lastCycle.no + 1, value: { during: lastCycle.value.after, after: lastCycle.value.after } });
        const value = parseInt(row.split(" ")[1]);
        cycle.push({ no: lastCycle.no + 2, value: { during: lastCycle.value.after, after: lastCycle.value.after + value } });
    }
});

console.log(sum(cycle.filter((cycle) => [20, 60, 100, 140, 180, 220].includes(cycle.no)).map((c) => c.value.during * c.no)));
