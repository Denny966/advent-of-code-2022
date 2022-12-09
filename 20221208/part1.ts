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

const isVisible = (rowIndex: number, columnIndex: number) => {
    const tree = matrix[rowIndex][columnIndex];
    const $topTrees = topTrees(rowIndex, columnIndex);
    const $rightTrees = rightTrees(rowIndex, columnIndex);
    const $bottomTrees = bottomTrees(rowIndex, columnIndex);
    const $leftTrees = leftTrees(rowIndex, columnIndex);

    return $topTrees.every((height) => height < tree) || $rightTrees.every((height) => height < tree) || $bottomTrees.every((height) => height < tree) || $leftTrees.every((height) => height < tree);
};

//console.log(matrix);

let visibleTrees = 0;
matrix.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
        if (isVisible(rowIndex, columnIndex)) {
            visibleTrees++;
        }
    });
});
console.log(visibleTrees)