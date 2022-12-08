import fs from "fs";
import { Tree, TreeNode } from "../lib/tree";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");
const stream = fs.createWriteStream(__dirname + "/output.txt", { flags: "a" });
const data = text.split("\r\n");

type File = { name: string; size: number };
type Directory = { [key: string]: File | Directory };

const root: Directory = {};

const tree = new Tree("/");
let currentDirectory = [];

data.forEach((row) => {
    const parts = row.split(" ");
    switch (parts[0]) {
        case "$": {
            if (parts[1] === "cd") {
                if (parts[2] === "..") {
                    currentDirectory.pop();

                } else {
                    currentDirectory.push(parts[2]);
                }
            }
            return;
        }

        case "dir": {
            const value = parts[1];
            if (!tree.insert(currentDirectory, value)) {
                console.log(`failed to insert`)
            }
            return;
        }
        default: {
            if (!tree.insert(currentDirectory, parts[1], parts[0])) {
                console.log(`failed to insert`)
            }
            return;
        }
    }
});

const directories = [...tree.nodes(tree.root, [])]
    .map(x => {
        return { key: x.key, value: x.value, parent: x.parent };
    })
    .filter((a) => a != null);

    const directories2 = [...new Set(directories.map((d) => d.parent).filter((d) => d != null))];
    console.log(directories2)
// stream.write(JSON.stringify(directories2));

 const d3 = directories2.map((d) => {
     return { key: d, value: tree.nodes(tree.find(d, tree.root), []).reduce((sum, num) => sum + parseInt(num.value), 0) };
 });
// stream.close();

 console.log(d3.filter(e=>e.value <= 100000).reduce((sum, num) => sum + num.value, 0));
// const groups: { [key: string]: any[] } = directories.reduce(
//     (groups, item) => ({
//         ...groups,
//         [item.parent]: [...(groups[item.parent] || []), item],
//     }),
//     {}
// );
//const kvp = groups.map((n) => ({ key: n.key, value: n.value.reduce((sum, num) => sum + parseInt(num), 0) }));

// const result = {};
// for (const [key, value] of Object.entries(groups)) {
//     result[key] = value
//         .map((c) => c.value)
//         .filter((c) => c !== "~")
//         .reduce((sum, num) => sum + parseInt(num), 0);
// }

// console.log(
//     Object.values<any>(result)
//         .filter((o) => o <= 100000)
//         .reduce((sum, num) => sum + parseInt(num), 0)
// );

// console.log(
//     [...tree.postOrderTraversal()]
//         .map((x) => {
//             if (x.key === x.value) {
//                 return {
//                     key: x.key,
//                     value: [...tree.postOrderTraversal(x)]
//                         .filter((x) => x.key !== x.value)
//                         .map((n) => n.value)
//                         .reduce((sum, num) => sum + parseInt(num), 0),
//                 };
//             }
//         })
//         .filter((a) => a != null)
//         .filter((dir) => dir.value <= 100000)
//         .reduce((sum, num) => sum + num.value, 0)
// );
