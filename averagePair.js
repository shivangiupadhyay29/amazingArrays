// multiple pointers
// average pairs
// Time O(N) , Space complexity O(1);
//inputs arr and target avg
// return true if find any pair matching target avg value;
// else return false

function averagePair(arr, avg){
    let  header, counter, index = 0;
    for(let i=0; i<arr.length; i++){
        header = arr[index];
        counter = arr[i];
        if(index !== i && (header+counter)/2 === avg){
           return true;
        }
        if(!arr[i+1] && index !== arr.length-1){    //reached the last element
            index = index+1;
            i=0;
        }
    }
    return false;
  }
  
  console.log(averagePair([1,2,3],2.5));
  console.log(averagePair([1,3,3,5,6,7,10,12,19],8));
  console.log(averagePair([-1,0,3,4,5,6],4.1));
  console.log(averagePair([],4));
  
  
  