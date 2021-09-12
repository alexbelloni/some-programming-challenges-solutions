/**
Create a function that receives a 2D array representing a plant pot.
Every number 1 represent strong gravel that block water, and 0 a good flow of water. 
A good pot has the flow of water from the top to the bottom using 0 as path.
Path is a way via 0s linked, horizontal or vertical, not diagonal.
E.g:
Good pot:

1110110
0110110
1110011
1111011

The flow of water is represented as *:
111*110
011*110
111**11
1111*11

Bad pot:
1110110
0110110
1111111
1111011

 */

const solution = (pot) => {
    const bottomLevel = pot.length - 1;
    log('bottomLevel:', bottomLevel);

    function log(...arg) {
        //console.log(arg.map(a=>a).join(' '))
    }

    const myPot = pot;

    function getNeighbors(level, index) {
        if (myPot[level][index] === 1) return [];
        const arr = [];
        if (level - 1 > 0 && myPot[level - 1][index] === 0) arr.push({ level: level - 1, index });
        if (level + 1 < myPot.length && myPot[level + 1][index] === 0) arr.push({ level: level + 1, index });
        if (index - 1 >= 0 && myPot[level][index - 1] === 0) arr.push({ level, index: index - 1 });
        if (index + 1 < myPot[level].length && myPot[level][index + 1] === 0) arr.push({ level, index: index + 1 });
        return arr;
    }

    // Verify totally level block
    for (let x = 0; x <= bottomLevel; ++x) {
        if (!pot[x].includes(0)) {
            return [pot, false];
        }
    }

    function next(level, index) {
        log('point:', level, index);

        if (pot[level][index] === 1) return false

        if (level === bottomLevel && pot[level][index] === 0) {
            myPot[level][index] = 2;
            return true;
        }

        myPot[level][index] = 2;

        const neighbors = getNeighbors(level, index);
        //log('point:',level,index, neighbors, neighbors.length);

        for (let n = 0; n < neighbors.length; ++n) {
            //log('neighbor:',neighbors[n].level, neighbors[n].index)
            return next(neighbors[n].level, neighbors[n].index);
        }
    }

    for (let x = 0; x < pot[0].length; ++x) {
        if (next(0, x)) {
            return [myPot, true]
        }
    }

    return [myPot, false]
};

function drawPot(myPot) {
    console.log("================================")
    for (let x = 0; x < myPot[0].length; ++x) {
        if (myPot[x])
            console.log(myPot[x].map(c => ` ${c === 1 ? '+' : c === 0 ? ' ' : '|'}`).join(''))
    }
}

function test(pot, result) {
    drawPot(pot);
    const r = solution(pot);
    drawPot(r[0]);
    //console.log(result, r[1])
    console.log(r[1] ? "GOOD POT" : "bad pot")
}

test([[1, 1, 1, 1, 1], [1, 1, 0, 0, 1], [1, 1, 1, 0, 1]], false)
test([[1, 1, 1, 0, 1], [1, 1, 0, 0, 1], [1, 1, 1, 0, 1]], true)
test([[0, 1, 1, 1, 1], [1, 1, 0, 0, 1], [1, 1, 1, 0, 1]], false)
test([[0, 0, 1, 1, 1], [0, 1, 0, 0, 1], [1, 1, 1, 0, 1]], false)
test([[0, 0, 0, 1, 1], [0, 1, 0, 0, 1], [0, 1, 1, 0, 1], [1, 1, 1, 0, 0], [1, 1, 1, 1, 0]], true)

//node good-bad-plant-pot