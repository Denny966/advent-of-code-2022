import fs from "fs";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");
const data = text.split("\r\n");

const matrix = [[]];
data.forEach((row: string, index) => {
    const result = [];
    row.split("").forEach((digit) => {
        result.push(parseInt(digit));
    });
    matrix[index] = result;
});

const leftTrees = (rowIndex: number, columnIndex: number) => {
    const trees: number[] = [];
    let leftColumn = columnIndex - 1;
    let leftTree = matrix[rowIndex]?.[leftColumn];
    while (leftTree != null) {
        trees.push(leftTree);
        leftTree = matrix[rowIndex]?.[--leftColumn];
    }
    return trees;
};

const rightTrees = (rowIndex: number, columnIndex: number) => {
    const trees: number[] = [];
    let rightColumn = columnIndex + 1;
    let rightTree = matrix[rowIndex]?.[rightColumn];
    while (rightTree != null) {
        trees.push(rightTree);
        rightTree = matrix[rowIndex]?.[++rightColumn];
    }
    return trees;
};

const topTrees = (rowIndex: number, columnIndex: number) => {
    const trees: number[] = [];
    let topRow = rowIndex - 1;
    let topTree = matrix[topRow]?.[columnIndex];
    while (topTree != null) {
        trees.push(topTree);
        topTree = matrix[--topRow]?.[columnIndex];
    }
    return trees;
};

const bottomTrees = (rowIndex: number, columnIndex: number) => {
    const trees: number[] = [];
    let bottomRow = rowIndex + 1;
    let bottomTree = matrix[bottomRow]?.[columnIndex];
    while (bottomTree != null) {
        trees.push(bottomTree);
        bottomTree = matrix[++bottomRow]?.[columnIndex];
    }
    return trees;
};

const view = (rowIndex: number, columnIndex: number) => {
    const tree = matrix[rowIndex][columnIndex];
    const $topTrees = topTrees(rowIndex, columnIndex);
    const $rightTrees = rightTrees(rowIndex, columnIndex);
    const $bottomTrees = bottomTrees(rowIndex, columnIndex);
    const $leftTrees = leftTrees(rowIndex, columnIndex);

    const topView = $topTrees.findIndex((t) => t >= tree) === -1 ? $topTrees.length : $topTrees.findIndex((t) => t >= tree) + 1;
    const leftView = $leftTrees.findIndex((t) => t >= tree) === -1 ? $leftTrees.length : $leftTrees.findIndex((t) => t >= tree) + 1;
    const bottomView = $bottomTrees.findIndex((t) => t >= tree) === -1 ? $bottomTrees.length : $bottomTrees.findIndex((t) => t >= tree) + 1;
    const rightView = $rightTrees.findIndex((t) => t >= tree) === -1 ? $rightTrees.length : $rightTrees.findIndex((t) => t >= tree) + 1;

    return topView * leftView * bottomView * rightView;
};

//console.log(matrix);

let bestView = 0;
matrix.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
        const $view = view(rowIndex, columnIndex);
        if ($view > bestView) {
            bestView = $view;
        }
    });
});

console.log(bestView);
