/*
Binary Cardinality - Sort Integers by The Number of 1 Bits

You are given an integer array arr. Sort the integers in the array in ascending order by the number of 1's in their binary representation and in case of two or more integers have the same number of 1's you have to sort them in ascending order.

Return the array after sorting it.

Example 1:

Input: arr = [0,1,2,3,4,5,6,7,8]
Output: [0,1,2,4,8,3,5,6,7]
Explantion: [0] is the only integer with 0 bits.
[1,2,4,8] all have 1 bit.
[3,5,6] have 2 bits.
[7] has 3 bits.
The sorted array by bits is [0,1,2,4,8,3,5,6,7]
 
Constraints:

1 <= arr.length <= 500
0 <= arr[i] <= 104
*/

function convert(n) {
    if (n < 2) return n.toString();
    return convert(Math.trunc(n / 2)) + n % 2;
}

/* test convert function */
// console.log(convert(0), '0');
// console.log(convert(1), '1');
// console.log(convert(2), '10');
// console.log(convert(3), '11');
// console.log(convert(4), '100');
// console.log(convert(5), '101');
// console.log(convert(7), '111');
// console.log(convert(8), '1000');
// console.log(convert(20), '10100');
// console.log(convert(21), '10101');

function getBinaryCardinality(intArr) {
    return intArr.map(i => {
        const binary = convert(i)
        return {
            decimal: i,
            binary,
            bits: binary.split('').reduce((acc, v) => v === '1' ? ++acc : acc, 0)
        }
    }).sort((a, b) => a.bits - b.bits)
}

console.log(getBinaryCardinality([0, 1, 2, 3, 4, 5, 6, 7, 8]))