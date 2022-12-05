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
    X: 1, //lose
    Y: 2, //draw
    Z: 3, //win
};

const resultPoints = {
    win: 6,
    draw: 3,
    lose: 0,
};

const losingShape = (shape: shape) => {
    if (shape === "X") return;
};

const play = (opponent: shape, youShould: shape) => {
    if (opponent === "A" && youShould === "X") return { shapePoints: shapePoints.C, resultPoints: resultPoints.lose };
    if (opponent === "A" && youShould === "Y") return { shapePoints: shapePoints.A, resultPoints: resultPoints.draw };
    if (opponent === "A" && youShould === "Z") return { shapePoints: shapePoints.B, resultPoints: resultPoints.win };
    if (opponent === "B" && youShould === "X") return { shapePoints: shapePoints.A, resultPoints: resultPoints.lose };
    if (opponent === "B" && youShould === "Y") return { shapePoints: shapePoints.B, resultPoints: resultPoints.draw };
    if (opponent === "B" && youShould === "Z") return { shapePoints: shapePoints.C, resultPoints: resultPoints.win };
    if (opponent === "C" && youShould === "X") return { shapePoints: shapePoints.B, resultPoints: resultPoints.lose };
    if (opponent === "C" && youShould === "Y") return { shapePoints: shapePoints.C, resultPoints: resultPoints.draw };
    if (opponent === "C" && youShould === "Z") return { shapePoints: shapePoints.A, resultPoints: resultPoints.win };
};

let totalPoints = 0;
rounds.forEach((r) => {
    const points = play(r.opponent, r.you);
    totalPoints = totalPoints + points.shapePoints + points.resultPoints;
});

console.log(totalPoints);
