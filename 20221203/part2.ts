import fs from "fs";
import { chunk } from "../lib/chunk";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const split = text.split("\r\n");
const points = (letter: string) => ("abcdefghijklmnopqrstuvwxyz" + "abcdefghijklmnopqrstuvwxyz".toUpperCase()).split("").indexOf(letter) + 1;

const rucksacks: { part1: string; part2: string; part3: string; common: string[] }[] = [];

const chunks = chunk<string>(split, 3);

chunks.forEach((chunk) => {
    const common = chunk[0].split("").filter((value) => chunk[1].split("").includes(value) && chunk[2].split("").includes(value));
    rucksacks.push({ part1: chunk[0], part2: chunk[1], part3: chunk[2], common: [...new Set(common)] });
});

console.log(
    rucksacks
        .map((r) => r.common)
        .flat()
        .map(points)
        .reduce((sum, num) => sum + num, 0)
);
