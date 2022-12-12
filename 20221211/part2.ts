import fs from "fs";
import { range } from "../lib/range";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");
const data = text.split("\r\n\r\n").filter((s) => !s.startsWith("//"));
const rounds = parseInt(process.argv[2]);

interface Monkey {
    name: string;
    startingItems: number[];
    operation: string;
    test: {
        divisible: number;
        true: string;
        false: string;
    };
}
const monkeys: Monkey[] = [];

data.forEach((row) => {
    const monkeyData = row.split("\r\n").map((r) => r.trim());
    const name = monkeyData[0].replace(":", "");
    const startingItems = monkeyData[1]
        .split(":")[1]
        .split(",")
        .map((n) => parseInt(n.trim()));
    const operation = monkeyData[2].split(":")[1].split(" = ")[1];
    const test = {
        divisible: parseInt(monkeyData[3].split(" ").slice(-1)[0]),
        true: monkeyData[4].split(" ").slice(-2).join(" "),
        false: monkeyData[5].split(" ").slice(-2).join(" "),
    };
    monkeys.push({ name, startingItems, operation, test });
});

const parseOperation = (operation: string, input: number) => {
    const parts = operation.split(" ");
    const rightSide = parts[2] === "old" ? input : parseInt(parts[2]);
    const operator = parts[1];
    switch (operator) {
        case "*":
            return input * rightSide;
        case "+":
            return input + rightSide;
    }
};

const inspections: { [monkeyName: string]: number } = {};

range(1, rounds).forEach((round) => {
    monkeys.forEach((monkey) => {
        [...monkey.startingItems].forEach((startingItem) => {
            const worryLevel = parseOperation(monkey.operation, startingItem);

            if (worryLevel % monkey.test.divisible === 0) {
                const trueMonkey = monkeys.find((m) => m.name.toLowerCase() === monkey.test.true.toLowerCase());
                trueMonkey.startingItems.push(worryLevel);
            } else {
                const falseMonkey = monkeys.find((m) => m.name.toLowerCase() === monkey.test.false.toLowerCase());
                falseMonkey.startingItems.push(worryLevel);
            }
            inspections[monkey.name] = inspections[monkey.name] || 0;
            inspections[monkey.name]++;
            monkey.startingItems.shift();
        });
    });
});
console.log(inspections);
const inspectionValues = Object.values(inspections).sort((a, b) => b - a);
console.log(inspectionValues[0] * inspectionValues[1]);
