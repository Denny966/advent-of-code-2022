import fs from "fs";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const split = text.split("");

for (let index = 0; index < split.length; index++) {
    const characters = split.slice(index, index + 4);
    if ([... new Set(characters)].length === 4) {
        console.log(index + 4);
        break;
    }
}

