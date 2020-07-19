//Input: [1,1,0,1,1,1,0,0,1]
//Output: 3
//Explanation: The first two digits or the last three digits are consecutive 1s.
  //  The maximum number of consecutive 1s is 3.
  function findMaxConsecutiveOnes(arr){
    let res = [];
      let map={};
      let lastValue;
      for(let i=0; i<arr.length; i++){
        if(map[arr[i]] === undefined){
          map[arr[i]] = 1;
          lastValue = arr[i];
        } else if(lastValue === arr[i]){
           map[arr[i]] += 1;
        } else if(lastValue !== arr[i]){
          if(arr[i] === 1){
            res.push(map[arr[i]]);
          }
          map[arr[i]] = 1;
          lastValue = arr[i];
        }
      }
      map[1] ? res.push(map[1]):''; // for last 1's
      return res.length === 0 ? 0 :  Math.max(...res);
    }


console.log(findMaxConsecutiveOnes([0]));
console.log(findMaxConsecutiveOnes([1,1,0,1,1,1,0,0,1]));
console.log(findMaxConsecutiveOnes([1,1,0,1,1,1,0,0,1,1,1,1,1]));
console.log(findMaxConsecutiveOnes([1,1,0,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1]));
    
    