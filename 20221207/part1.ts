import fs from "fs";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");
var stream = fs.createWriteStream(__dirname + "/output.txt", { flags: "a" });

const split = text.split("\r\n");
const points = (letter: string) => ("abcdefghijklmnopqrstuvwxyz" + "abcdefghijklmnopqrstuvwxyz".toUpperCase()).split("").indexOf(letter) + 1;

const rucksacks: { part1: string; part2: string; common: string[] }[] = [];
split.forEach((s) => {
    const part1 = s.substring(0, s.length / 2);
    const part2 = s.substring(s.length / 2);
    const common = part1.split("").filter((value) => part2.split("").includes(value));
    rucksacks.push({ part1, part2, common: [...new Set(common)] });
});

console.log(
    rucksacks
        .map((r) => r.common)
        .flat()
        .map(points)
        .reduce((sum, num) => sum + num, 0)
);
