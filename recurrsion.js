//print all numbers with recursion;

function printAllNumber(number){
    if( 1 < number){
        console.log(number);
        number--;
        printAllNumber(number);
    }else if(number === 1){
        console.log('last value',number);
    }
}