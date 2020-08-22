function maxSubarraySum(arr,num){
    if(arr.length <num)
    return null;
    let tempSum=0;
    let maxSum=0;
    let j=0
    // add whatever parameters you deem necessary - good luck!
    for(let i=0; i<num; i++){
       tempSum = tempSum + arr[i];
    }
    maxSum = tempSum;
    for(let i = num;i < arr.length; i++){
        tempSum = (tempSum-arr[j]) + arr[i];
        maxSum = Math.max(tempSum, maxSum);
        j++;
    }
    console.log(maxSum);
    return maxSum;
  }
  
  console.log(maxSubarraySum([100,200,300,400,500],2)); //900