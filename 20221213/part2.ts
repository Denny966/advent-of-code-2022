import fs from "fs";
const text = fs.readFileSync(__dirname + "/input.txt", "utf-8");
const data = text.split("\r\n\r\n").filter((s) => !s.startsWith("//"));

const isArray = (input: string) => Array.isArray(input) || Array.isArray(JSON.parse(input));

const isRightOrder = (leftInput: string, rightInput: string) => {
    const leftArray = isArray(leftInput) ? JSON.parse(leftInput) : [parseInt(leftInput)];
    const rightArray = isArray(rightInput) ? JSON.parse(rightInput) : [parseInt(rightInput)];

    const maxSize = Math.max(leftArray.length, rightArray.length)
    for (let index = 0; index < maxSize; index++) {

        if (leftArray[index] == null && rightArray[index] != null) {
            return true;
        }
        const leftValue = JSON.stringify(leftArray[index]);
        const rightValue = JSON.stringify(rightArray[index]);
        if (!rightValue) {
            return false;
        }

        if (isArray(leftValue) && (JSON.parse(leftValue) as any[]).length < 1 && index === maxSize - 1) {
            return true;
        }

        else if (isArray(leftValue) && isArray(rightValue)) {
            const result = isRightOrder(leftValue, rightValue);
            if (result != null)
                return result;
        }
        else if (isArray(leftValue) && !isArray(rightValue)) {
            const result = isRightOrder(leftValue, rightValue);
            if (result != null)
                return result;
        }
        else if (!isArray(leftValue) && isArray(rightValue)) {
            const result = isRightOrder(leftValue, rightValue);
            if (result != null)
                return result;
        }
        else if (parseInt(leftValue) > parseInt(rightValue)) {
            return false;
        }
        else if (parseInt(leftValue) === parseInt(rightValue)) {
            // continue
        }
        else {
            return true;
        }
    }
};

const list = [
    "[[2]]",
    "[[6]]"
];
for (let index = 0; index < data.length; index++) {
    const pair = data[index];
    const [left, right] = pair.split("\r\n");
    list.push(...[left, right]);
}

export function bubbleSort(array: string[]): string[] {
    array = array.slice();

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {

            if (!isRightOrder(array[j], array[j + 1])) {
                let swap = array[j];
                array[j] = array[j + 1];
                array[j + 1] = swap;
            }
        }
    }
    return array;
}

const sortedList = bubbleSort(list);

const packageTwo = sortedList.indexOf("[[2]]") + 1;
const packageSix = sortedList.indexOf("[[6]]") + 1;
console.log(packageTwo * packageSix);
