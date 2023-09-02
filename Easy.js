function findLongestWordLength(str) {
    let currentLength =  0;
    let maxLength = 0;
    for(let i = 0; i <= str.length; i++ ){
        if(str[i] == ''){
            if(currentLength > maxLength){            
                maxLength = currentLength;
            }
        currentLength = 0;
        }else{
            currentLength++;
        }
       if(currentLength > maxLength){
        maxLength = currentLength;
       }
    }
    
    return maxLength;
  }
  
  findLongestWordLength("The quick brown fox jumped over the lazy dog");