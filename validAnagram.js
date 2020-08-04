function validAnagram( str1, str2 ){
  
    if(str1.length !== str2.length)
     return false;
    
    let map1 = {};
    let map2 = {};
    // add whatever parameters you deem necessary - good luck!
    for(let char of str1){
        map1[char] =  map1[char] ? map1[char]+1 : 1;
    }
    
    for(let char of str2){
        map2[char] = map2[char] ? map2[char]+1 : 1;
    }
    
    for(let key in map1){
      if(map1[key] !== map2[key]){
                 return false;
      }
    }
    
    return true;
  }