import fs from "fs";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");
var stream = fs.createWriteStream(__dirname + "/output.txt", { flags: "a" });

const split = text.split("\r\n");

type shape = keyof typeof shapePoints;

const rounds: { opponent: shape; you: shape }[] = [];

split.forEach((s) => {
    const strategy = s.split(" ");
    rounds.push({ opponent: strategy[0] as shape, you: strategy[1] as shape });
});

const shapePoints = {
    A: 1, //rock
    B: 2, //paper
    C: 3, //scissors
    X: 1, //rock
    Y: 2, //paper
    Z: 3, //scissors
};

const resultPoints = {
    win: 6,
    draw: 3,
    lose: 0,
};

const play = (opponent: shape, you: shape) => {
    if (opponent === "A" && you === "Y") return resultPoints.win;
    if (opponent === "A" && you === "Z") return resultPoints.lose;
    if (opponent === "B" && you === "X") return resultPoints.lose;
    if (opponent === "B" && you === "Z") return resultPoints.win;
    if (opponent === "C" && you === "X") return resultPoints.win;
    if (opponent === "C" && you === "Y") return resultPoints.lose;
    return resultPoints.draw;
};

let totalPoints = 0;
rounds.forEach((r) => {
    const points = play(r.opponent, r.you) + shapePoints[r.you];
    console.log({ ...r, pts: play(r.opponent, r.you), shape: shapePoints[r.you] });
    totalPoints += points;
});

console.log(totalPoints);
