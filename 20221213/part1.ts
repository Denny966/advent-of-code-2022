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

let total = 0;
for (let index = 0; index < data.length; index++) {
    const pair = data[index];
    const [left, right] = pair.split("\r\n");
    const result = isRightOrder(left, right);

    console.log({ index: index + 1, correct: result ? "Correct" : "Incorrect" })
    total += result ? index + 1 : 0;
}

console.log(total)
