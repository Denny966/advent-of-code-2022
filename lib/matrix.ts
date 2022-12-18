export interface Coord {
    x: number;
    y: number;
}


export type Point = [number, number]

export interface MatrixValue<T> {
    rowIndex: number;
    columnIndex: number;
    value: T;
}

export const getSides = <T>(matrix: [T[]], rowIndex: number, columnIndex: number) => {
    const topRow = rowIndex - 1;
    const topElement = matrix[topRow]?.[columnIndex];

    const bottomRow = rowIndex + 1;
    const bottomElement = matrix[bottomRow]?.[columnIndex];

    const rightColumn = columnIndex + 1;
    const rightElement = matrix[rowIndex]?.[rightColumn];

    const leftColumn = columnIndex - 1;
    const leftElement = matrix[rowIndex]?.[leftColumn];

    return {
        top: {
            rowIndex: topRow,
            columnIndex,
            value: topElement,
        } as MatrixValue<T>,
        left: {
            rowIndex,
            columnIndex: leftColumn,
            value: leftElement,
        } as MatrixValue<T>,
        right: {
            rowIndex,
            columnIndex: rightColumn,
            value: rightElement,
        } as MatrixValue<T>,
        bottom: {
            rowIndex: bottomRow,
            columnIndex,
            value: bottomElement,
        } as MatrixValue<T>,
    };
};
