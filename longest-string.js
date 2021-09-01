// Given an string s, find the string of the longest substring that contains no repeated characters.

// Examples:
// input: 'ABCAB' output: 'ABC'
// input: 'AABCCEDFGG' output: 'CEDFG'

function getLongestString(s){
    //get all substrings with no-repeated letters 
    const arr = s.split('').reduce((acc, cur)=>{
        if(acc.length === 0) {
            return [cur];
        }
        const lastWord = acc[acc.length-1]; 
        const index = lastWord.indexOf(cur);
        index > -1 ?
            acc.push(`${lastWord.slice(index+1)}${cur}`) :
        acc[acc.length-1] = lastWord + cur;
        return acc;        
    },[]);
    
    //reduce to the longest one
    return arr.reduce((acc, cur)=>cur.length > acc.length ? cur : acc,'')
};

console.log(getLongestString('ABC')); //ABC
console.log(getLongestString('ABCabcdeabdsghedf')); //ABCabcde
console.log(getLongestString('aslkdjasdlkeqo9wie;lwwe')); //jasdlkeqo9wi
console.log(getLongestString('ABC123 itisrepeated')); //ABC123 it
console.log(getLongestString('A')); //A
console.log(getLongestString(''));

//node longest-string