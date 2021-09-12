// Given an excerpt of code, such as "{{}{}}", write a function that adds curly brackets to the beginning and end to make all match and return it. Every open bracket must have its close bracket.

// Examples:
// input: '}{{}}{' output: '{}{{}}{}'
// input: '{ABC' output: '{ABC}'
// input: 'ABC;{DE}FG;H;' output: '{ABC;{DE}FG;H;}'

const OPEN_SYMBOL = '{';
const CLOSE_SYMBOL = '}';

//fix the code with a recursive solution
function fixCode(code) {
    const openIndexes = [], closeIndexes = [];

    //store indexes of all open and close symbols
    code.split('').forEach((e, index) => {
        if (e === OPEN_SYMBOL) openIndexes.push(index)
        if (e === CLOSE_SYMBOL) closeIndexes.push(index)
    });

    //verifying the number of open symbols 
    if (openIndexes.length < closeIndexes.length || closeIndexes[0] < openIndexes[0]) {
        return fixCode(`${OPEN_SYMBOL}${code}`);
    }

    //verifying the number of close symbols
    if (openIndexes.length > closeIndexes.length || openIndexes[openIndexes.length - 1] > closeIndexes[closeIndexes.length - 1]) {
        return fixCode(`${code}${CLOSE_SYMBOL}`);
    }

    //if not symbols, add open and close symbols between the code
    if (openIndexes.length === 0 && closeIndexes.length === 0) {
        return fixCode(`${OPEN_SYMBOL}${code}${CLOSE_SYMBOL}`);
    }

    return code;
}

//tests
console.log(fixCode('}{{}}{'));
console.log(fixCode('{'));
console.log(fixCode('}'));
console.log(fixCode('{{'));
console.log(fixCode(''));
console.log(fixCode('ABC'));
console.log(fixCode('{ABC'));
console.log(fixCode('{ABC;{de}FGH'));
console.log(fixCode('{ABC;{deFGH'));

//node add-curly-brackets