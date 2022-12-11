import fs from "fs";
import { chunk } from "../lib/chunk";
import { range } from "../lib/range";
import { sum } from "../lib/sum";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");
const data = text.split("\r\n").filter((s) => !s.startsWith("//"));

const cycles: { no: number; value: { during: number; after: number } }[] = [{ no: 0, value: { during: 0, after: 1 } }];

data.forEach((row) => {
    const lastCycle = cycles[cycles.length - 1];
    if (row === "noop") {
        cycles.push({ no: lastCycle.no + 1, value: { during: lastCycle.value.after, after: lastCycle.value.after } });
    } else {
        cycles.push({ no: lastCycle.no + 1, value: { during: lastCycle.value.after, after: lastCycle.value.after } });
        const value = parseInt(row.split(" ")[1]);
        cycles.push({ no: lastCycle.no + 2, value: { during: lastCycle.value.after, after: lastCycle.value.after + value } });
    }
});

const crt = range(1, 240).map((pixel) => ({ pixel, on: false }));

const pixelCovers = (pixel: number) => [pixel - 1, pixel, pixel + 1];

cycles
    .filter((c) => c.no > 0)
    .forEach((cycle, index) => {
        if (pixelCovers(cycle.value.during).includes(index % 40)) {
            crt[index].on = true;
        }
    });

chunk(
    crt.map((pixel) => (pixel.on ? "#" : ".")),
    40
).forEach((row) => {
    console.log(row.join(" "));
});
