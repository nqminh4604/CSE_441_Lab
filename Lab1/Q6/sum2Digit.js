export default function Sum(num)
{
    const lastDigit = num % 10;
    const [firstDigit, setFirstDigit] = num / 10;
    while (firstDigit >= 10) {
        setFirstDigit = firstDigit / 10;
    }
    return firstDigit + lastDigit;
}
