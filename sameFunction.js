//big O(N)
function same(arr1, arr2){
    let square, squaredMap={}, originalMap={};
    if(arr1.length != arr2.length)
      return false;
    for(let i=0; i<arr1.length; i++){
        square = arr1[i] * arr1[i];    
        originalMap[arr1[i]] = { 
            count: originalMap[arr1[i]]?.count ? originalMap[arr1[i]]?.count + 1 : 1,
            square: arr1[i] * arr1[i] 
        }
    }
    for(let i=0;i<arr2.length;i++){
      squaredMap[arr2[i]] = squaredMap[arr2[i]]? squaredMap[arr2[i]] + 1 : 1;
    }
    for(let key in originalMap){
      let squareValue = originalMap[key].square;
      if(squaredMap[squareValue] === originalMap[key].count)
        return true;
      else 
        return false;
    }
  
  }
  console.log('1', same([1,2,3,4,5,6], [4,9,1]));
  console.log('2', same([1,2,3], [4,9,1]));
  console.log('3', same([1,2,3], [4,9]));
  console.log('4', same([3,2,3], [4,4,9]));
  console.log('5', same([3,2,3], [4,9,9]));