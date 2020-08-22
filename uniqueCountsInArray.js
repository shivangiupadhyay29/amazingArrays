//sorted arrays
function countTheUnique(arr) {
    if(arr.length === 0)
      return 0;
    let uniquePointer;
    let count=0;
    for(let i=0; i<arr.length; i++){
        if(arr[i] !== uniquePointer){
          count = count + 1;
          uniquePointer = arr[i];
          }
        }
      return count; 
  }
  
  console.log('1',countTheUnique([1,1,1,1,1,2,7,10,10,15])); //4
  console.log('2',countTheUnique([1,1,2,2,3,3,12,12])); //4
  console.log('3',countTheUnique([])); //0
  console.log('4',countTheUnique([-2,-1,-1,1])); //3
  
  //for non sorted array
  function countTheUniqueUnsorted(arr) {
    if(arr.length === 0)
      return 0;
    let map = {};
    for(let i=0; i<arr.length; i++){
        if(!map[arr[i]]){
          map[arr[i]] = true;       
       }
    }
    return Object.keys(map).length;
  }
  
  console.log('1',countTheUniqueUnsorted([1,1,1,1,1,2,7,7,2,2,10,10,1,15])); //5
  console.log('2',countTheUniqueUnsorted([1,1,2,2,1,1,1,1,2,2,2,2,3,3,12,12])); //4
  console.log('3',countTheUniqueUnsorted([])); //0
  console.log('4',countTheUniqueUnsorted([-2,-1,-1,0,-1,-1,-2])); //3
  
  