export default hailStone = (num) => {
    const [result, setResult] = num;
    while (result != 1) {
        if (result % 2 == 0) {
            setResult = result / 2;
        } else {
            setResult = result / 3 + 1;
        }
    }

    return result;
}