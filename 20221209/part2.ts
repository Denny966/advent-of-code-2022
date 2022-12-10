import fs from "fs";
import { range } from "../lib/range";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");
const data = text.split("\r\n").filter((s) => !s.startsWith("//"));

interface Coord {
    x: number;
    y: number;
}
const chain: { [key: string]: string | undefined } = {
    H: "1",
    "1": "2",
    "2": "3",
    "3": "4",
    "4": "5",
    "5": "6",
    "6": "7",
    "7": "8",
    "8": "9",
    "9": undefined,
};

const positions: { [key: string]: Coord[] } = {};

Object.keys(chain).forEach((key) => (positions[key] = [{ x: 0, y: 0 }]));

const getPosition = (key: string): Coord => positions[key][positions[key].length - 1];

const isTouching = (leader: string, follower: string) => {
    const $leader = getPosition(leader);
    const $follower = getPosition(follower);

    return Math.abs($leader.x - $follower.x) < 2 && Math.abs($leader.y - $follower.y) < 2;
};

const diagonalMove = (leader: string, follower: string) => {
    const $leader = getPosition(leader);
    const $follower = getPosition(follower);

    let increment: Coord;
    if ($leader.x > $follower.x && $leader.y < $follower.y) {
        increment = { x: 1, y: -1 };
    }
    if ($leader.x > $follower.x && $leader.y > $follower.y) {
        increment = { x: 1, y: 1 };
    }
    if ($leader.x < $follower.x && $leader.y < $follower.y) {
        increment = { x: -1, y: -1 };
    }
    if ($leader.x < $follower.x && $leader.y > $follower.y) {
        increment = { x: -1, y: 1 };
    }

    return { diagonal: !isTouching(leader, follower) && $leader.x !== $follower.x && $leader.y !== $follower.y, increment };
};

const moveTail = (direction: string, leader: string, follower: string) => {
    if (isTouching(leader, follower)) return;

    const currentTailPos = getPosition(follower);
    const $diagonalMove = diagonalMove(leader, follower);

    if ($diagonalMove.diagonal) {
        positions[follower].push({ x: currentTailPos.x + $diagonalMove.increment.x, y: currentTailPos.y + $diagonalMove.increment.y });
    } else if (direction === "R") {
        positions[follower].push({ x: currentTailPos.x + 1, y: currentTailPos.y });
    } else if (direction === "U") {
        positions[follower].push({ x: currentTailPos.x, y: currentTailPos.y - 1 });
    } else if (direction === "L") {
        positions[follower].push({ x: currentTailPos.x - 1, y: currentTailPos.y });
    } else if (direction === "D") {
        positions[follower].push({ x: currentTailPos.x, y: currentTailPos.y + 1 });
    }
};

const rope = () => {
    const entries = Object.keys(chain);
    const stringArr = entries.filter((leader) => Number.isNaN(parseInt(leader))).sort();
    const numberArr = entries.filter((leader) => !Number.isNaN(parseInt(leader))).sort((a, b) => parseInt(a) - parseInt(b));
    return stringArr.concat(numberArr).map((key) => [key, chain[key]]);
};

const getDirection = (leader: string, follower: string) => {
    const $leader = getPosition(leader);
    const $follower = getPosition(follower);

    let increment: Coord;
    if ($leader.x === $follower.x && $leader.y > $follower.y) {
        return "D";
    }
    if ($leader.x === $follower.x && $leader.y < $follower.y) {
        return "U";
    }
    if ($leader.x > $follower.x && $leader.y === $follower.y) {
        return "R";
    }
    if ($leader.x < $follower.x && $leader.y === $follower.y) {
        return "L";
    }
};

data.forEach((move) => {
    const parts = move.split(" ");
    const direction = parts[0];
    const steps = range(1, parseInt(parts[1]));
    const leader = "H";
    const $rope = rope();

    if (direction === "R") {
        steps.forEach((_) => {
            const leaderPosition = getPosition(leader);
            positions[leader].push({ x: leaderPosition.x + 1, y: leaderPosition.y });

            for (const [leader2, follower] of $rope) {
                if (follower != null) moveTail(getDirection(leader2, follower), leader2, follower);
            }
        });
    }
    if (direction === "U") {
        steps.forEach((_) => {
            const leaderPosition = getPosition(leader);
            positions[leader].push({ x: leaderPosition.x, y: leaderPosition.y - 1 });
            for (const [leader2, follower] of $rope) {
                if (follower != null) moveTail(getDirection(leader2, follower), leader2, follower);
            }
        });
    }

    if (direction === "L") {
        steps.forEach((_) => {
            const leaderPosition = getPosition(leader);
            positions[leader].push({ x: leaderPosition.x - 1, y: leaderPosition.y });
            for (const [leader2, follower] of $rope) {
                if (follower != null) moveTail(getDirection(leader2, follower), leader2, follower);
            }
        });
    }

    if (direction === "D") {
        steps.forEach((_) => {
            const leaderPosition = getPosition(leader);
            positions[leader].push({ x: leaderPosition.x, y: leaderPosition.y + 1 });
            for (const [leader2, follower] of $rope) {
                if (follower != null) moveTail(getDirection(leader2, follower), leader2, follower);
            }
        });
    }
});

//for (const [leader, follower] of rope()) {
//    console.log({ key: leader, pos: getPosition(leader) });
//}

console.log([...new Set(positions["9"].map((tp) => `[${tp.x}, ${tp.y}]`))].length);
