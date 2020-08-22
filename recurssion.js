// power(2,0) // 1
// power(2,2) // 4
// power(2,4) // 16

function power(base,exp){
    if(exp === 0)
     return 1;
    else 
    return base*power(base,exp-1);
}

//factorial(1) // 1
// factorial(2) // 2
// factorial(4) // 24
// factorial(7) // 5040

function factorial(num){
    if(num === 0)
    return 1;
    else 
    return num*factorial(num-1);
 }

 // productOfArray([1,2,3]) // 6
// productOfArray([1,2,3,10]) // 60
function productOfArray(arr){
    if(arr.length === 1)
    return arr[0];
    else
    return arr.pop() * productOfArray(arr);
}