import fs from "fs";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const split = text.split("\r\n");

type File = { name: string; size: number };
type Directory = { [key: string]: File | Directory };

const root: Directory = {};

root["a"] = {
    b: {
        name: "file.txt",
        size: 11,
    },
    c: {
        d: {
            f: {
                g: {
                    h: {
                        name: "file.txt",
                        size: 11,
                    },
                },
            },
        },
        e: {
            name: "file.txt",
            size: 11,
        },
    },
};
