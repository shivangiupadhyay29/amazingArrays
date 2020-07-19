// Input: [1,0,2,3,0,4,5,0]
// Output: null
// Explanation: After calling your function, the input array is modified to: [1,0,0,2,3,0,0,4]

/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
var duplicateZeros = function(arr) {
    let lastChangedIndex;
    for(let i=0; i<arr.length; i++){
      if(arr[i] === 0 && lastChangedIndex !== i){
          arr.splice(i+1,0,0);
          arr.pop();
          lastChangedIndex = i+1;
      } 
    }
  };