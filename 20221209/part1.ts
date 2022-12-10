import fs from "fs";
import { range } from "../lib/range";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");
const data = text.split("\r\n");

interface Coord {
    x: number;
    y: number;
}
const headPostitions: Coord[] = [{ x: 0, y: 0 }];
const tailPostitions: Coord[] = [{ x: 0, y: 0 }];

const isTouching = () => {
    const currentHeadPos = headPostitions[headPostitions.length - 1];
    const currentTailPos = tailPostitions[tailPostitions.length - 1];

    return Math.abs(currentHeadPos.x - currentTailPos.x) < 2 && Math.abs(currentHeadPos.y - currentTailPos.y) < 2;
};

const diagonalMove = () => {
    const currentHeadPos = headPostitions[headPostitions.length - 1];
    const currentTailPos = tailPostitions[tailPostitions.length - 1];

    let increment: Coord;
    if (currentHeadPos.x > currentTailPos.x && currentHeadPos.y < currentTailPos.y) {
        increment = { x: 1, y: -1 };
    }
    if (currentHeadPos.x > currentTailPos.x && currentHeadPos.y > currentTailPos.y) {
        increment = { x: 1, y: 1 };
    }
    if (currentHeadPos.x < currentTailPos.x && currentHeadPos.y < currentTailPos.y) {
        increment = { x: -1, y: -1 };
    }
    if (currentHeadPos.x < currentTailPos.x && currentHeadPos.y > currentTailPos.y) {
        increment = { x: -1, y: 1 };
    }

    return { diagonal: !isTouching() && currentHeadPos.x !== currentTailPos.x && currentHeadPos.y !== currentTailPos.y, increment };
};

const moveTail = (direction: string) => {
    if (isTouching()) return;

    const currentTailPos = tailPostitions[tailPostitions.length - 1];
    const $diagonalMove = diagonalMove();

    if ($diagonalMove.diagonal) {
        tailPostitions.push({ x: currentTailPos.x + $diagonalMove.increment.x, y: currentTailPos.y + $diagonalMove.increment.y });
    } else if (direction === "R") {
        tailPostitions.push({ x: currentTailPos.x + 1, y: currentTailPos.y });
    } else if (direction === "U") {
        tailPostitions.push({ x: currentTailPos.x, y: currentTailPos.y - 1 });
    } else if (direction === "L") {
        tailPostitions.push({ x: currentTailPos.x - 1, y: currentTailPos.y });
    } else if (direction === "D") {
        tailPostitions.push({ x: currentTailPos.x, y: currentTailPos.y + 1 });
    }
};

data.forEach((move) => {
    const parts = move.split(" ");
    const direction = parts[0];
    const steps = range(1, parseInt(parts[1]));

    if (direction === "R") {
        steps.forEach((_) => {
            const currentPosition = headPostitions[headPostitions.length - 1];
            headPostitions.push({ x: currentPosition.x + 1, y: currentPosition.y });
            moveTail(direction);
        });
    }
    if (direction === "U") {
        steps.forEach((_) => {
            const currentPosition = headPostitions[headPostitions.length - 1];
            headPostitions.push({ x: currentPosition.x, y: currentPosition.y - 1 });
            moveTail(direction);
        });
    }

    if (direction === "L") {
        steps.forEach((_) => {
            const currentPosition = headPostitions[headPostitions.length - 1];
            headPostitions.push({ x: currentPosition.x - 1, y: currentPosition.y });
            moveTail(direction);
        });
    }

    if (direction === "D") {
        steps.forEach((_) => {
            const currentPosition = headPostitions[headPostitions.length - 1];
            headPostitions.push({ x: currentPosition.x, y: currentPosition.y + 1 });
            moveTail(direction);
        });
    }
});


console.log(tailPostitions)

console.log([...new Set(tailPostitions.map((tp) => `[${tp.x}, ${tp.y}]`))].length);
