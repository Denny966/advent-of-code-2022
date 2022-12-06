export const range = (start: number, stop: number, step = 1) =>
    Array(Math.ceil((stop - start) / step) + 1)
        .fill(start)
        .map((x, y) => x + y * step);
