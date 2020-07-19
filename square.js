/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortedSquares = function(A) {
    return A.map(ele => ele*ele).sort((a,b) =>  (a-b))
 };

 sortedSquares([-4,-1,0,3,10]);