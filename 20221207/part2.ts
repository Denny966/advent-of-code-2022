import fs from "fs";
import { sum } from "../lib/sum";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");
const data = text.split("\r\n");

let currentDirectory = "";

const directoryInfo = {};

data.forEach((row) => {
    if (row.trim() === "") return;

    const parts = row.trim().split(" ");
    switch (parts[0]) {
        case "$": {
            if (parts[1] === "cd") {
                const dir = parts[2];
                if (dir === "..") {
                    currentDirectory = currentDirectory.split("/").slice(0, -2).join("/") + "/";
                } else if (dir === "/") {
                    currentDirectory = "/";
                } else {
                    currentDirectory = currentDirectory + dir + "/";
                }
            }
            return;
        }

        case "dir": {
            const key = parts[1];
            const dir = currentDirectory + key + "/";
            if (!Object.keys(directoryInfo).includes(dir)) {
                directoryInfo[dir] = {};
            }
            return;
        }
        default: {
            const key = parts[1];
            const value = parts[0];
            directoryInfo[currentDirectory] = directoryInfo[currentDirectory] || {};
            directoryInfo[currentDirectory][key] = value;
            return;
        }
    }
});

const totalSize = sum(
    Object.values<{ [key: string]: string }>(directoryInfo)
        .map((obj) => Object.values(obj))
        .flat()
        .map((v) => parseInt(v))
);
const usedSpace = 70000000 - totalSize;
const spaceRequired = 30000000 - usedSpace;

const totalSizes = {};
for (const [key, value] of Object.entries<{ [key: string]: string }>(directoryInfo)) {
    for (const [key2, value2] of Object.entries<{ [key: string]: string }>(directoryInfo)) {
        if (key2.indexOf(key) === 0) {
            totalSizes[key] = [...(totalSizes[key] ?? []), ...Object.values(value2)];
        }
    }
}

const result = [];
for (const [key, value] of Object.entries<string[]>(totalSizes)) {
    const size = value.map((n) => parseInt(n)).reduce((sum, num) => sum + num, 0);
    if (size >= spaceRequired) result.push(size);
}

result.sort((a, b) => a - b);
console.log(result);
